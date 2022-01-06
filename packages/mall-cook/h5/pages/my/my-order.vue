<!--
 * @Description: 我的订单页
 * @Autor: WangYuan
 * @Date: 2021-09-15 09:26:27
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:33:33
-->
<template>
  <van-tabs v-model="active">
    <van-tab title="全部">
      <order-list :list='orderList'></order-list>
    </van-tab>
    <van-tab title="待付款">
      <order-list :list='unPaidList'></order-list>
    </van-tab>
    <van-tab title="待发货">
      <order-list :list='paidList'></order-list>
    </van-tab>
    <van-tab title="待收货">
      <order-list :list='deliveryList'></order-list>
    </van-tab>
    <van-tab title="待评价">
      <order-list :list='evaluateList'></order-list>
    </van-tab>
  </van-tabs>
</template>

<script>
import OrderList from "../../components/OrderList.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    OrderList,
  },

  data() {
    return {
      active: 0,
    };
  },

  computed: {
    ...mapGetters(["orderList"]),

    // 待付款订单
    unPaidList() {
      return this.orderList.filter((item) => item.status == 1);
    },

    // 待发货订单
    paidList() {
      return this.orderList.filter((item) => item.status == 2);
    },

    // 待收货订单
    deliveryList() {
      return this.orderList.filter((item) => item.status == 3);
    },

    // 待评价订单
    evaluateList() {
      return this.orderList.filter((item) => item.status == 4);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-tabs__line {
  background-color: $h5-color-theme;
}
</style>