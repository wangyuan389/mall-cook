<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-13 15:31:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-14 10:54:25
-->
<template>
  <div class="waiting flex-center">
    <div class="waiting-text">组件放置区域</div>
  </div>
</template>

<script>
export default {
  name: "waitingWidget",
};
</script>

<style lang='scss'>
.waiting {
  width: 100%;
  height: 39px /*no*/;
  background-image: url("./waiting.jpg");

  .waiting-text {
    padding: 8px 30px /*no*/;
    background: #5487df;
    font-size: 12px /*no*/;
    color: #fff;
    pointer-events: none;
  }
}
</style>