<!--
 * @Description: 我的页
 * @Autor: WangYuan
 * @Date: 2021-09-13 15:03:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:32:51
-->
<template>
  <div class="my">

    <!-- 头部 -->
    <div class="my-head">

      <!-- 已登录 -->
      <template v-if="token">
        <img
          class="my-head-avatar"
          src="https://img1.baidu.com/it/u=436125409,925494567&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
        >
        <span class="my-head-name">雨尽阑珊</span>
      </template>

      <!-- 未登录 -->
      <template v-else>
        <img
          class="my-head-avatar"
          src="https://img2.baidu.com/it/u=2415500725,2124016327&fm=26&fmt=auto"
          @click="$routerPage('login')"
        >
        <p
          class="my-head-login flex-center"
          @click="$routerPage('login')"
        >
          <span>立即登录</span>
          <van-icon
            class="ml4 f12"
            name="arrow"
          />
        </p>
      </template>
    </div>

    <!-- 金额 -->
    <ul class="flex pt20 pb20 mb10 bg-white">
      <li
        v-for="item in numList"
        :key="item.name"
        class="flex-1 flex-column col-center "
      >
        <span class="mb10 f18 f-bold">{{item.value}}</span>
        <span class="f14">{{item.label}}</span>
      </li>
    </ul>

    <!-- 订单 -->
    <van-cell
      title="订单信息"
      value="查看所有订单"
      size="large"
      is-link
    />
    <ul class="flex bg-white pt20 pb20">
      <li
        v-for="item in orderList"
        :key="item.value"
        class="flex-1 flex-column col-center"
        @click="toOrderList(item)"
      >
        <i
          class="iconfont mb10 f22"
          :class="item.icon"
        ></i>
        <span class="f13">{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "my",

  data() {
    return {
      numList: [
        {
          label: "余额",
          name: "money",
          value: "0.00",
        },
        {
          label: "优惠券",
          name: "integral",
          value: "0",
        },
      ],
      orderList: [
        {
          label: "待付款",
          icon: "icon-daifukuan",
          value: 1,
        },
        {
          label: "待发货",
          icon: "icon-daifahuo",
          value: 2,
        },
        {
          label: "待收货",
          icon: "icon-yifahuo",
          value: 3,
        },
        {
          label: "待评价",
          icon: "icon-pingjia",
          value: 4,
        },
        {
          label: "退款/售后",
          icon: "icon-tuihuanhuo",
          value: 5,
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["token"]),
  },

  methods: {
    // 跳转订单列表
    toOrderList(item) {
      this.$router.push({ name: "my-order", query: { type: item.value } });
    },
  },
};
</script>

<style lang="scss" scoped>
.my {
  background-image: linear-gradient(#cccccc 5%, #f8f8f8 20%);
  padding-top: 20px;
  height: 100%;

  .my-head {
    display: flex;
    align-items: center;
    width: 345px;
    height: 100px;
    margin: 0 auto;
    padding: 0 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-image: url("https://img1.baidu.com/it/u=2927948991,2013039545&fm=26&fmt=auto&gp=0.jpg");
    background-size: 100%;

    .my-head-avatar {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .my-head-name {
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }

    .my-head-login {
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 14px;
      color: #fff;
      background: #cccccc60;

      span {
        font-weight: 700;
      }
    }
  }
}
</style>