<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-26 13:51:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 16:41:33
-->
<template>
  <global-tab-page>
    <goods-category :groups="project.config.goodsGroups" />
  </global-tab-page>
</template>

<script>
import GoodsCategory from "@/components/GoodsCategory";
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