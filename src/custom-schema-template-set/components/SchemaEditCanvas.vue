<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-12 15:16:14
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 15:33:53
-->
<template>
  <div class="canvas">
    <div class="canvas-head">
      <span>组件样式</span>
    </div>
    <div class="canvas-content">

    </div>
  </div>
</template>

<script>
export default {
  name: "SchemaEditCanvas",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  display: flex;
  flex-direction: column;
  width: 360px; /*no*/
  min-height: 600px; /*no*/
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
}
</style>