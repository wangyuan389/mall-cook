<!--
 * @Description: 拖拽画板
 * @Autor: WangYuan
 * @Date: 2021-05-21 18:19:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-22 18:17:40
-->
<template>
  <div
    class="editor"
    :style="{backgroundColor:project.config.backgroundColor}"
    type='page'
    @dragover="fn"
    @drop="drog"
  >

    <!-- 可拖拽列表 -->
    <Draggable v-model="curPage.componentList">
      <template v-for="(item,index) in curPage.componentList">
        <div
          :key
          :data-index="index"
          type='item'
        >

          <!-- waiting -->
          <div
            v-if="item.type=='waiting'"
            class="waiting-ctn flex-center"
            type='waiting'
          >
            <div class="waiting-text">组件放置区域</div>
          </div>

          <!-- component -->
          <template v-else>
            <shape
              type='item'
              :data='item'
              :data-index="index"
            >
              <div :class="[dragComponent?'event-none':'']">
                <component
                  :is='item.component'
                  :config='item'
                  :style='$getWrapStyle(item.style)'
                  v-bind="item.attr"
                ></component>
              </div>
            </shape>
          </template>
        </div>
      </template>
    </Draggable>

    <!-- 页面设置 -->
    <el-tooltip
      effect="light"
      content="页面设置"
      placement="bottom"
    >
      <div class="editer-page flex-center">
        <i class="el-icon-setting"></i>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import Shape from "./Shape";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "editor",
  components: {
    Draggable,
    Shape,
  },

  data() {
    return {
      watingIndex: 0,
      fn: this.throttle(this.moveComponent, 1), // 移动节流控制
    };
  },

  computed: {
    ...mapGetters(["project", "curPage", "dragComponent", "dragStatus"]),
    componentList() {
      return this.curPage.componentList;
    },
  },

  methods: {
    ...mapMutations(["setDragComponent", "setDragStatus"]),

    // 节流
    throttle(fn, delay) {
      let prev = Date.now();

      return function () {
        let now = Date.now();
        let args = arguments;
        if (now - prev > delay) {
          fn(...args);
          prev = Date.now();
        }
      };
    },

    // 拖拽移动组件中
    moveComponent(e) {
      e.preventDefault();
      e.stopPropagation();

      let type = e.target.getAttribute("type");
      let waitingModel = {
        type: "waiting",
      };

      if (type == "waiting") return;

      if (type == "page") {
        if (!this.dragStatus) {
          this.watingIndex = this.componentList.length;
          this.setDragStatus(true);
          this.componentList.push(waitingModel);
        }
      }

      if (type == "item") {
        let target = e.target;
        let [y, h, curIndex] = [
          e.offsetY,
          target.offsetHeight,
          target.dataset.index,
        ];
        let direction = y < h / 2;

        if (!this.dragStatus) {
          console.log("初次进入");
          console.log(direction);

          if (direction) {
            if (curIndex == 0) {
              this.componentList.unshift(waitingModel);
            } else {
              this.componentList.splice(curIndex, 0, waitingModel);
            }
          } else {
            curIndex = +curIndex + 1;
            this.componentList.splice(curIndex, 0, waitingModel);
          }
        } else {
          let isWaiting;
          if (direction) {
            let i = curIndex == 0 ? 0 : curIndex - 1;
            isWaiting = this.componentList[i].type == "waiting";
          } else {
            let i = +curIndex + 1;
            isWaiting =
              this.componentList.length > i &&
              this.componentList[i].type == "waiting";
          }

          if (isWaiting) return;
          const temp = this.componentList.splice(this.watingIndex, 1);
          this.componentList.splice(curIndex, 0, temp[0]);
        }

        this.watingIndex = curIndex;
        this.setDragStatus(true);
      }
    },

    // 拖拽组件结束
    drog(e) {
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  width: 100%;
  min-height: 603px /*no*/;
  background: #f7f8fa;

  .editer-page {
    position: absolute;
    top: -50px;
    left: -80px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    i {
      font-size: 22px;
      color: #b0afb2;
    }
  }
}

.waiting-ctn {
  width: 100%;
  height: 40px /*no*/;
  background-image: url("./image/bg.jpg");

  .waiting-text {
    padding: 8px 30px /*no*/;
    background: #5487df;
    color: #fff;
    font-size: 12px /*no*/;
    pointer-events: none;
  }
}

.event-none {
  pointer-events: none;
}
</style>