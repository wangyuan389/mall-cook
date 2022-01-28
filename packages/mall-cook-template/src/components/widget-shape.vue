<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-18 09:56:36
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-18 16:08:38
-->
<template>
  <div class="shape" @click="page.setCurWidgetId(widget.id)">
    <div v-if="page.curWidgetId == widget.id" class="shape-solid"></div>

    <div class="shape-dashed"></div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ["page"],
  props: ["widget"],
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
    border: dashed 1px #155bd4;
    z-index: 100;
  }

  .shape-solid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 1px #155bd4;
    z-index: 100;
  }
}
</style>