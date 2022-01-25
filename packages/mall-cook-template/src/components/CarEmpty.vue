<!--
 * @Description: 空购物车组件
 * @Autor: WangYuan
 * @Date: 2021-08-31 14:40:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-24 11:37:56
-->
<template>
  <div class="empty">
    <img class="empty-img" src="../assets/h5-icon-car.png" />

    <div class="empty-btn" @click="routerHome">去逛逛</div>

    <!-- 推荐列表 -->
    <!-- <goods-recommend></goods-recommend> -->
  </div>
</template>

<script>
// import GoodsRecommend from "../Goods/GoodsRecommend.vue";

export default {
  // components: {
  //   GoodsRecommend,
  // },
  methods: {
    routerHome() {
      this.$jump({
        name: "home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/variable.scss";

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
</style>