<!--
 * @Description: 导航组件
 * @Autor: WangYuan
 * @Date: 2021-08-24 19:16:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:46:14
-->
<template>
  <div class="flex row-center col-center relative p12 bg-h5-theme f-white">

    <!-- 返回按钮 -->
    <van-icon
      class="f22"
      name="arrow-left"
    />

    <!-- 标题 -->
    <span class="f14 f-bold">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "HeadBar",

  props: ["title"],
};
</script>