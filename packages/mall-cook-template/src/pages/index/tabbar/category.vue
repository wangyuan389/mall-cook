<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-26 13:51:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-09 20:04:22
-->
<template>
  <global-tab-page>
    <!-- 商品分类 -->
    <goods-category
      v-if="project.id && !isAuth"
      :groups="project.config.goodsGroups"
    />
    <!-- 虚拟Mall-Cook信息页面，用于小程序审核 -->
    <page-git v-else />
  </global-tab-page>
</template>

<script>
import GoodsCategory from "@/components/goods-category";
import PageGit from "@/components/page-git";

import { mapGetters } from "vuex";

export default {
  components: {
    GoodsCategory,
    PageGit,
  },

  computed: {
    ...mapGetters(["project","isAuth"]),
  },
};
</script>

<style lang='scss'>
</style>