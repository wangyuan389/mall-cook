<!--
 * @Description:商品分类组件
 * @Autor: WangYuan
 * @Date: 2021-09-06 15:50:44
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-03 11:00:01
-->
<template>
  <div class="wrap">

    <!-- 左边分组列表 -->
    <div class="wrap-left">
      <ul class="group">
        <li
          v-for="(group,index) in groups"
          :key="index"
          class="group-item"
          :class="getItemClass(index)"
          @click="chooseGroup(index)"
        >
          <span>{{group.name}}</span>
        </li>
      </ul>
    </div>

    <!-- 右边容器 -->
    <div class="wrap-right">
      <div class="list">
        <template v-if="activeGroup">
          <!-- 分类列表 -->
          <template v-if="activeGroup.child.length">
            <div class="pl5 pr5">
              <img
                v-if="isAdvertising"
                class="w-100 mt5"
                :src="item.iamge"
              >
              <div class="mt15 f14">{{activeGroup.name}}</div>
            </div>
            <div
              v-for="(type,index) in activeGroup.child"
              :key="index"
              class="list-item"
              @click="toList(type)"
            >
              <van-image
                class="auto-center mb10"
                width="70"
                height="70"
                radius='5'
                :src="type.image"
              />
              <div class="f13 text-center">{{type.name}}</div>
            </div>
          </template>

          <!-- 空列表 -->
          <van-empty
            v-else
            class="mt100"
            image="http://110.42.184.128:8090/img/1638500391170.jpg"
            description="此分类暂无商品"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GoodsCategory",

  props: {
    groups: {
      type: Array,
      default: () => [],
    },
  },

  created() {
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
      this.$router.push({ name: "goods-list", query: { type } });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
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
        color: $h5-color-theme;
        background: #fff;

        &::after {
          content: "";
          position: absolute;
          top: 10px;
          left: 0;
          width: 3px;
          height: 24px;
          background: $h5-color-theme;
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
        display: inline-block;
        width: 33.3%;
        margin-top: 15px;
        color: #828282;
      }
    }
  }
}
</style>