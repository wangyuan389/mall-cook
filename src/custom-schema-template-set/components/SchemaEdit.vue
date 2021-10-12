<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-09 10:36:39
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 15:19:34
-->
<template>
  <div class="wrap">
    <div class="wrap-center">
      <schema-edit-canvas></schema-edit-canvas>
    </div>
    <div class="wrap-left">left</div>
    <div class="wrap-right">right</div>
  </div>
</template>

<script>
import SchemaEditCanvas from "./SchemaEditCanvas.vue";
export default {
  components: {
    SchemaEditCanvas,
  },

  props: {
    value: {
      type: Array,
      default: () => {},
    },
  },

  data() {
    return {};
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