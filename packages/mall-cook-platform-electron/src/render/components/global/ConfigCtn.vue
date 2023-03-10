<!--
 * @Description: 属性面板容器
 * @Autor: WangYuan
 * @Date: 2021-05-25 14:41:42
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-18 16:20:16
-->
<template>
  <div class="decorate">
    <div class="decorate-head">
      {{ title }}
    </div>

    <div class="decorate-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigCtn",

  props: ["title"],
};
</script>

<style lang="scss" scoped>
.decorate {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 360px; /*no*/
  background: #fff;

  .decorate-head {
    height: 70px; /*no*/
    line-height: 70px; /*no*/
    padding-left: 12px; /*no*/
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
    text-align: left;
  }

  .decorate-body {
    height: calc(100% - 70px); /*no */
    overflow: auto;
    padding-top: 20px;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>