<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-06 15:52:17
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 16:03:33
-->
<template>
  <div class="category">

    <!-- 商品搜索 -->
    <div class="search">
      <van-search
        disabled
        shape="round"
        placeholder="搜索商品"
        @click="$routerPage('search')"
      >
      </van-search>
    </div>

    <!-- 商品分类 -->
    <GoodsCategory :groups='project.config.goodsGroups'></GoodsCategory>
  </div>
</template>

<script>
import GoodsCategory from "../components/Goods/GoodsCategory.vue";
import { mapGetters } from "vuex";

export default {
  name: "category",

  components: {
    GoodsCategory,
  },

  computed: {
    ...mapGetters(["project"]),
  },
};
</script>

<style lang="scss" scoped>
.category {
  height: 100%;

  .search {
    border-bottom: solid 0.5px #9b9b9b20;
  }
}
</style>