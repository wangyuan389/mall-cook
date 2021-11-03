<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-02 19:17:46
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(process.env.VUE_APP_BASE_API);
    // 隐藏加载Loading
    document.getElementById('appLoading').style.display = 'none'
  }
}
</script>

<style lang="scss"></style>
