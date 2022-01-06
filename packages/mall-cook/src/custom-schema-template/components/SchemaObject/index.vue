<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-05 13:12:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 20:47:08
-->
<template>
  <div class="wrap">

    <div class="wrap-label">
      <span>{{label}}</span>
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
  name: "SchemaObject",
  props: {
    label: {
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
  background: #fff;

  .wrap-label {
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