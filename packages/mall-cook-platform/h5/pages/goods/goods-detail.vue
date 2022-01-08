<!--
 * @Description: 商品详情页
 * @Autor: WangYuan
 * @Date: 2021-08-23 14:09:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-28 16:14:15
-->
<template>
  <div>
    <div class="mb70">
      <!-- 轮播 -->
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(g,index) in goods.imgList" :key="index">
          <van-image
            class="w-100 block"
            :src="g"
          />
        </van-swipe-item>
        <template #indicator>
          <div class="swiper-indicator f-white">{{ current + 1 }}/4</div>
        </template>
      </van-swipe>

      <!-- 商品信息 -->
      <div class="mb8 pt10 pb10 pl20 pr20 bg-white ">
        <div class="flex col-center mb8 f-h5-theme ">
          <div>
            <span class="f14 f-bold">￥</span>
            <span class="f22 f-bold">{{goods.price | moneyDec}}</span>
          </div>
          <span
            class="ml5 pt3 pb3 pl6 pr6 r15 f-h5-theme f12"
            style="background:#ffecec"
          >会员价</span>
        </div>
        <div class="mb12 f12 f-h5-grey">
          <span>价格</span>
          <span class="text-through">￥{{goods.originalPrice | moneyDec}}</span>
        </div>
        <div
          class="mb8 f16 f-bold lb-1 lh-22"
          style="color:#59595a"
        >{{goods.name}}</div>
        <div class="f12 f-h5-grey">{{goods.describe}}</div>
      </div>

      <!-- 商品简介 -->
      <div
        class="rich"
        v-html="goods.richText"
      ></div>

      <!-- 商品信息 -->
      <div class="flex row-center mt20 f12 f-h5-grey">
        <div class="lb-1">mall-cook 提供技术支持</div>
      </div>
    </div>

    <!-- 操作栏 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="shop-o"
        text="首页"
        @click="$routerPage('custom')"
      />
      <van-goods-action-icon
        icon="contact"
        text="我的"
        @click="$routerPage('my')"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge='carList.length'
        @click="$routerPage('car')"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="pushCar"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buyGoods"
      />
    </van-goods-action>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getGoodsById } from "../../api";

export default {
  created() {
    this.getDetail();
  },

  data() {
    return {
      goods: {
        imgList: [],
      },
      current: 0,
    };
  },

  computed: {
    ...mapGetters(["carList"]),
  },
  methods: {
    ...mapMutations(["setProject", "pushCarList", "resetOrder"]),

    // 获取商品详情
    async getDetail() {
      let { status, data } = await getGoodsById(this.$route.query);

      if (status == "10000") {
        this.goods = data;
        this.$hideLoading();
      }
    },

    // 切换轮播
    onChange(index) {
      this.current = index;
    },

    // 购买商品
    buyGoods() {
      let order = {
        id: this.$getRandomCode(8),
        list: [this.goods],
        total: this.goods.price,
      };
      this.resetOrder(order);
      this.$router.push({ name: "order" }).catch((err) => {});
    },

    // 加入购物车
    pushCar() {
      this.pushCarList(this.goods);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .rich {
  margin-bottom: 8px;
  padding: 10px;
  background: #fff;

  img {
    width: 100%;
  }
}

.swiper-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>