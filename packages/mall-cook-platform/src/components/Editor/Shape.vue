<!--
 * @Description: 画板组件容器 （配置工具栏）
 * @Autor: WangYuan
 * @Date: 2021-05-24 16:37:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-08 10:24:11
-->
<template>
  <div
    class="shape"
    @click="setcurComponent(data)"
  >

    <!-- 选中组件高亮 -->
    <div
      v-if="curComponent && curComponent.id == data.id"
      class="shape-solid"
      :class="[dragComponent?'event-none':'']"
    ></div>

    <div
      class="shape-dashed"
      :class="[dragComponent?'event-none':'']"
    ></div>

    <!-- 组件工具栏 -->
    <div class="shape-tab">

      <!-- 删除 -->
      <template v-if="curComponent && curComponent.id == data.id">
        <i
          class="iconfont icon-shanchu tab-icon f16"
          @click.stop="delComponent(data.id)"
        ></i>
      </template>

      <!-- 组件名 -->
      <span v-else>{{data.name}}</span>
    </div>

    <slot></slot>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "shape",

  props: {
    data: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters(["curComponent", "dragComponent"]),
  },

  methods: {
    ...mapMutations(["setcurComponent", "delComponent"]),
  },
};
</script>

<style lang="scss" scoped>
.shape {
  position: relative;

  &:hover {
    .shape-dashed {
      display: block;
    }
  }

  .shape-dashed {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: dashed 1px $color-theme;
    z-index: 100;
  }

  .shape-solid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 2px $color-theme;
    z-index: 100;
  }

  .shape-tab {
    position: absolute;
    right: -86px; /*no*/
    top: 0; /*no*/
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px; /*no*/
    height: 24px; /*no*/
    font-size: 12px; /*no*/
    color: #333;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &::after {
      content: "";
      position: absolute;
      right: 100%; /*no*/
      top: 7px; /*no*/
      width: 0; /*no*/
      height: 0; /*no*/
      border-width: 5px; /*no*/
      border-style: solid;
      border-color: transparent;
      margin-bottom: -1px; /*no*/
      border-right-width: 5px; /*no*/
      border-right-color: currentColor;
      color: #fff;
    }
  }

  .event-none {
    pointer-events: none;
  }

  .tab-icon {
    color: #969799;
    cursor: pointer;

    &:hover {
      color: #87888a;
    }
  }
}
</style>