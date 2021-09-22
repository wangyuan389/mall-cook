<!--
 * @Description: 推荐商品列表组件
 * @Autor: WangYuan
 * @Date: 2021-09-15 20:49:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-16 20:46:24
-->
<template>
  <div>
    <div class="empty-line">为您推荐</div>

    <div class="list">
      <div
        v-for="item in list"
        :key="item.id"
        class="item"
        @click="toGoods(item.id)"
      >
        <van-image
          width="166"
          height="166"
          :src="item.cover"
        />
        <div class="mt10 mb10 f14 f-bold">{{item.name}}</div>
        <price-span
          :price='item.price'
          :original='item.originalPrice'
        ></price-span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PriceSpan from "../PriceSpan.vue";

export default {
  name: "GoodsRecommend",

  components: {
    PriceSpan,
  },

  created() {
    this.getList();
  },

  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    // 获取商品列表
    getList() {
      this.$http({
        url: "/goods/getByList",
        method: "POST",
        data: { projectId: this.project.id },
      }).then((res) => {
        if (res.status == "10000") {
          this.list = res.list;
        }
      });
    },

    // 跳转商品详情
    toGoods(id) {
      this.$router.push({ name: "goods-detail", query: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-line {
  position: relative;
  margin-top: 25px;
  font-size: 14px;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    top: 7px;
    left: 15px;
    width: 125px;
    height: 1px;
    background: #d3d3d3;
    transform: scaleY(0.5);
  }

  &::before {
    content: "";
    position: absolute;
    top: 7px;
    right: 15px;
    width: 125px;
    height: 1px;
    background: #d3d3d3;
    transform: scaleY(0.5);
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 7px;

  .item {
    width: 50%;
    padding: 14px 7px 7px 7px;
  }
}
</style>