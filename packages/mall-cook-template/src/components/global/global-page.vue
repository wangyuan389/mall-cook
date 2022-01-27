<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-27 15:39:27
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 17:01:39
-->
<template>
  <div class="wrap">
    <!-- 加载 -->
    <full-loading :top="top" :show="loading" :bgColor="bgColor"></full-loading>

    <slot />
  </div>
</template>

<script>
import FullLoading from "@/components/full-loading.vue";

export default {
  components: {
    FullLoading,
  },

  props: {
    top: {
      type: [String, Number],
      default: 40,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: "transparent",
    },
  },

  provide() {
    return {
      page: this,
    };
  },

  top: {
    type: [String, Number],
    default: 40,
  },
  show: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: "transparent",
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrap {
}
</style>