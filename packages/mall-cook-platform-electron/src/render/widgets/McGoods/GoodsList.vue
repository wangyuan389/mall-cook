<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-07 11:19:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-02 10:07:43
-->
<template>
  <div class="wrap" :style="[getWrapStyle()]">
    <div class="list" :style="[getStyle()]">
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
        <template v-if="loading"></template>

        <!-- 空列表 -->
        <template v-else>
          <image
            width="180"
            src="http://110.41.150.71:8090/img/1667354790945.jpg"
          />
          <span class="mt20">暂无商品</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem.vue";
import { getGoodsListByIds } from "@/api";
import { mapGetters } from "vuex";

export default {
  name: "GoodsList",

  components: { GoodsItem },

  inject: ["tabs"],

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

      let { list } = await getGoodsListByIds({
        projectId: this.project.id,
        ids: this.list,
      });

      this.mList = list;
      this.loading = false;
    },

    getWrapStyle() {
      this.attr.listModel == "roll" ? { overflowX: "auto" } : {};
    },

    getStyle() {
      if (this.attr.listModel == "roll") {
        return {
          display: "flex",
          width: this.$unit((375 / 2.5) * this.list.length),
        };
      } else {
        return {
          display: "flex",
          flexWrap: "wrap",
          padding: `${this.$unit(5)} 0`,
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

.wrap {
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