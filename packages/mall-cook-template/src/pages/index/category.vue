<template>
  <main-page>
    <goods-category :groups="project.config.goodsGroups" />
  </main-page>
</template>

<script>
import MainPage from "@/components/MainPage";
import GoodsCategory from "@/components/GoodsCategory";
import { mapGetters } from "vuex";

export default {
  components: {
    MainPage,
    GoodsCategory,
  },

  computed: {
    ...mapGetters(["project"]),
  },
};
</script>

<style lang='scss'>
</style>