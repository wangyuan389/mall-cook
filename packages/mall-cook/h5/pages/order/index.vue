<!--
 * @Description: 确认订单页
 * @Autor: WangYuan
 * @Date: 2021-09-13 15:52:17
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:28:13
-->
<template>
  <div class="order">

    <!-- 快递信息填写 -->
    <van-cell-group>
      <van-cell
        title="配送方式"
        value="商家配送"
      />
      <van-cell
        title="请添加收货地址"
        icon="location-o"
        size="large"
        is-link
        @click="$routerPage('order-address-list')"
      >
        <template
          #title
          v-if="order.address.id"
        >
          {{addressDetail}}
        </template>
        <template
          #label
          v-if="order.address.id"
        >
          <span class="mr10">{{order.address.name}}</span>
          <span>{{order.address.tel}}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 购物清单 -->
    <van-cell-group class="mt10">
      <van-cell
        icon="orders-o"
        title="购物清单"
      />
      <van-card
        v-for="item in order.list"
        :key="item.id"
        class="bg-white"
        :num="item.num"
        :price="$price(item.price)"
        :title="item.name"
        :thumb="item.cover"
        desc="描述信息"
      />
    </van-cell-group>

    <!-- 订单金额 -->
    <van-cell-group class="mt10">
      <van-cell title="商品金额">
        <template #right-icon>
          <price-span :price="order.total"></price-span>
        </template>
      </van-cell>
      <van-cell title="运费">
        <template #right-icon>
          免费
        </template>
      </van-cell>
      <van-cell title="">
        <template #right-icon>
          <span class="f12">合计：</span>
          <price-span :price="order.total"></price-span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 订单提交 -->
    <van-submit-bar
      label='实付：'
      :price="Number(order.total)"
      button-text="提交订单"
      @submit="submitOrder(order)"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PriceSpan from "../../components/PriceSpan.vue";

export default {
  name: "order",

  components: {
    PriceSpan,
  },

  computed: {
    ...mapGetters(["order"]),

    // 详细地址
    addressDetail() {
      let address = this.order.address;
      return `${address.province}${address.city}${address.county}${address.address}`;
    },
  },

  methods: {
    ...mapMutations(["submitOrder"]),
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-submit-bar {
  .van-button {
    background: $h5-color-theme;
  }

  .van-submit-bar__price {
    color: $h5-color-theme;
  }
}
</style>