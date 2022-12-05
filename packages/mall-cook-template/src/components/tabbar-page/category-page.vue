<!--
 * @Description: 商品分类页面
 * @Autor: WangYuan
 * @Date: 2021-09-06 15:50:44
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-02 10:06:39
-->
<template>
  <view class="wrap">
    <!-- 左边分组列表 -->
    <view class="wrap-left">
      <ul class="group">
        <li
          v-for="(group, index) in groups"
          :key="index"
          class="group-item"
          :class="[getItemClass(index)]"
          @click="chooseGroup(index)"
        >
          <span>{{ group.name }}</span>
        </li>
      </ul>
    </view>

    <!-- 右边容器 -->
    <view class="wrap-right">
      <view class="list">
        <template v-if="activeGroup">
          <!-- 分类列表 -->
          <template v-if="activeGroup.child.length">
            <view class="pl5 pr5">
              <img v-if="isAdvertising" class="w-100 mt5" :src="item.iamge" />
              <view class="mt15 f14">{{ activeGroup.name }}</view>
            </view>
            <view
              v-for="(type, index) in activeGroup.child"
              :key="index"
              class="list-item"
              @click="toList(type)"
            >
              <image class="w70 h70 mb10" radius="5" :src="type.image" />
              <view class="f13">{{ type.name }}</view>
            </view>
          </template>

          <!-- 空列表 -->
          <u-empty
            v-else
            src="http://110.41.150.71:8090/img/1667354790945.jpg"
            text="此分类暂无商品"
            mode="list"
          ></u-empty>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GoodsCategory",

  // props: {
  //   groups: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },

  created() {
    console.log("...");
    console.log(this.groups);

    this.getData();
  },

  data() {
    return {
      active: "0",
      activeGroup: null,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    isAdvertising() {
      return this.project?.categoryTpl?.advertising;
    },

    groups() {
      return this.project.config.goodsGroups;
    },
  },

  methods: {
    // 获取商品类型数据
    getData() {
      this.activeGroup = this.groups[0];
    },

    // 选择分组
    chooseGroup(index) {
      this.active = index;
      this.activeGroup = this.groups[index];
    },

    // 菜单tab高亮样式
    getItemClass(index) {
      if (this.active == index) return "group-item-active";
    },

    // 跳转商品列表
    toList(type) {
      if (!type) return;
      uni.navigateTo({
        url: `/pages/index/goods/list?type=${type}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  // #ifdef H5
  height: calc(100vh - 94px);
  // #endif

  // #ifdef MP
  height: calc(100vh - 50px);
  // #endif
  background: #fff;

  .wrap-left {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100%; //高度根据需求自行设定
    background: #fafafa;

    .group {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0; //left,top,right,bottom都为0，充满真个页面
      overflow-y: auto;
      overflow-x: hidden; //设置Y轴出现滚动条，X轴隐藏

      // 隐藏滚动条
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }

      .group-item {
        padding: 15px 0;
        font-size: 14px;
        text-align: center;
      }

      .group-item-active {
        position: relative;
        color: #c7655a;
        background: #fff;

        &::after {
          content: "";
          position: absolute;
          top: 10px;
          left: 0;
          width: 3px;
          height: 24px;
          background: #c7655a;
        }
      }
    }
  }

  .wrap-right {
    display: inline-block;
    position: relative;
    width: calc(100% - 100px);
    height: 100%; //高度根据需求自行设定

    .list {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0; //left,top,right,bottom都为0，充满真个页面
      padding: 6px;
      overflow-y: auto;
      overflow-x: hidden; //设置Y轴出现滚动条，X轴隐藏

      // 隐藏滚动条
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }

      .list-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        width: 33.3%;
        margin-top: 15px;
        color: #828282;
      }
    }
  }
}
</style>