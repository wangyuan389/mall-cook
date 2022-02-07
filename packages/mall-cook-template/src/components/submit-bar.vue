<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 10:07:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-07 11:39:30
-->
<template>
  <view class="submit">
    <view class="submit-left">
      <view class="btn" @click="$jump({ name: 'home' })">
        <u-icon
          class="btn-icon"
          name="shouye"
          custom-prefix="icon"
          size="36"
        ></u-icon>
        <text>首页</text>
      </view>
      <view class="btn">
        <u-icon
          class="btn-icon"
          name="xiaoxizhongxin"
          custom-prefix="icon"
          size="36"
        ></u-icon>
        <text>客服</text>
      </view>
      <view class="btn" @click="$jump({ name: 'car' })">
        <u-badge
          type="error"
          :count="carListLen"
          size="mini"
          :offset="[5, 5]"
        ></u-badge>
        <u-icon
          class="btn-icon"
          name="gouwuche"
          custom-prefix="icon"
          size="36"
        ></u-icon>
        <text>购物车</text>
      </view>
    </view>
    
    <ul class="submit-right">
      <li @click="onAddCar">加入购物车</li>
      <li @click="onBuy">立即购买</li>
    </ul>
  </view>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "submit",

  computed: {
    ...mapGetters(["carList"]),
    carListLen() {
      return this.carList.length;
    },
  },

  methods: {
    routerHome() {
      this.$jump({
        name: "home",
      });
    },
    routerCar() {
      this.$jump({
        name: "car",
      });
    },
    onAddCar() {
      this.$emit("addCar", {});
    },
    onBuy() {},
  },
};
</script>

<style lang="scss" scoped>
.submit {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.1);

  .submit-left {
    display: flex;
    font-size: 11px;
    .btn {
      position: relative;
      width: 50px;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:active {
        background-color: #f2f3f4;
      }

      .btn-icon {
        margin-bottom: 5px;
      }
    }
  }

  .submit-right {
    display: flex;
    width: 240px;
    height: 40px;
    margin-right: 5px;
    font-size: 14px;
    color: #fff;

    li {
      flex: 1;
      text-align: center;
      line-height: 40px;
      color: #fff;

      &:active {
        opacity: 0.8;
      }
    }

    li:first-child {
      background: linear-gradient(90deg, #ffd01e, #ff8917);
      border-radius: 20px 0 0 20px;
    }
    li:last-child {
      background: linear-gradient(90deg, #ff6034, #ee0a24);
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>