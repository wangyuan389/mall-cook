<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-03-22 10:27:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-22 16:27:21
-->
<template>
  <scroll-view class="page">
    <view class="page-body">
      <category-page v-if="tab.jump.id == 'category'" />
      <car-page v-else-if="tab.jump.id == 'car'" />
      <my-page v-else-if="tab.jump.id == 'my'" />
      <custom-page v-else></custom-page>
    </view>

    <custom-tab-bar :active="tab.jump.id"></custom-tab-bar>
  </scroll-view>
</template>

<script>
import myPage from "./my-page";
import carPage from "./car-page";
import customPage from "./custom-page";
import categoryPage from "./category-page";
import CustomTabBar from "@/components/custom-tab-bar";
import { mapGetters } from "vuex";

export default {
  components: {
    CustomTabBar,
    categoryPage,
    customPage,
    myPage,
    carPage,
  },

  props: {
    location: {
      type: Number,
      default: 1,
    },
  },

  provide() {
    return {
      tabbar: this,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    tab() {
      return this.project.config.navigation.list[this.location];
    },
  },
};
</script>

<style lang="scss" scoped>
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