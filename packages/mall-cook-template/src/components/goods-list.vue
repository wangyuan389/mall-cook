<!--
 * @Description: 商品列表展示
 * @Autor: WangYuan
 * @Date: 2022-01-25 11:24:08
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 09:06:12
-->
<template>
  <view>
    <view class="title flex" v-if="title">
      <image src="/static/icon/title_left.png"></image>
      <text>{{ title }}</text>
      <image src="/static/icon/title_right.png"></image>
    </view>
    <view class="goods-list">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="goToDetail(item.id)"
      >
        <u-lazy-load
          class="item-cover"
          :image="item.cover"
          loading-img="/static/goods-lazy-load.png"
        ></u-lazy-load>
        <view class="title">{{ item.name }}</view>
        <view class="price">
          <text>￥</text>
          <text class="priceMin">{{ item.price | money }}</text>
          <text class="marketPrice">￥{{ item.originalPrice | money }}</text>
        </view>
      </view>
    </view>

    <view class="load-over">没有更多了</view>

    <!-- todo: 下拉分页查询,接口暂不支持 -->
    <!-- <view v-show="showLoadmore" class="load-more"
      ><u-loadmore
        :status="loadMoreStatus"
        :bg-color="loadMoreBg"
        :font-size="24"
        :load-text="loadingText"
    /></view> -->
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
    title: {
      type: String,
      default: "",
    },
    showLoadmore: {
      type: Boolean,
      default: false,
    },
    loadMoreStatus: {
      type: String,
      default: "loadmore",
    },
    loadMoreBg: {
      type: String,
      default: "#f9f9f9",
    },
  },
  data() {
    return {
      loadingText: {
        loadmore: "上拉加载更多",
        loading: "努力加载中~",
        nomore: "没有更多了",
      },
    };
  },
  methods: {
    goToDetail(id) {
      this.$jump({
        name: "detail",
        data: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 5px;

  .item {
    position: relative;
    width: calc(50% - 10px);
    height: 253px;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 12px 5px 0 5px;
    font-size: 14px;
    overflow: hidden;

    .item-cover {
      width: 100%;
    }

    & > image:nth-child(1) {
      width: 190px;
      height: 190px;
      border-radius: 4px 4px 0 0;
    }

    .labelbox {
      position: absolute;
      top: 154px;
      left: 0;

      text {
        display: inline-block;
        border-radius: 2px;
        // background-color: #d96b6c;
        color: #ffffff;
        margin-right: 5px;
        text-align: center;
        height: 16px;
        padding: 0 5px;
        line-height: 16px;
        font-size: 12px;
      }
    }

    .title,
    .subtitle {
      width: 173px;
      padding-left: 8px;
      padding-right: 3px;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-box-pack: center;
      overflow: hidden;
    }

    .title {
      font-size: 15px;
      color: rgb(51, 51, 51);
      line-height: 21px;
      margin-top: 5px;
    }

    .subtitle {
      font-size: 13px;
      color: rgb(153, 153, 153);
      margin-top: 2px;
      line-height: 18px;
    }

    .price {
      margin: 5px 0 0 8px;
      color: rgb(227, 13, 13);
      font-size: 13px;
      height: 20px;
      font-family: "AllAndNone";

      .priceMin {
        font-size: 17px;
        margin-right: 2px;
        font-weight: bold;
      }

      .marketPrice {
        margin-left: 3px;
        font-size: 14px;
        color: rgb(153, 153, 153);
        text-decoration: line-through;
      }

      .spec {
        font-size: 12px;
      }
    }
  }
}

.load-more {
  margin: 15px 0;
}

.load-over {
  margin: 15px 0;
  text-align: center;
  font-size: 12px;
  color: #cacaca;
}

.title {
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 132px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  image {
    width: 18px;
    height: 12px;
  }
}
</style>

<style>
::v-deep .u-wrap {
  background-color: #fff !important;
}
</style>
