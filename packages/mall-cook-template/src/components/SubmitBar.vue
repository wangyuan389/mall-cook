<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 10:07:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-24 14:57:55
-->
<template>
  <view class="submit">
    <ul class="submit-left">
      <li class="submit-left-item" @click="routerHome">
        <u-icon name="home" size="36"></u-icon>
        <text>首页</text>
      </li>
      <li class="submit-left-item" @click="routerCar">
        <u-icon name="shopping-cart" size="36"></u-icon>
        <text>购物车</text>
      </li>
    </ul>
    <ul class="submit-right">
      <li @click="onAddCar">加入购物车</li>
      <li @click="onBuy">立即购买</li>
    </ul>
  </view>
</template>

<script>
export default {
  name: "submit",
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
    align-items: center;
    height: 100%;
    margin-right: 5px;
    color: #646566;

    .submit-left-item {
      margin: 0 12px;
      text-align: center;
      &:active {
        opacity: 0.8;
      }

      text {
        margin-top: 3px;
        font-size: 12px;
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