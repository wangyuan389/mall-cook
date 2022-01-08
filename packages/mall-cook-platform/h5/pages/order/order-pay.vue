<!--
 * @Description: 支付页
 * @Autor: WangYuan
 * @Date: 2021-09-15 16:31:14
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:27:45
-->
<template>
  <div class="pay">

    <h3 class="pay-title">支付金额</h3>

    <div class="pay-price">
      <span
        class="f18"
        style="letter-spacing:-1px"
      >￥</span>
      <span class="f26">{{order.total | moneyDec}}</span>
    </div>

    <!-- 支付方式 -->
    <van-radio-group
      v-model="radio"
      class="pay-way"
    >
      <van-cell-group>
        <van-cell
          label="推荐使用微信支付"
          size="large"
        >
          <template #title>
            <div class="flex col-center">
              <i class="iconfont icon-weixinzhifu pay-wx"></i>
              <span class="f18">微信支付</span>
            </div>
          </template>
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell size="large">
          <template #title>
            <div class="flex col-center">
              <i class="iconfont icon-zhifubaozhifu pay-zfb"></i>
              <span class="f18">支付宝支付</span>
            </div>
          </template>
          <template #right-icon>
            <van-radio :name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 支付按钮 -->
    <van-button
      class="pay-btn"
      color="#fd7f01"
      block
      @click="pay"
    >确认支付</van-button>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "pay",

  created() {
    this.getOrderDetail(this.$route.query.orderId);
  },

  data() {
    return {
      radio: 1,
      order: {},
    };
  },

  computed: {
    ...mapGetters(["orderList"]),
  },

  methods: {
    ...mapMutations(["payOrder"]),

    // 查询订单详情
    getOrderDetail(id) {
      this.order = this.orderList.find((o) => o.id == id);
    },

    // 支付
    pay() {
      this.payOrder(this.order.id);
      this.$toast("支付成功");
      this.$router.push({
        name: "order-pay-success",
        query: { orderId: this.order.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-radio__icon--checked {
  .van-icon-success {
    background-color: $h5-color-theme;
    border-color: $h5-color-theme;
  }
}

::v-deep .van-cell-group::after,
.van-cell::after {
  border-width: 0 !important;
}

.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: #fff;

  .pay-title {
    font-size: 14px;
    color: #adaeb2;
    margin-top: 80px;
  }

  .pay-price {
    margin-top: 15px;
  }

  .pay-way {
    width: 300px;
    margin-top: 50px;

    i {
      font-size: 26px;
      margin-right: 15px;
    }

    .pay-wx {
      color: #35cb5a;
    }

    .pay-zfb {
      color: #00a7ec;
    }
  }

  .pay-btn {
    width: 300px;
    margin-top: 50px;
    border-radius: 5px;
  }
}
</style>
