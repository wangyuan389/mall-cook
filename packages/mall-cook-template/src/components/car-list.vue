@@ -1,219 +0,0 @@
<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 11:09:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 09:07:02
-->
<template>
  <div class="list">
    <!-- 商品列表 -->
    <div class="flex-1">
      <u-checkbox-group>
        <ul>
          <li
            class="flex pt15 pb15 pl10 pr10 bg-white f14"
            style="border-bottom: solid 1px #e4e4e450"
            v-for="goods in carList"
            :key="goods.id"
          >
            <div class="flex col-center mr10">
              <image
                :src="goods.selected ? checked_img : unchecked_img"
                class="w17 h17"
                @click="selectGoods(goods)"
              ></image>
            </div>

            <!-- 商品图片 -->
            <img class="w100" mode="widthFix" :src="goods.cover" />

            <!-- 商品信息 -->
            <div class="flex-column flex-1 row-between pl10 pr10">
              <span class="lh-18 f14">{{ goods.name }}</span>
              <div class="flex row-between col-center" style="font-weight: 600">
                <p class="f-h5-theme">
                  <span class="f12">￥</span
                  ><span class="f20">{{ goods.price | money }}</span>
                </p>

                <!-- 数量操作栏 -->
                <div class="flex col-center f14">
                  <u-icon
                    name="minus"
                    color="#cecece"
                    @click="subGoods(goods)"
                  ></u-icon>
                  <div
                    class="pt5 pb5 pl15 pr15 ml10 mr10 r5"
                    style="background: #f7f7f7"
                  >
                    {{ goods.num }}
                  </div>
                  <u-icon name="plus" @click="plusGoods(goods)"></u-icon>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </u-checkbox-group>

      <!-- <div class="mt20 f12 text-center" style="color: #9e9e9f">
        {{ `到底了>_<` }}
      </div> -->
    </div>

    <!-- 结算 -->
    <view class="settlement">
      <view @click="selectAll">
        <image
          :src="allSelected ? checked_img : unchecked_img"
          class="w17 h17"
        ></image>
        <view>全选</view>
      </view>
      <view class="confirm">
        <view>
          合计：
          <text>￥{{ totalPrice | money }}</text>
        </view>
        <view @click="confirm()">
          结算
          <text v-if="totalQuantity">({{ totalQuantity }})</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "list",

  data() {
    return {
      checked_img: "/static/checked.png",
      unchecked_img: "/static/unchecked.png",
    };
  },

  computed: {
    ...mapGetters(["carList"]),

    // 是否全选
    allSelected() {
      return this.carList.filter((g) => g.selected).length ==
        this.carList.length
        ? true
        : false;
    },

    // 结算商品总数
    totalQuantity() {
      let quantity = 0;
      this.carList.forEach((x) => {
        if (x.selected) {
          quantity += x.num;
        }
      });
      return quantity;
    },

    // 结算商品总价
    totalPrice() {
      let list = this.carList.filter((item) => item.selected);
      return list.reduce((pre, cur) => {
        pre += cur.price * cur.num;
        return pre;
      }, 0);
    },
  },

  methods: {
    // 减商品
    subGoods(goods) {
      if (goods.num == 1) {
        this.$toast("商品数量最小为1");
      } else {
        goods.num--;
      }
    },

    // 加商品
    plusGoods(goods) {
      goods.num++;
    },

    // 全选
    selectAll() {
      console.log("全选");
      console.log(this.allSelected);

      if (this.allSelected) {
        this.carList.map((item) => (item.selected = false));
      } else {
        this.carList.map((item) => (item.selected = true));
      }
    },

    // 勾选商品
    selectGoods(goods) {
      goods.selected = !goods.selected;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
}

.settlement {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 50px;
  left: 0;
  height: 50px;
  width: 750rpx;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  background-color: #fff;
  z-index: 1;
  font-size: 13px;
  color: #333;

  & > view {
    display: flex;
    align-items: center;
  }

  image {
    margin: 0 6px 0 6px;
  }

  .confirm {
    font-weight: bold;

    view:nth-child(1) text {
      color: #b90000;
    }

    view:nth-child(2) {
      width: 89px;
      height: 35px;
      margin: 0 8px;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      font-family: Pingfang-Regular;
      color: #fff;
      border-radius: 17px;
      background: linear-gradient(90deg, #f04c2d, #d61111);
    }
  }
}
</style>