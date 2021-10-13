<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-09 10:36:39
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 19:45:49
-->
<template>
  <div class="wrap">

    <!-- 画布 -->
    <div class="wrap-center">
      <schema-edit-canvas ref="canvas"></schema-edit-canvas>
    </div>

    <!-- 组件列表 -->
    <!-- <ul class="wrap-left">
      <li
        class="wrap-left-item"
        v-for="(val,key) in $setCmschemaCmpConfigpConfig"
        :data-component='val.component'
        draggable
        @dragstart='handleDragStart'
        @dragend="dragEnd"
      >
        {{val.label}}
      </li>
    </ul> -->

    <div class="wrap-left">
      <draggable
        :group='{name: "menu", put: true, pull:"clone"}'
        :sort="false"
        :clone='handleClone'
        class="h100"
        
      >
        <div
          class="wrap-left-item"
          v-for="val in $schemaCmpConfig"
        >
          {{val.label}}
        </div>
      </draggable>
    </div>

    <!-- 组件配置 -->
    <div class="wrap-right">right</div>
  </div>
</template>

<script>
import SchemaEditCanvas from "./SchemaEditCanvas.vue";
import Draggable from "vuedraggable";

export default {
  provide() {
    return {
      edit: this,
    };
  },

  components: {
    SchemaEditCanvas,
    Draggable,
  },

  props: {
    value: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {
      dragComponent: {},
    };
  },

  methods: {
    handleClone(e) {
      return JSON.parse(JSON.stringify(e));
    },

    handleDragStart(e) {
      this.dragComponent = e.target.dataset.component;
    },

    dragEnd() {
      console.log("拖拽结束xxx");
      this.$refs["canvas"].addComponment();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 700px; /*no*/
  padding-left: 200px; /*no*/
  padding-right: 300px; /*no*/
  background: #f7f8fa;
  border: solid 1px #e4e7ed;

  .wrap-left {
    float: left;
    width: 200px; /*no*/
    height: 100%; /*no*/
    margin-left: -100%; /*no*/
    position: relative;
    left: -200px; /*no*/
    background: #fff;

    .wrap-left-item {
      width: 80px;
      height: 34px;
      margin: 10px;
      line-height: 34px;
      border-radius: 4px;
      background: #e8f0fb50;
      font-size: 12px;
      text-align: center;
      color: #7d7e80;
      cursor: pointer;
    }
  }

  .wrap-center {
    float: left;
    width: 100%; /*no*/
    height: 100%; /*no*/
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }

  .wrap-right {
    float: left;
    width: 300px; /*no*/
    height: 100%; /*no*/
    margin-left: -300px; /*no*/
    position: relative;
    left: 300px; /*no*/
    background: #fff;
  }
}
</style>