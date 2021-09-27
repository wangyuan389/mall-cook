<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-03 15:05:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 19:48:10
-->
<template>
  <div class="config-item flex" style="margin-bottom:20px">
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