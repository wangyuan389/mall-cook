<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-25 14:28:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-25 17:11:52
-->
<template>
  <view>
    <!-- 状态栏 -->
    <view v-if="isTop" class="top-bar" :style="[barBg]">
      <view
        class="top-bar-status"
        :style="{ height: statusBarHeight + 'px' }"
      ></view>
      <view class="top-bar-content flex-center">
        {{ title }}
      </view>
    </view>

    <u-navbar
      v-else
      :is-back="false"
      :background="{ background: '#fff' }"
      border-bottom
    >
      <view class="nav-title">{{ title }}</view></u-navbar
    >

    <view
      v-show="placeholder"
      :style="{ height: statusBarHeight + 48 + 'px' }"
    ></view>
  </view>
</template>

<script>
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

  created() {
    this.getSystemInfo();
  },

  data() {
    return {
      statusBarHeight: 0,
    };
  },

  computed: {
    barBg() {
      if (this.background)
        return {
          background: this.background,
        };
      return {};
    },
  },

  methods: {
    // 获取状态栏高度
    getSystemInfo() {
      let that = this;
      uni.getSystemInfo({
        success: (res) => {
          wx.getSystemInfo({
            success: function (res) {
              that.statusBarHeight = res.statusBarHeight;
            },
          });
        },
      });
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

  .top-bar-status {
    width: 100%;
  }

  .top-bar-content {
    width: 100%;
    height: 48px;
  }
}

.nav-title {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 750rpx;
  text-align: center;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: bold;
}
</style>