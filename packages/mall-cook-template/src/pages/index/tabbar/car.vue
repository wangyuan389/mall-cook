<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-25 16:41:39
-->
<template>
  <main-page>
    <custom-top-bar title="购物车" :isTop="isTop"></custom-top-bar>

    <!-- 顶部组件 -->
    <view class="nav-bar" v-show="showNavBar">
      <u-navbar
        :is-back="false"
        :background="{ background: '#fff' }"
        border-bottom
        id="nav-bar"
        title="购物车"
      ></u-navbar>
    </view>

    <!-- 未登录 -->
    <view class="no-goods" v-if="!isLogin">
      <image
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/af4ee070-abaf-11ea-9e8b-05a3242b26f2.png"
      ></image>
      <view>登录之后才可以使用购物车哦~</view>
      <view class="btn">去登录</view>
    </view>

    <!-- 已登录 -->
    <template v-else>
      <!-- 购物车无商品 -->
      <car-empty v-if="isEmpty"></car-empty>

      <!-- 购物车有商品 -->
      <car-list v-else></car-list>
    </template>

    <!-- 推荐列表 -->
    <GoodsList :list="recommendList"></GoodsList>
  </main-page>
</template>

<script>
import MainPage from "@/components/MainPage";
import CarList from "@/components/CarList.vue";
import CarEmpty from "@/components/CarEmpty.vue";
import GoodsList from "@/components/GoodsList.vue";
import CustomTopBar from "@/components/CustomTopBar.vue";
import { mapGetters } from "vuex";
import { getGoodsList } from "@/api";

export default {
  components: {
    GoodsList,
    MainPage,
    CarList,
    CarEmpty,
    CustomTopBar,
  },

  onLoad() {
    this.getRecommendList();
  },

  data() {
    return {
      isTop: true,
      top: {},
      recommendList: [],
    };
  },

  computed: {
    ...mapGetters(["isLogin", "carList", "project"]),

    isEmpty() {
      return this.carList.length == 0;
    },
  },

  onPageScroll(e) {
    this.isTop = e.scrollTop > 30 ? false : true;
  },

  methods: {
    // 获取推荐商品列表
    async getRecommendList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });
      if (status == "10000") this.recommendList = list;
    },
  },
};
</script>

<style lang='scss'>
page {
  background-color: #f7f7f7;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.nav-bar {
  position: fixed;
  width: 750rpx;
  z-index: 1;
}

.no-goods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 13px;
  text-align: center;

  image {
    width: 81px;
    height: 81px;
    margin-top: 27px;
  }

  view {
    color: #777;
    margin: 12px auto;
  }

  .btn {
    width: 95px;
    height: 30px;
    border: 0.5px solid #d3c2a8;
    border-radius: 15px;
    color: #b8996a;
    margin: 0 auto 27px;
    line-height: 26px;
  }
}
</style>