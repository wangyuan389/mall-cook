<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-26 13:51:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-28 17:03:36
-->
<template>
  <global-tab-page>
    <goods-category :groups="project.config.goodsGroups" />
  </global-tab-page>
</template>

<script>
import GoodsCategory from "@/components/goods-category";
import { mapGetters } from "vuex";

export default {
  components: {
    GoodsCategory,
  },

  computed: {
    ...mapGetters(["project"]),
  },
};
</script>

<style lang='scss'>
</style>