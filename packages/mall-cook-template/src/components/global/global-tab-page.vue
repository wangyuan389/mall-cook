<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-09 20:16:00
-->
<template>
  <scroll-view class="page">
    <view class="page-body">
      <slot />
    </view>
    <custom-tab-bar></custom-tab-bar>
  </scroll-view>
</template>

<script>
import CustomTabBar from "@/components/custom-tab-bar";
import ReviewPage from "@/components/review-page";
import { mapGetters } from "vuex";

export default {
  components: {
    CustomTabBar,
    ReviewPage,
  },

  computed: {
    ...mapGetters(["project"]),
  },
};
</script>

<style lang='scss'>
.page {
  position: relative;
  // height: 100vh;
  // height: 100%;

  .page-body {
    // height: calc(100% - 50px);
    // overflow-y: auto;
    padding-bottom: 50px;
    background-color: #f7f7f7;
  }
}
</style>