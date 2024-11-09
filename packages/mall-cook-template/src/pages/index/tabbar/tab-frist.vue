<!--
 * @Description: 首页后第一个tabbar页面
 * @Autor: WangYuan
 * @Date: 2022-03-22 10:32:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-22 14:45:11
-->
<template>
  <tabbar-page :location="1"></tabbar-page>
</template>

<script>
import tabbarPage from "@/components/tabbar-page";

export default {
  components: {
    tabbarPage,
  },
};
</script>

