<!--
 * @Description: 颜色选择器 (支持多色渐变)
 * @Autor: WangYuan
 * @Date: 2021-03-24 16:07:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-06-09 13:51:35
-->

<template>
  <div class="gradient">
    <div
      class="gradient-view"
      :style="{ backgroundImage: gradientVal }"
    ></div>
    <el-color-picker
      v-for="(item, index) in gradientData.list"
      :key="index"
      v-model="item.color"
      show-alpha
      color-format="hex"
      @change="deleteColor(index)"
    ></el-color-picker>
    <div class="gradient-operation">
      <i
        title="新增"
        class="iconfont icon-xinzeng"
        @click="addList()"
      ></i>
      <i
        title="删除"
        class="iconfont icon-lajitong"
        @click="deleteList"
      ></i>
      <el-popover
        placement="top"
        width="250"
        trigger="click"
      >
        <div class="flex-column">
          <div class="flex-center">颜色比例</div>
          <div
            class="block"
            v-for="(colorItem, i) in gradientData.list"
            :key="i"
          >
            <div
              class="w25 h25 radius"
              style="border: 1px solid #eeeeee"
              :style="{ background: colorItem.color }"
            ></div>
            <el-slider
              v-model="colorItem.proportion"
              :max="100"
            ></el-slider>
          </div>
        </div>
        <i
          title="颜色比例"
          class="iconfont icon-tiaozheng"
          slot="reference"
        ></i>
      </el-popover>
      <el-popover
        placement="top"
        width="250"
        trigger="click"
      >
        <div class="flex-column">
          <div class="flex-center">渐变角度</div>
          <el-slider
            v-model="gradientData.angle"
            :max="360"
          ></el-slider>
        </div>
        <i
          title="调整角度"
          class="iconfont icon-adjust"
          slot="reference"
        ></i>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "gradient",
  props: {
    value: {
      type: Object,
      default: () => ({
        angle: 180,
        list: [
          {
            color: "#fff",
            proportion: 50,
          },
        ],
      }),
    },
  },
  data() {
    return {
      gradientData: {
        lsit: [],
      },
    };
  },
  computed: {
    gradientVal() {
      return this.gradientChannel(this.gradientData);
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.gradientData = newValue;
      },
    },
    gradientData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    deleteColor(index) {
      if (!this.gradientData.list[index].color) {
        this.gradientData.list[index].color = "#fff";
      }
    },
    addList() {
      if (this.gradientData.list.length < 5) {
        this.gradientData.list.push({ color: "#fff", proportion: 100 });
      }
    },
    deleteList() {
      if (this.gradientData.list.length > 1) {
        this.gradientData.list.pop();
      }
    },
    gradientChannel(config) {
      if (config && config.list.length != 0) {
        let result = `linear-gradient(${config.angle}deg`;

        if (config.list.length == 1) {
          let one = config.list[0];
          result += `,${one.color} ${one.proportion}%, ${one.color} 100%`;
        } else {
          config.list.map((item) => {
            result += `,${item.color} ${item.proportion}%`;
          });
        }
        result += ")";
        return result;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 颜色选择器样式重置
::v-deep .el-color-picker__trigger .el-icon-arrow-down:before {
  content: "" !important; /*no*/
  font-size: 18px;
}
::v-deep .el-color-picker__trigger {
  border: none !important; /*no*/
}
::v-deep .el-color-picker__color {
  width: 25px !important; /*no*/
  height: 25px !important; /*no*/
  border: none;
  background: #fff !important; /*no*/
}

::v-deep .el-color-picker__color-inner {
  width: 25px !important; /*no*/
  height: 25px !important; /*no*/
  margin: auto !important; /*no*/
  border-radius: 50% !important; /*no*/
  border: 1px solid #cccccc !important; /*no*/
}

.block {
  display: flex;
  align-items: center;
}

.gradient {
  width: 200px;
  .gradient-view {
    height: 100px;
    border: 1px solid #eeeeee;
    border-radius: 10px;
  }

  .gradient-operation {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    i {
      color: $color-theme;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        color: #286de7;
      }
    }
  }
}
</style>