<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-08 11:55:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-05 15:43:17
-->
<template>
  <div class="wrap">

    <!-- 搜索 -->
    <van-search
      class="search"
      shape="round"
      placeholder="搜索商品"
      v-model="search"
      disabled
      @click="$routerPage('search')"
    >
    </van-search>

    <!-- 商品列表 -->
    <div class="list">
      <goods-search-list></goods-search-list>
    </div>

  </div>
</template>

<script>
import GoodsSearchList from "../../components/Goods/GoodsSearchList.vue";

export default {
  name: "list",

  components: {
    GoodsSearchList,
  },

  created() {
    let { search, type } = this.$route.query;
    this.search = search || '';

    if (type) {
      document.title = type.name;
    }
  },

  data() {
    return {
      search: "",
      type: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  background: #fff;

  .list {
    height: calc(100% - 54px);
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>