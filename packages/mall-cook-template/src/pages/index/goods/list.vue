<!--
 * @Description: 商品列表
 * @Autor: WangYuan
 * @Date: 2022-01-26 20:05:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-26 21:22:11
-->
<template>
  <view class="list">
    <view class="top flex">
      <view class="search-box flex">
        <text class="keyword" v-if="queryName != ''">
          {{ queryName }}
        </text>
      </view>
    </view>

    <!-- <GoodsList title="为你推荐" :list="goodsList"></GoodsList> -->
  </view>
</template>

<script>
import { getGoodsList } from "@/api";
import { mapGetters } from "vuex";

export default {
  name: "list",

  onLoad() {
    this.getGoodsList();
  },

  data() {
    return {
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
      if (status == "10000") this.goodsList = list;
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
      display: inline-block;
      height: 21px;
      line-height: 21px;
      padding: 0 10px;
      font-size: 14px;
      color: #fff;
      letter-spacing: 1px;
      border-radius: 15px;
      background-color: rgb(153, 153, 153);
    }
  }
}
</style>