<!--
 * @Description: 自定义点选布局
 * @Autor: WangYuan
 * @Date: 2021-06-02 14:18:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:43:28
-->
<template>
  <div class="wrap">

    <!-- 布局容器 -->
    <ul
      v-for="y in ys"
      :key="y"
      class="flex"
    >
      <li
        v-for="x in xs"
        :key="mergeKey(y,x)"
        :data-key='mergeKey(y,x)'
        :data-y='y'
        :data-x='x'
        class="wrap-item flex-center"
        :class="[editKeys.includes(mergeKey(y,x)) ? 'move-wrap':'']"
        @click='clickWrap($event)'
        @mouseover='move'
      >
        <i class="f12 icon icon-jia"></i>
      </li>
    </ul>

    <!-- 编辑容器块 -->
    <div
      v-for="(item,index) in mValue"
      :key="index"
      class="edit-wrap flex-column flex-center"
      :class="[cuurIndex == index ? 'edit-wrap-active' : '']"
      :style="getStyle(item)"
      @click="clickItem(index)"
    >
      <div
        v-show="model=='custom'"
        class="edit-wrap-close"
        @click.stop="deleteEditWrap(index)"
      >
        <i class="f12 icon icon-cha-"></i>
      </div>
      <div class="mb3">{{`${parseInt(item.width*62.5)}x${parseInt(item.height*62.5)}`}}</div>
      <div v-show="item.width > 1">或同等比例</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-layout",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    model: {
      type: String,
      default: "custom",
    },
    row: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      startKey: 0,
      cuurIndex: -1,
      col: 6,
      edit: false, // 编辑模式
      ys: [],
      mValue: [],
      editKeys: [], // 编辑key集合
    };
  },
  computed: {
    xs() {
      return [...Array(this.col).keys()];
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },
    mValue: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
    row: {
      immediate: true,
      handler(newValue, oldValue) {
        this.ys = [...Array(this.row).keys()];
      },
    },
    cuurIndex: {
      handler(newValue, oldValue) {
        console.log('...');
        
        console.log(newValue);
        
        let temp = newValue == -1 ? undefined : this.mValue[newValue];
        this.$emit("onCuurIndex", temp);
      },
    },
  },
  methods: {
    // 重置容器
    reset() {
      this.startKey = 0;
      this.cuurIndex = -1;
      this.edit = false;
      this.mValue = [];
      this.editKeys = [];
    },

    // 点击单元块
    clickWrap(e) {
      // 开始编辑模式
      if (!this.edit) {
        let key = e.target.dataset.key;
        this.editKeys.push(Number(key));
        this.startKey = key;
        this.edit = true;
      } else {
        let keys = this.$cloneDeep(this._.sortBy(this.editKeys));
        let start = this.splitKey(keys[0]);
        let end = this.splitKey(keys.pop());

        // 结束编辑模式
        let temp = {
          top: start.y,
          left: start.x,
          bottom: end.y + 1,
          right: end.x + 1,
          height: end.y - start.y + 1,
          width: end.x - start.x + 1,
          image: "//d303.paixin.com/thumbs/1561359/378467338/staff_1024.jpg",
        };

        this.mValue.push(temp);
        this.cuurIndex = this.mValue.length - 1;

        this.editKeys = [];
        this.edit = false;
      }
    },

    // 移动鼠标设置编辑容器
    move(e) {
      if (!this.edit) return;

      let keys = [];
      let start = this.splitKey(this.startKey);
      let end = this.splitKey(e.target.dataset.key);
      let ys = this._.sortBy([start.y, end.y]);
      let xs = this._.sortBy([start.x, end.x]);

      // 容器碰撞，阻止编辑容器变更
      if (this.antiCollision(start, end)) {
        return;
      }

      for (let i = ys[0]; i <= ys[1]; i++) {
        for (let j = xs[0]; j <= xs[1]; j++) {
          keys.push(this.mergeKey(i, j));
        }
      }

      this.editKeys = keys;
    },

    // 防碰撞算法
    antiCollision(start, end) {
      let result = false;

      this.$cloneDeep(this.mValue).map((item) => {
        --item.bottom;
        --item.right;

        // 判断 x 是否有交集
        if (
          this.$isIntersection(this._.sortBy([start.x, end.x]), [
            item.left,
            item.right,
          ])
        ) {
          // 初始点在目标块y轴上方,结束点大于等于目标块top，发生了碰撞
          if (start.y < item.top && end.y >= item.top) {
            console.log("初始点在目标块y轴上方,碰撞了");
            result = true;
          }
          // 初始点在目标块y轴下方,结束点小于等于目标块bottom，发生了碰撞
          if (start.y > item.bottom && end.y <= item.bottom) {
            console.log("初始点在目标块y轴下方,碰撞了");
            result = true;
          }
        }

        // 判断 y 是否有交集
        if (
          this.$isIntersection(this._.sortBy([start.y, end.y]), [
            item.top,
            item.bottom,
          ])
        ) {
          // 初始点在目标块y轴左方,结束点大于等于目标块left，发生了碰撞
          if (start.x < item.left && end.x >= item.left) {
            console.log("初始点在目标块y轴左方,碰撞了");
            result = true;
          }
          // 初始点在目标块y轴下方,结束点小于等于目标块bottom，发生了碰撞
          if (start.x > item.right && end.x <= item.right) {
            console.log("初始点在目标块y轴右方,碰撞了");
            result = true;
          }
        }
      });

      return result;
    },

    // 坐标计算下标
    mergeKey(y, x) {
      return Number(x + y * 10);
    },

    // 下标拆分坐标
    splitKey(key) {
      if (key >= 10) {
        return { y: parseInt((key % 100) / 10), x: key % 10 };
      } else {
        return { y: 0, x: Number(key) };
      }
    },

    // 样式处理
    getStyle(style) {
      let result = {};
      Object.keys(style).map((key) => {
        result[key] = style[key] * 50;

        if (["top", "left"].includes(key)) {
          --result[key];
        }
        if (["width", "height"].includes(key)) {
          ++result[key];
        }
        result[key] += "px";
      });

      return result;
    },

    deleteEditWrap(index) {
      this.mValue.splice(index, 1);
      this.cuurIndex = this.mValue.length - 1;
    },

    clickItem(index) {
      this.cuurIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  display: inline-block;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;

  .wrap-item {
    width: 50px; /* no */
    height: 50px; /* no */
    background: #f8f8f8;
    // border: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;

    color: #bbb;
    cursor: pointer;

    i {
      pointer-events: none;
    }
  }

  .move-wrap {
    background: #e0edff;

    i {
      display: none;
    }
  }

  .edit-wrap {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ebedf0;
    font-size: 10px;
    color: #7d7e80;
    z-index: 2;
    cursor: pointer;

    .edit-wrap-close {
      display: none;
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 50%;
      background: #b3b3b3;
      color: #fff;
      font-size: 14px;
      text-align: center;
      z-index: 4;
    }
  }

  .edit-wrap-active {
    background: #e0edff;
    border: 1px solid #155bd4;
    color: #155bd4;
    z-index: 5;

    &:hover {
      .edit-wrap-close {
        display: block;
      }
    }
  }
}
</style>