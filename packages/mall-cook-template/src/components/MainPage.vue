<template>
  <view class="page">
    <view class="page-body">
      <slot />
    </view>
    <tab-bar></tab-bar>
  </view>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  components: {
    TabBar,
  },
};
</script>

<style lang='scss'>
.page {
  height: 100vh;

  .page-body {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
}
</style>