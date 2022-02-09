<!--
 * @Description: 手机页面预览容器
 * @Autor: WangYuan
 * @Date: 2021-05-25 14:55:42
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-09 20:19:35
-->
<template>
  <div class="ctn">
    <div v-show="head" class="ctn-head"></div>
    <div class="ctn-body">
      <slot></slot>
    </div>
    <div class="ctn-height-tag">
      <span>iPhone 8手机高度</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneCtn",
  props: {
    head: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.ctn {
  position: relative;
  width: 375px; /*no*/
  margin: 70px auto 200px auto; /*no*/
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);

  .ctn-head {
    widows: 100%; /*no*/
    height: 64px; /*no*/
    background-image: url("./phone-head.png");
    background-size: cover;
  }

  .ctn-body {
    min-height: 603px; /*no*/
    background: #fff;
  }

  .ctn-height-tag {
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