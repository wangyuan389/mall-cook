<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-22 14:50:30
-->
<template>
  <global-tab-page>
    <!-- 购物车 -->
    <template v-if="project.id && !isAuth">
      <custom-top-bar title="购物车" :isTop="isTop"></custom-top-bar>

      <!-- 未登录 -->
      <view class="no-goods" v-if="!isLogin">
        <image
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/af4ee070-abaf-11ea-9e8b-05a3242b26f2.png"
        ></image>
        <view>登录之后才可以使用购物车哦~</view>
        <view class="btn" @click="$jump({ name: 'login' })">去登录</view>
      </view>

      <!-- 已登录 -->
      <template v-else>
        <!-- 购物车无商品 -->
        <div v-if="isEmpty" class="empty">
          <img class="empty-img" src="../../static/h5-icon-car.png" />

          <div class="empty-btn" @click="routerHome">去逛逛</div>
        </div>

        <!-- 购物车有商品 -->
        <car-list v-else></car-list>
      </template>

      <!-- 推荐列表 -->
      <GoodsList title="为你推荐" :list="recommendList"></GoodsList>
    </template>

    <!-- 虚拟Mall-Cook信息页面，用于小程序审核 -->
    <page-juejin v-else />
  </global-tab-page>
</template>

<script>
import GoodsList from "@/components/goods-list.vue";
import CarList from "@/components/car-list.vue";
import CustomTopBar from "@/components/custom-top-bar.vue";
import PageJuejin from "@/components/page-juejin.vue";
import { mapGetters } from "vuex";
import { getGoodsList } from "@/api";

export default {
  components: {
    CarList,
    GoodsList,
    CustomTopBar,
    PageJuejin,
  },

  onLoad() {
    this.getRecommendList();
  },

  onShow() {
    // 每次进入页面，返回顶部
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },

  data() {
    return {
      isTop: true,
      top: {},
      recommendList: [],
    };
  },

  computed: {
    ...mapGetters(["isLogin", "carList", "project", "statusHeight", "isAuth"]),

    isEmpty() {
      return this.carList.length == 0;
    },
  },

  onPageScroll(e) {
    this.isTop = e.scrollTop > 10 ? false : true;
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

<style>
page {
  background-color: #f7f7f7;
}
</style>

<style lang='scss' scoped>
@import "@/scss/variable.scss";

.nav-bar {
  position: fixed;
  width: 750rpx;
  z-index: 1;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .empty-img {
    width: 110px;
    height: 110px;
  }

  .empty-btn {
    margin-top: 20px;
    padding: 7px 20px;
    font-size: 14px;
    color: #fff;
    background: $h5-color-theme;
  }
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