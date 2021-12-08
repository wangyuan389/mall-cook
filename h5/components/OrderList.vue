<!--
 * @Description: 订单列表组件
 * @Autor: WangYuan
 * @Date: 2021-09-15 19:10:59
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-03 11:00:05
-->
<template>
  <div>

    <!-- 订单列表 -->
    <ul
      v-if="list.length"
      class="mt10"
    >
      <li
        v-for="item in list"
        :key="item.id"
        class="mb10 bg-white"
      >

        <!-- 订单头部 -->
        <div class="flex row-between col-center pt10 pb10 pl16 pr16 h5-underline">
          <div class="logo">自营</div>
          <div class="f15 f-h5-theme f-bold">{{statusCfg[item.status]}}</div>
        </div>

        <!-- 商品信息 -->
        <van-cell-group class="mt5">
          <van-card
            v-for="item in item.list"
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
        <van-cell-group>
          <van-cell title="">
            <template #right-icon>
              <span class="f12 f-h5-grey">订单金额：</span>
              <span class="f16">{{item.total | moneyDec}}</span>
            </template>
          </van-cell>
          <van-cell
            title=""
            v-if="item.status == 1"
          >
            <template #right-icon>
              <van-button
                size='mini'
                round
                plain
                @click="toPay(item.id)"
              >去支付</van-button>
            </template>
          </van-cell>
        </van-cell-group>
      </li>
    </ul>

    <!-- 空订单列表 -->
    <van-empty
      v-else
      class="mt80"
      image="http://110.42.184.128:8090/img/1638500391170.jpg"
      description="你还没有订单！"
    />
  </div>
</template>

<script>
export default {
  props: ["list"],

  data() {
    return {
      statusCfg: {
        1: "待支付",
        2: "待发货",
        3: "待收货",
        4: "待评价",
      },
    };
  },

  methods: {
    // 支付
    toPay(id) {
      this.$router.push({ name: "pay", query: { orderId: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-button {
  width: 70px;
  color: $h5-color-theme;
  border-color: $h5-color-theme;
}

::v-deep .van-cell-group::after,
.van-cell::after {
  border-width: 0;
}

::v-deep .van-cell {
  padding: 0px 16px 10px 0;
}

.logo {
  padding: 5px 6px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  background: $h5-color-theme;
}
</style>