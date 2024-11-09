<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-26 14:27:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 11:25:46
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
  height: 60px;
  padding-bottom: 15px;
  background-color: #f7f7f7;
  font-size: 13px;
  & > image {
    width: 9px;
    height: 15px;
    margin-left: 26px;
  }
  .search-box {
    display: flex;
    align-items: center;
    width: 330px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 15px;
    margin: 0 6px 0 12px;
    padding-left: 9px;
    image:nth-child(1) {
      margin: 0 9px 0 4px;
      width: 14px;
      height: 14px;
    }
    image:nth-child(3) {
      margin: 0 7px 0 auto;
      width: 16px;
      height: 16px;
    }
    input {
      height: 30px;
      line-height: 30px;
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
  margin-top: -5px;
  border-radius: 12px 12px 0 0;
  background-color: #ffffff;
  overflow: hidden;
}

.hot,
.history {
  margin: 17px 0;
  padding: 0 18px;
}
.history {
  margin-bottom: 34px !important;
}
.title {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #262626;
  font-family: Pingfang-Bold;
  margin-bottom: 17px;
  font-weight: bold;
  image {
    width: 13px;
    height: 14px;
    margin: 0 3px 0 auto;
  }
}
.item_box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 13px;
  .item {
    display: flex;
    align-items: center;
    height: 24px;
    margin: 0 12px 12px 0;
    padding: 0 12px;
    line-height: 24px;
    border-radius: 12px;
    color: #333333;
    background-color: #f4f4f4;
    image {
      margin-right: 4px;
      width: 10px;
      height: 13px;
    }
  }
}
.keyword-list-box {
  position: fixed;
  top: 60px;
  width: 375px;
  background-color: #fff;
  z-index: 1;
}
.keyword-entry-tap {
  background-color: #eee;
}
.keyword-entry {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 13px;
  color: #333;
  padding: 0 15px;
  border-bottom: solid 0.5px #f7f7f7;
  image {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }
  text {
    margin-left: auto;
    color: #777;
    font-size: 11px;
  }
}
</style>