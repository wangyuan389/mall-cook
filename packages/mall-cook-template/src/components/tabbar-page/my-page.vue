<!--
 * @Description: 我的页面
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-22 14:48:06
-->
<template>
  <div v-if="project.id && !isAuth">
    <custom-top-bar
      title="我的"
      background="transparent"
      :isTop="isTop"
      :placeholder="false"
    ></custom-top-bar>

    <view class="top-bg">
      <!-- 个人信息 -->
      <view class="user flex">
        <image
          class="avatar"
          :src="userInfo.avatarUrl || avatar_defult"
        ></image>
        <view class="nickname">
          <text>{{ userInfo.nickName || "注册/登录" }}</text>
          <button class="login-btn" type="default" @click="wxLogin">
            登录
          </button>
        </view>
      </view>

      <!-- 订单模块 -->
      <!-- <view class="list-box">
        <view class="head flex col-center">
          <view class="title">我的订单</view>
          <view class="more flex">
            <text>全部订单</text>
            <u-icon name="right" customPrefix="custom-icon"></u-icon>
          </view>
        </view>
        <view class="item">
          <view
            class="flex-column col-center"
            v-for="(item, index) in menu.order"
            :key="index"
          >
            <image :src="item.img"></image>
            <view>{{ item.name }}</view>
          </view>
        </view>
      </view> -->

      <!-- 功能模块 -->
      <view class="list-box">
        <view class="head flex col-center"
          ><view class="title">我的功能</view></view
        >
        <view class="item">
          <view
            class="flex-column col-center"
            v-for="(item, index) in menu.myFn"
            :key="index"
            @click="navigateTo(item.jumpUrl)"
          >
            <image :src="item.img"></image>
            <view>
              {{ item.name }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 专属推荐 -->
    <GoodsList title="专属推荐" :list="list"></GoodsList>
  </div>
</template>

<script>
import CustomTopBar from "@/components/custom-top-bar.vue";
import GoodsList from "@/components/goods-list.vue";
import menu from "@/common/myMenu.js";
import PageBlili from "@/components/page-blili.vue";
import { mapGetters } from "vuex";
import { getGoodsList } from "@/api";

export default {
  components: { CustomTopBar, GoodsList, PageBlili },

  created() {
    console.log('.....created');
    
    this.getList();
  },

  onShow() {
    // 每次进入页面，返回顶部
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },

  data() {
    return {
      menu,
      isTop: true,
      userInfo: {},
      list: [],
      avatar_defult:
        "http://bd.zhichi921.com/attachment/weitao/icon/user/head_pic_defult.png",
    };
  },

  computed: {
    ...mapGetters(["project", "statusHeight", "isAuth"]),
  },

  onPageScroll(e) {
    this.isTop = e.scrollTop > 10 ? false : true;
  },

  methods: {
    // 获取商品列表
    async getList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });
      if (status == "10000") this.list = list;
    },

    wxLogin() {
      uni.navigateTo({
        url: "/pages/index/user/login",
      });
    },
  },
};
</script>

<style lang='scss'>
page {
  background-color: #f6f6f6;
}

.top-bg {
  display: inline-block;

  width: 100%;
  height: 235px;
  background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/b5231660-abb4-11ea-b244-a9f5e5565f30.png")
    no-repeat center / 100% 100%;
}

.user {
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 20px;

  .avatar {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    margin-left: 15px;
  }

  .nickname {
    position: relative;
    font-size: 17px;
    margin-left: 10px;
    font-weight: bold;
    color: #333;

    .login-btn {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
}

.list-box {
  width: 100%;
  margin: 20px auto 13px;
  padding-bottom: 30px;
  border-radius: 9px;
  background-color: #ffffff;
  overflow: hidden;
  // box-sizing: border-box;
  .head {
    height: 48px;
    padding: 0 16px;
    border-bottom: 0.5px solid #f5f5f5;
    .title {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
    .more {
      margin-left: auto;
      color: #999;
      font-size: 12px;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    text-align: center;
    font-size: 14px;
    color: #555;
    box-sizing: border-box;

    & > view {
      width: 25%;
      margin-top: 16px;
    }

    image {
      width: 40px;
      height: 40px;
    }

    .tools-img {
      width: 28px;
      height: 28px;
    }
  }
}
</style>