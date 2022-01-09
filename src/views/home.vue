<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:37:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 15:28:33
-->
<template>
  <div class="page">
    <pageHeader />
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
  .page-body {
    height: calc(100vh - 56px);
    width: 100%;
    margin-top: 56px;
    overflow: auto;
  }
}
</style>