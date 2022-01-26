<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-26 14:27:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-26 21:09:43
-->
<template>
  <view>
    <view class="top">
      <view class="search-box">
        <image src="../../../static/icon/search.png"></image>
        <input
          type="text"
          confirm-type="search"
          v-model="keyword"
          placeholder="请输入关键词"
        />
      </view>
      <view class="search-btn">搜索</view>
    </view>

    <view class="bottom">
      <!-- 搜索关键词列表 -->
      <!-- <view class="keyword-list-box" v-show="keywordList">
        <view
          class="keyword-entry"
          hover-class="keyword-entry-tap"
          v-for="row in keywordList"
          :key="row.keyword"
          @click="onSearch(row.keyword)"
        >
          <image src="../../../static/icon/search.png"></image>
          <rich-text :nodes="row.htmlStr"></rich-text>
          <text class="count">约{{ row.goodsCount }}件商品</text>
        </view>
      </view> -->

      <!-- 历史记录+热搜词汇 -->
      <view>
        <view class="history" v-if="oldKeywordList.length != 0">
          <view class="title">
            <text>历史记录</text>
            <image
              src="../../../static/icon/del.png"
              @click="clearOldKeywordList()"
            ></image>
          </view>
          <view class="item_box">
            <view
              class="item"
              v-for="(keyword, index) in oldKeywordList"
              @tap="onSearch(keyword)"
              :key="index"
              >{{ keyword }}</view
            >
          </view>
        </view>
        <view class="hot">
          <view class="title"><text>搜索发现</text></view>
          <view class="item_box">
            <view
              class="item"
              v-for="(item, index) in hotWords"
              :key="index"
              @click="onSearch(item.value)"
            >
              <image src="../../../static/icon/hot.png"></image>
              <text>{{ item.value }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "search",
  data() {
    return {
      keyword: "",
    };
  },

  computed: {
    ...mapGetters(["oldKeywordList", "project"]),

    hotWords() {
      return this.project.config.hotList;
    },
  },

  methods: {
    ...mapMutations(["pushOldKeywordList", "clearOldKeywordList"]),
    onSearch(keyword) {
      this.pushOldKeywordList(keyword);
      this.$jump({ name: "list" });
    },
  },
};
</script>

<style lang="scss" scoped>

.top {
  display: flex;
  align-items: center;
  height: 120rpx;
  padding-bottom: 30rpx;
  background-color: #f7f7f7;
  font-size: 26rpx;
  & > image {
    width: 18rpx;
    height: 31rpx;
    margin-left: 53rpx;
  }
  .search-box {
    display: flex;
    align-items: center;
    width: 600rpx;
    height: 60rpx;
    background-color: #ffffff;
    // box-shadow: 2rpx 2rpx 2rpx red;
    border-radius: 30rpx;
    margin: 0 12rpx 0 25rpx;
    padding-left: 18rpx;
    image:nth-child(1) {
      margin: 0 18rpx 0 7rpx;
      width: 28rpx;
      height: 28rpx;
    }
    image:nth-child(3) {
      margin: 0 14rpx 0 auto;
      width: 31rpx;
      height: 31rpx;
    }
    input {
      height: 60rpx;
      line-height: 60rpx;
      color: #969696;
    }
  }
  .search-btn {
    width: 48px;
    height: 26px;
    color: #ffffff;
    border-radius: 13px;
    line-height: 26px;
    text-align: center;
    background: linear-gradient(90deg, #ef4c2d, #d40908);
  }
}

.bottom {
  margin-top: -10rpx;
  border-radius: 24rpx 24rpx 0 0;
  background-color: #ffffff;
  overflow: hidden;
  // padding: 34rpx 36rpx 0;
}

.hot,
.history {
  margin: 34rpx 0;
  padding: 0 36rpx;
}
.history {
  margin-bottom: 68rpx !important;
}
.title {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #262626;
  font-family: Pingfang-Bold;
  margin-bottom: 34rpx;
  font-weight: bold;
  image {
    width: 25rpx;
    height: 28rpx;
    margin: 0 6rpx 0 auto;
  }
}
.item_box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 26rpx;
  .item {
    display: flex;
    align-items: center;
    height: 48rpx;
    margin: 0 24rpx 24rpx 0;
    padding: 0 24rpx;
    line-height: 48rpx;
    border-radius: 24rpx;
    color: #333333;
    background-color: #f4f4f4;
    image {
      margin-right: 8rpx;
      width: 21rpx;
      height: 26rpx;
    }
  }
}
.keyword-list-box {
  position: fixed;
  top: 120rpx;
  width: 750rpx;
  background-color: #fff;
  z-index: 1;
}
.keyword-entry-tap {
  background-color: #eee;
}
.keyword-entry {
  display: flex;
  align-items: center;
  height: 80rpx;
  font-size: 26rpx;
  color: #333;
  padding: 0 30rpx;
  border-bottom: solid 1rpx #f7f7f7;
  image {
    width: 29rpx;
    height: 30rpx;
    margin-right: 30rpx;
  }
  text {
    margin-left: auto;
    color: #777;
    font-size: 22rpx;
  }
}
</style>