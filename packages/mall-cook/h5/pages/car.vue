<!--
 * @Description: 购物车
 * @Autor: WangYuan
 * @Date: 2021-08-31 10:53:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 15:51:23
-->
<template>
  <div class="h-100">

    <!-- 空购物车 -->
    <car-empty v-if="isEmpty"></car-empty>

    <!-- 购物车商品列表 -->
    <car-list v-else></car-list>
  </div>
</template>

<script>
import CarList from "../components/Car/CarList.vue";
import CarEmpty from "../components/Car/CarEmpty.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CarList,
    CarEmpty,
  },

  computed: {
    ...mapGetters(["carList"]),

    isEmpty() {
      return this.carList.length == 0;
    },
  },
};
</script>