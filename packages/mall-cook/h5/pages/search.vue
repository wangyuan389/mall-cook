<!--
 * @Description: 搜索页
 * @Autor: WangYuan
 * @Date: 2021-08-16 14:43:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 16:04:37
-->
<template>
  <div class="search">
    <search-bar></search-bar>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
export default {

  components: {
    SearchBar,
  },

  data() {
    return {}; 
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: 100%;
  background: #fff;
}
</style>