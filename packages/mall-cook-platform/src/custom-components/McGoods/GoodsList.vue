<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-07 11:19:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-03 11:00:35
-->
<template>
  <div class="wrap" :style="getWrapStyle()">
    <div class="list" :style="getStyle()">
      <!-- 商品列表 -->
      <template v-if="mList.length">
        <goods-item
          v-for="(item, index) in mList"
          :key="index"
          :item="item"
        ></goods-item>
      </template>

      <div
        v-else
        class="flex-column row-center w-100 pt20 pb20 bg-white f14 f-grey"
        style="height: 320px"
      >
        <!-- 加载中 -->
        <van-loading v-if="loading" />

        <!-- 空列表 -->
        <template v-else>
          <van-image
            width="180"
            src="http://110.42.184.128:8090/img/1638500391170.jpg"
          />
          <span class="mt20">暂无商品</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsByIds } from "@/api/goods";

export default {
  inject: ["tabs"],

  name: "GoodsList",

  props: {
    list: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      loading: false,
      mList: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),

    attr() {
      return this.tabs.config.attrs;
    },
  },

  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.getList();
      },
    },
  },

  methods: {
    async getList() {
      this.loading = true;
      let data = {
        projectId: this.project.id,
        ids: this.list,
      };

      let res = await getGoodsByIds(data);
      if (res.status == "10000") {
        this.mList = res.list;
        this.loading = false;
      }
    },

    getWrapStyle() {
      this.attr.listModel == "roll" ? { overflowX: "auto" } : {};
    },

    getStyle() {
      if (this.attr.listModel == "roll") {
        return {
          display: "flex",
          width: this.$pxTorem((375 / 2.5) * this.list.length),
        };
      } else {
        return {
          display: "flex",
          flexWrap: "wrap",
          padding: this.$pxTorem(5),
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.empty {
  height: 200px;
  margin: auto;
}

.wrap{
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
}

::v-deep .slot-body {
  display: flex;
  justify-content: center;
  background: #fff;
}
</style>