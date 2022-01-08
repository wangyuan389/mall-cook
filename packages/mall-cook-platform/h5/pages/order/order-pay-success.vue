<!--
 * @Description: 支付成功页
 * @Autor: WangYuan
 * @Date: 2021-09-15 17:04:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:27:12
-->
<template>
  <div class="pay">
    <div class="pay-bg">
      <div class="mt30 f18">
        <i class="iconfont icon-chenggong mr4 f24"></i>
        <span>支付成功</span>
      </div>
      <p class="mt20 f26">
        <span>{{order.total | moneyDec}}</span>
        <span class="ml4 f14">元</span>
      </p>
      <div
        class="pay-btn"
        @click="$router.push({name:'custom'})"
      >关闭</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "pay",

  created() {
    this.getOrderDetail(this.$route.query.orderId);
  },

  data() {
    return {
      order: {},
    };
  },

  computed: {
    ...mapGetters(["orderList"]),
  },

  methods: {
    
    // 查询订单详情
    getOrderDetail(id) {
      this.order = this.orderList.find((o) => o.id == id);
    },
  },
};
</script>

<style lang="scss" scoped>
.pay {
  height: 100%;
  background: #fff;

  .pay-bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 180px;
    color: #fff;
    background: $h5-color-theme;

    .pay-btn {
      margin-top: 30px;
      padding: 6px 44px;
      border-radius: 4px;
      box-shadow: 0 0 0 0.5px #fff;
      font-size: 14px;
    }
  }
}
</style>