<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-25 14:28:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-25 17:11:52
-->
<template>
  <view>
    <!-- tabbar -->
    <view class="top-bar" :style="[barBg]">
      <!-- 状态栏 -->
      <view class="w-100" :style="{ height: statusHeight + 'px' }"></view>
      <view
        class="top-bar-content flex-center"
        :style="{ color: isTop ? '#FFFFFF' : '#000000' }"
      >
        {{ title }}
      </view>
    </view>

    <!-- 占位符 -->
    <view
      v-show="placeholder"
      :style="{ height: statusHeight + 44 + 'px' }"
    ></view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    placeholder: {
      type: Boolean,
      default: true,
    },
    isTop: {
      type: Boolean,
      default: true,
    },
    background: {
      type: String,
      default: "",
    },
  },

  computed: {
    ...mapGetters(["statusHeight"]),

    barBg() {
      let background = `url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/2d0ca750-0e3d-11eb-b244-a9f5e5565f30.png")
    no-repeat center / 100% 100%`;

      if (this.background) background = this.background;

      if (!this.isTop) background = "#FFFFFF";

      return {
        background,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  position: fixed;
  top: 0;
  width: 100%;
  color: #ffffff;
  background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/2d0ca750-0e3d-11eb-b244-a9f5e5565f30.png")
    no-repeat center / 100% 100%;
  z-index: 1;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: bold;

  .top-bar-content {
    width: 100%;
    height: 44px;
  }
}
</style>