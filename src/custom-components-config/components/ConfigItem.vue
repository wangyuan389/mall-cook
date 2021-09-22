<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-03 15:05:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-06-07 15:52:56
-->
<template>
  <div class="flex mb20">
    <div class="w70 f13 f-grey pt10 ">{{label}}</div>
    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigItem",
  props: ["label", "info"],
  data() {
    return {};
  },
};
</script>