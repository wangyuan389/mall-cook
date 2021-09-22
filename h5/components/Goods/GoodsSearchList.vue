<!--
 * @Description: 商品列表组件
 * @Autor: WangYuan
 * @Date: 2021-09-08 11:55:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:22:19
-->
<template>
  <div class="container">

    <template v-if="list.length">
      <ul
        class="list"
        :style="getListStyle(model)"
      >
        <li
          v-for="item in list"
          :key="item.id"
          class="list-item"
          :style="getItemStyle(model)"
          @click="toGoods(item.id)"
        >
          <van-image
            :src="item.cover"
            :style="getImageStyle(model)"
          />
          <div class="flex-column flex-1 row-between pt5 pb5">
            <div>
              <div class="mb10 f14 f-bold">{{item.name}}</div>
              <div class="mb20 f12 f-grey">{{item.describe}}</div>
            </div>
            <div class="flex row-between">
              <price-span
                class="flex-1"
                :price="item.price"
                :original='item.originalPrice'
              ></price-span>
              <!-- 购买 -->
              <i
                class="iconfont f19 f-h5-theme"
                :class='addIcon'
                @click.stop="pushCar(item)"
              ></i>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="mt20 mb20 f12 text-center"
        style="color:#9e9e9f"
      >{{`到底了>_<`}}
      </div>
    </template>

    <goods-recommend v-else></goods-recommend>
  </div>
</template>

<script>
import GoodsRecommend from "./GoodsRecommend.vue";
import PriceSpan from "../../components/PriceSpan.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "GoodsSearchList",

  components: {
    GoodsRecommend,
    PriceSpan,
  },

  created() {
    let { search, type } = this.$route.query;
    this.getList(search);
  },

  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),

    model() {
      return this.project?.config?.listTpl?.model || "two";
    },

    addIcon() {
      return this.project?.config?.listTpl?.addIcon
        ? `icon-${this.project?.config?.listTpl?.addIcon}`
        : "icon-cart";
    },
  },

  methods: {
    ...mapMutations(["pushCarList"]),

    // 获取商品列表
    getList(search) {
      this.$http({
        url: "/goods/getByList",
        method: "POST",
        data: { projectId: this.project.id, name: search },
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

    // 加入购物车
    pushCar(goods) {
      this.pushCarList(goods);
    },

    // 列表样式 （一列/两列）
    getListStyle(model) {
      if (model == "one") {
        return {
          flexWrap: "wrap",
          padding: `0 ${this.$pxTorem(14)}`,
        };
      } else {
        return {
          flexWrap: "wrap",
          padding: `0 ${this.$pxTorem(7)}`,
        };
      }
    },

    // 单项样式 （一列/两列）
    getItemStyle(model) {
      if (model == "one") {
        return {
          width: "100%",
          margin: `${this.$pxTorem(7)} 0`,
        };
      } else {
        return {
          width: "50%",
          flexDirection: "column",
          padding: `${this.$pxTorem(14)} ${this.$pxTorem(7)} ${this.$pxTorem(
            7
          )} ${this.$pxTorem(7)}`,
        };
      }
    },

    // 图片样式 （一列/两列）
    getImageStyle(model) {
      if (model == "one") {
        return {
          width: this.$pxTorem(100),
          height: this.$pxTorem(100),
          marginRight: this.$pxTorem(10),
        };
      } else {
        return {
          width: this.$pxTorem(166),
          height: this.$pxTorem(166),
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  width: 100%;

  .list {
    display: flex;

    .list-item {
      display: flex;
    }
  }
}
</style>