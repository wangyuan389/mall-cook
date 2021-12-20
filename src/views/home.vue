<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:37:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 15:28:33
-->
<template>
  <div class="page">
    <div class="page-head"></div>
    <div class="page-body">
      <control />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
  .page-head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    box-shadow: 0 4px 6px 0 rgba(12, 31, 80, 0.04);
  }

  .page-body {
    height: calc(100vh - 56px);
    width: 100%;
    margin-top: 56px;
    overflow: auto;
  }
}
</style>