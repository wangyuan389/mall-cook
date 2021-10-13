<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-12 15:16:14
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 19:45:51
-->
<template>
  <div class="canvas">
    <div class="canvas-head">
      <span>组件样式</span>
    </div>

    <draggable
      v-model="mValue"
      group="menu"
      ghostClass="ghost"
    >
      <transition-group class="canvas-content">
        <component
          v-for="(item,index) in mValue"
          :is='item.component'
          v-bind="item"
        ></component>
      </transition-group>
    </draggable>

    <!-- <draggable
      :group='{name: "menu"}'
      :sort="false"
      v-model="mValue"
      ghostClass="ghost"
      @add="handleAdd"
    >
      <div class="canvas-content">
        <component
          v-for="(item,index) in mValue"
          :is='item.component'
          v-bind="item"
        ></component>
      </div>
    </draggable> -->
  </div>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  name: "SchemaEditCanvas",

  inject: ["edit"],

  components: {
    Draggable,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      mValue: [],
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },
    mValue: {
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },

  methods: {
    handleAdd(e) {
      console.log("add");
      let { newIndex: newDraggableIndex } = e;
      console.log(newDraggableIndex);
    },

    addComponment() {
      let component = this.$schemaCmpConfig[this.edit.dragComponent];
      this.mValue.push(component);
    },
    handleDragover() {
      console.log("拖拽结束");
      console.log(this.edit.dragComponent);
    },
    handleDrog() {
      console.log("拖拽结束1");
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  // display: flex;
  // flex-direction: column;
  width: 360px; /*no*/
  background: #fff;
  margin: 20px auto; /*no*/
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1); /*no*/

  .canvas-head {
    padding: 10px 12px; /*no*/
    margin: 10px 0; /*no*/
    margin-top: 20px; /*no*/
    background: #e8f0fb40;
    font-size: 14px; /*no*/
    color: #323233;

    span {
      &::before {
        content: ".";
        width: 3px; /*no*/
        height: 10px; /*no*/
        margin-right: 8px; /*no*/
        background: $color-theme;
      }
    }
  }

  .canvas-content {
    padding: 0 20px; /*no*/
    min-height: 600px; /*no*/
  }
}

.ghost {
  width: 100%;
  height: 40px /*no*/;
  background-image: url("../../assets/image/ghost.jpg");

  &::after {
    content: "组件放置区域";
    padding: 8px 30px /*no*/;
    background: #5487df;
    color: #fff;
    font-size: 12px /*no*/;
    pointer-events: none;
  }
}
</style>