<!--
 * @Description: 预览容器
 * @Autor: WangYuan
 * @Date: 2021-05-25 14:55:42
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-05-26 16:26:10
-->
<template>
  <div class="PreviewCtn">
    <div class="preview-head"></div>
    <div class="preview-body">
      <slot></slot>
    </div>
    <div class="preview-height-tag">
      <span>iPhone 8手机高度</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreviewCtn",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.PreviewCtn {
  position: relative;
  width: 375px; /*no*/
  margin: 70px auto 200px auto; /*no*/
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);

  .preview-head {
    widows: 100%; /*no*/
    height: 64px; /*no*/
    background-image: url("./image/phone-head.png");
    background-size: cover;
  }

  .preview-body {
    min-height: 603px; /*no*/
    background: #fff;
  }

  .preview-height-tag {
    position: absolute;
    top: 650px; /*no*/
    left: -130px; /*no*/
    height: 17px; /*no*/
    width: 130px; /*no*/
    border-bottom: 1px solid #dedede;
    color: #a2a2a2;
    text-align: left;

    span {
      font-size: 12px; /*no*/
    }
  }
}
</style>