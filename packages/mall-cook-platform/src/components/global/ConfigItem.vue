<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-03 15:05:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 15:20:57
-->
<template>
  <div class="flex p10 bg-white">
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