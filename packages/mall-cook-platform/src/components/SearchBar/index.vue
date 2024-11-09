<!--
 * @Description: 商品搜索组件
 * @Autor: WangYuan
 * @Date: 2021-06-11 13:50:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-17 14:23:25
-->
<template>
  <div>
    <!-- 搜索框 -->
    <!-- <van-search
      v-model="searchVal"
      show-action
      shape="round"
      placeholder="搜索商品"
    >
      <template #action>
        <div class="pl5 pr5 f-h5-theme" @click="onSearch">搜索</div>
      </template>
    </van-search> -->

    <div class="sercarh">
      <div class="sercarh-body">
        <i class="el-icon-search mr5"></i>
        请输入关键词
      </div>
      <div class="sercarh-btn">搜索</div>
    </div>

    <!-- 热门搜索 -->
    <div class="pl15 pr15 mt10 f14">
      <div>热门搜索</div>
      <ul class="flex flex-wrap">
        <li
          class="hot flex-center"
          v-for="(item, index) in project.config.hotList"
          :key="index"
          @click="onHot(item)"
        >
          <img src="https://b.yzcdn.cn/search-page/hot-fire.png" alt="" />
          <span>
            {{ item.value }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SearchBar",

  data() {
    return {
      searchVal: "",
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    onHot(item) {
      this.$router.push({ name: "goods-list", query: { search: item.value } });
    },

    onSearch() {
      this.$router.push({
        name: "goods-list",
        query: { search: this.searchVal },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hot {
  margin: 8px 8px 0px 0;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: #f44;
  border-color: rgba(254, 68, 68, 0.1);
  border: 1px solid #ebedf0;

  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}

.sercarh {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .sercarh-body {
    display: flex;
    align-items: center;
    width: 330px;
    height: 30px;
    margin: 0 6px 0 12px;
    padding-left: 9px;
    background: #f7f8fa;
    border-radius: 15px;
    color: #d6d6d9;
    font-size: 13px;
  }

  .sercarh-btn {
    width: 48px;
    height: 26px;
    color: #fff;
    border-radius: 13px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    background: linear-gradient(90deg, #ef4c2d, #d40908);
    cursor: pointer;
  }
}
</style>