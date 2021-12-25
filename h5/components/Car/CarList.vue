<!--
 * @Description: 购物车列表
 * @Autor: WangYuan
 * @Date: 2021-08-31 14:41:37
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:58:39
-->
<template>
  <div class="flex-column h-100">

    <!-- 头部 -->
    <div class="flex row-between col-center mb10 p16 f16 bg-white">
      <div>
        <i class="iconfont icon-shop mr4 f15"></i>
        <span>马克华菲官方商城</span>
      </div>
      <div class="f13">
        <span
          v-if="!edit"
          @click="edit=!edit"
        >编辑</span>
        <span
          v-else
          @click="edit=!edit"
        >完成</span>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="flex-1">
      <ul>
        <li
          class="flex pt15 pb15 pl10 pr10 bg-white f14"
          style="border-bottom: solid 1px #e4e4e450"
          v-for="goods in carList"
          :key="goods.id"
        >
          <div class="flex col-center mr10">
            <van-checkbox
              v-model="goods.selected"
              icon-size="18px"
            ></van-checkbox>
          </div>

          <!-- 商品图片 -->
          <van-image
            width="100"
            :src='goods.cover'
          />

          <!-- 商品信息 -->
          <div class="flex-column flex-1 row-between pl10 pr10">
            <span class="lh-18 f14">{{goods.name}}</span>
            <div
              class="flex row-between col-center"
              style="font-weight:600"
            >
              <p class="f-h5-theme"><span class="f12">￥</span><span class="f20">{{goods.price | money}}</span></p>

              <!-- 数量操作栏 -->
              <div class="flex col-center f14">
                <van-icon
                  name="minus"
                  color='#cecece'
                  @click="subGoods(goods)"
                />
                <div
                  class="pt5 pb5 pl15 pr15 ml10 mr10 r5"
                  style="background:#f7f7f7"
                >{{goods.num}}</div>
                <van-icon
                  name="plus"
                  @click="goods.num++"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div
        class="mt20 f12 text-center"
        style="color:#9e9e9f"
      >
      {{`到底了>_<`}}
      </div>
    </div>

    <!-- 提交模式 -->
    <van-submit-bar
      v-if="!edit"
      :price="total"
      button-text="提交订单"
      @submit="toOrder" 
    >
      <template slot="default">
        <div class="flex-center">
          <van-checkbox
            v-model="selectedAll"
            icon-size="18px"
            @click="changeAll"
          >全选</van-checkbox>
        </div>
      </template>
    </van-submit-bar>

    <!-- 删除模式 -->
    <div
      v-else
      class="flex row-between col-center h50 pl16 pr16 bg-white f14"
    >
      <div class="flex-center">
        <van-checkbox
          v-model="selectedAll"
          icon-size="18px"
          @click="changeAll"
        >全选</van-checkbox>
      </div>
      <div class="btn bg-h5-theme">删除</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CarList",

  data() {
    return {
      edit: false,
      selectedAll: false,
    };
  },
  
  computed: {
    ...mapGetters(["carList"]),

    // 总价
    total() {
      let list = this.carList.filter((item) => item.selected);
      return list.reduce((pre, cur) => {
        pre += cur.price * cur.num;
        return pre;
      }, 0);
    },
  },

  watch: {
    // 监听商品列表勾选，修改全选状态
    carList: {
      deep: true,
      immediate: true,
      handler() {
        let unSelectList = this.carList.filter((item) => !item.selected);
        if (unSelectList.length == 0) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      },
    },
  },

  methods: {
    ...mapMutations(["resetOrder"]),

    // 减商品
    subGoods(goods) {
      if (goods.num == 1) {
        this.$toast("商品数量最小为1");
      } else {
        goods.num--;
      }
    },

    // 勾选全选
    changeAll() {
      if (this.selectedAll) {
        this.carList.map((item) => (item.selected = true));
      } else {
        this.carList.map((item) => (item.selected = false));
      }
    },

    // 提交订单
    toOrder() {
      let list = this.carList.filter((item) => (item.selected = true));
      let order = {
        id: this.$getRandomCode(8),
        source: "car",
        list,
        total: this.total,
      };
      this.resetOrder(order);
      this.$router.push({ name: "order" });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-submit-bar {
  position: relative;
}

.btn {
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
}
</style>