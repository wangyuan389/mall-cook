<template>
  <view>
    <GoodsCategory :groups="project.config.goodsGroups" />

    <TabBar></TabBar>
  </view>
</template>

<script>
import TabBar from "@/components/TabBar";
import GoodsCategory from "@/components/GoodsCategory";
import { mapGetters } from "vuex";

export default {
  components: {
    TabBar,
    GoodsCategory,
  },

  computed: {
    ...mapGetters(["project"]),
  },
};
</script>

<style lang='scss'>
</style>