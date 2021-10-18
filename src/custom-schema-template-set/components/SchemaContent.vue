<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-12 17:58:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 15:31:36
-->
<template>
  <div class="canvas">

    <!-- centet -->
    <div class="canvas-center">
      <div class="canvas-center-drag">
        <schema-content-item :componentList.sync='content.model.componentList'></schema-content-item>
      </div>
    </div>

    <!-- left -->
    <div class="canvas-left">
      <draggable
        v-model="$schemaCmpConfig"
        :options="{group:{name: 'itxst',pull:'clone'},sort: false}"
        :clone='handleClone'
        animation="300"
      >
        <div
          v-for="item in $schemaCmpConfig"
          :key="item.component"
          class="canvas-left-item"
        >{{item.label}}</div>
      </draggable>
    </div>

    <!-- right -->
    <div class="canvas-right">
      <template v-if="content.curComponent">
        <component
          v-if="hasComponentConfig"
          :is="curComponentConfig"
        ></component>
      </template>
    </div>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import SchemaContentShape from "./SchemaContentShape.vue";
import SchemaContentItem from "./SchemaContentItem";

export default {
  components: {
    draggable,
    SchemaContentItem,
    SchemaContentShape,
  },

  inject: ["content"],

  computed: {
    curComponentConfig() {
      return `${this.content?.curComponent?.component}Config`;
    },
  },

  methods: {
    hasComponentConfig() {
      return this.content.curComponent;
    },

    handleClone(e) {
      return {
        ...this._.cloneDeep(e),
        id: this.$getRandomCode(8),
        key: `${e.type}_${this.$getRandomCode(2, false)}`,
      };
    },
  },
};
</script>

<style lang='scss' scoped>
.canvas {
  height: 100%; /*no*/
  padding-left: 200px; /*no*/
  padding-right: 300px; /*no*/
  background: #f7f8fa;
  border: solid 1px #e4e7ed;

  .canvas-left {
    float: left;
    width: 200px; /*no*/
    height: 100%; /*no*/
    margin-left: -100%; /*no*/
    padding: 0 10px;
    position: relative;
    left: -200px; /*no*/
    background: #fff;

    .canvas-left-item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 90px; /*no*/
      padding: 15px 0; /*no*/
      font-size: 12px; /*no*/
      color: #666;
      cursor: pointer;

      i {
        font-size: 29px; /*no*/
        margin-top: 5px; /*no*/
        margin-bottom: 10px; /*no*/
      }

      &:hover {
        color: #fff;
        background: $color-theme;
      }
    }
  }

  .canvas-center {
    position: relative;
    float: left;
    width: 100%; /*no*/
    height: 100%; /*no*/
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .canvas-center-drag {
      width: 360px; /*no*/
      background: #fff;
      margin: 20px auto; /*no*/
      box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1); /*no*/
      min-height: 600px; /*no*/
    }
  }

  .canvas-right {
    float: left;
    width: 300px; /*no*/
    height: 100%; /*no*/
    margin-left: -300px; /*no*/
    position: relative;
    left: 300px; /*no*/
    background: #fff;
  }
}

.ghost {
  position: relative;
  width: 100%;
  height: 40px; /*no*/

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/image/ghost.jpg");
    z-index: 10000;
  }

  &::after {
    content: "组件放置区域";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 30px;
    line-height: 30px;
    background: #5487df;
    font-size: 12px /*no*/;
    color: #fff;
    text-align: center;
    pointer-events: none;
    z-index: 100001;
  }
}

.selector {
  display: none;
}

.event-none {
  // pointer-events: none;
  padding: 0 20px;
}
</style>