<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-05 13:12:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-07-01 10:05:46
-->
<template>
  <div class="wrap">

    <div
      v-show="title"
      class="wrap-title"
    >
      <span>{{title}}</span>
    </div>

    <div class="wrap-body">
      <slot></slot>

      <div
        v-show="line"
        class="wrap-line"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigWrap",
  props: {
    title: {
      type: String,
      default: "",
    },
    line: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  .wrap-title {
    padding: 10px 12px; /*no*/
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

  .wrap-body {
    padding: 20px 20px 10px 20px; /*no*/

    .wrap-line {
      margin-top: 30px;
      height: 1px;
      background: #ebedf0;
    }
  }
}
</style>