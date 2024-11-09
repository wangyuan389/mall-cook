<!--
 * @Description: 商品列表
 * @Autor: WangYuan
 * @Date: 2022-01-26 20:05:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-28 17:08:53
-->
<template>
  <global-page :loading="loading">
    <view class="top flex">
      <view class="search-box flex">
        <view class="keyword" v-if="queryName != ''">
          {{ queryName }}
          <image
            src="../../../static/icon/close_white.png"
            @click="goBack"
          ></image>
        </view>
      </view>
    </view>

    <goods-list :list="goodsList"></goods-list>
  </global-page>
</template>

<script>
import GoodsList from "@/components/goods-list.vue";
import { getGoodsList } from "@/api";
import { mapGetters } from "vuex";

export default {
  name: "list",

  components: {
    GoodsList,
  },

  onLoad() {
    this.getGoodsList();
  },

  data() {
    return {
      loading: true,
      queryName: "酒店",
      goodsList: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    // 获取推荐商品列表
    async getGoodsList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });
      if (status == "10000") {
        this.goodsList = list;
        this.loading = false;
      }
    },

    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style>
page {
  background-color: #f7f7f7;
}
</style>

<style lang="scss" scoped>
.top {
  padding: 0 10px;
  width: 100%;
  height: 30px;

  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 9px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 15px;

    .keyword {
      display: flex;
      align-items: center;
      height: 21px;
      line-height: 21px;
      padding: 0 10px;
      font-size: 14px;
      color: #fff;
      letter-spacing: 1px;
      border-radius: 15px;
      background-color: rgb(153, 153, 153);

      image {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>