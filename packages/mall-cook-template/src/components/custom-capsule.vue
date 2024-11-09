<!--
 * @Description: 导航栏自定义胶囊按钮
 * @Autor: WangYuan
 * @Date: 2022-01-27 18:40:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 09:07:41
-->
<template>
  <div class="navbar">
    <u-navbar :is-back="false" :background="{ backgroundColor: 'transparent' }">
      <!-- 导航栏自定义胶囊 -->
      <view class="slot-wrap flex">
        <view class="slot-icon flex" @click="back()"
          ><u-icon name="arrow-left"></u-icon
        ></view>
        <view class="gap"></view>
        <view class="slot-icon flex" @click="subMenu = true"
          ><u-icon name="list"></u-icon
        ></view>
      </view>
      <!-- 导航栏菜单列表 -->
      <view v-show="subMenu">
        <view class="triangle"></view>
        <view class="subMenu">
          <view class="item" @click="$jump({ name: 'search' })">
            <u-icon name="search"></u-icon>
            <text>搜索商品</text>
          </view>
          <view class="item" @click="toFuture()">
            <u-icon name="order"></u-icon>
            <text>我的订单</text>
          </view>
          <view class="item" @click="toFuture()">
            <u-icon name="heart"></u-icon>
            <text>我的收藏</text>
          </view>
          <view class="item" @click="toFuture()">
            <u-icon name="clock"></u-icon>
            <text>我的足迹</text>
          </view>
        </view>
        <view class="mask" @click="subMenu = false"></view>
      </view>
    </u-navbar>
  </div>
</template>

<script>
export default {
  name: "capsule",
  data() {
    return {
      subMenu: false,
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    toFuture() {
      console.log("还未开发");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 750rpx;
  top: 0;
  z-index: 10;

  .slot-wrap {
    position: relative;
    margin-left: 10px;
    width: 88px;
    height: 30px;
    border-radius: 15px;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.2);
    border: 1px solid rgba($color: #ffffff, $alpha: 0.2);
    .slot-icon {
      align-items: center;
      justify-content: center;
      width: 50%;
      height: inherit;
    }
    .gap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 16px;
      background-color: rgba($color: #f1f1f1, $alpha: 0.2);
    }
  }

  .subMenu {
    position: absolute;
    top: 54px;
    left: 10px;
    width: 88px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    z-index: 12;
    .item {
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #f0f0f0;
      color: #555;
      font-size: 12px;
      &:active {
        background-color: #f2f3f4;
      }
      u-icon {
        margin: 0 8px;
      }
    }
    .item:last-child {
      border: none;
    }
  }
  .triangle {
    position: absolute;
    top: 44px;
    left: 70px;
    width: 15px;
    height: 15px;
    background-color: #fff;
    transform: rotate(45deg);
    z-index: 11;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 750rpx;
    height: 1334rpx;
    z-index: 11;
    // background-color: rgba($color: #000000, $alpha: 0.2);
  }
}
</style>