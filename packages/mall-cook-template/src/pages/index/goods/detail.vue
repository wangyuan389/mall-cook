<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-07 11:34:39
-->
<template>
  <global-page :loading="loading" bgColor="#FFFFFF">
    <custom-capsule></custom-capsule>
    <view class="goods">
      <view class="goods-body">
        <u-swiper :list="goods.imgList" height="600"></u-swiper>

        <!-- 商品信息 -->
        <view class="mb8 pt10 pb10 pl20 pr20 bg-white">
          <view class="flex col-center mb8 f-h5-theme">
            <view>
              <span class="f14 f-bold">￥</span>
              <span class="f22 f-bold">{{ goods.price | moneyDec }}</span>
            </view>
            <span
              class="ml5 pt3 pb3 pl6 pr6 r15 f-h5-theme f12"
              style="background: #ffecec"
              >会员价</span
            >
          </view>
          <view class="mb12 f12 f-h5-grey">
            <span>价格</span>
            <span class="text-through"
              >￥{{ goods.originalPrice | moneyDec }}</span
            >
          </view>
          <view class="mb8 f16 f-bold lb-1 lh-22" style="color: #59595a">
            {{ goods.name }}
          </view>
          <view class="f12 f-h5-grey">{{ goods.describe }}</view>
        </view>

        <!-- 商品简介 -->
        <view class="rich" v-html="goods.richText"></view>

        <!-- 商品信息 -->
        <view class="flex row-center mt20 mb10 f12 f-h5-grey">
          <view class="lb-1">mall-cook 提供技术支持</view>
        </view>
      </view>

      <submit-bar @addCar="addCar"></submit-bar>

      <u-toast ref="uToast" />
    </view>
  </global-page>
</template>

<script>
import SubmitBar from "@/components/submit-bar";
import CustomCapsule from "@/components/custom-capsule";
import { mapMutations, mapGetters } from "vuex";
import { getGoodsDetail } from "@/api/index";

export default {
  components: {
    SubmitBar,
    CustomCapsule,
  },
  onLoad(options) {
    this.getGoods(options.id);
  },

  data() {
    return {
      loading: true,
      goods: {},
    };
  },

  computed: {
    ...mapGetters(["carList"]),
  },

  methods: {
    ...mapMutations(["pushCarList", "resetOrder"]),

    // 获取商品详情
    async getGoods(id) {
      let { data } = await getGoodsDetail({ id });
      this.goods = data;
      this.goods.richText = this.goods.richText.replace(
        /\<img/gi,
        '<img style="width:100%;height:auto"'
      );
      this.loading = false;
    },

    // 加入购物车
    addCar() {
      this.pushCarList(this.goods);
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep .rich {
  margin-bottom: 8px;
  padding: 10px;
  background: #fff;

  img {
    width: 100%;
  }
}

.goods {
  height: 100vh;

  .goods-body {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
}
</style>