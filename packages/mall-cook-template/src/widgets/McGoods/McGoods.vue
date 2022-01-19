<!--
 * @Description: 商品组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-18 16:45:15
-->
<template>
  <div :style="[$wrapStyle(styles)]">
    <goods-tabs :config="config">
      <template v-slot="{ list }">
        <goods-list :list="list"></goods-list>
      </template>
    </goods-tabs>
  </div>
</template>

<script>
import GoodsTabs from "./GoodsTabs.vue";
import GoodsList from "./GoodsList.vue";
export default {
  name: "McGoods",

  components: { GoodsTabs, GoodsList },

  props: {
    styles: {
      type: Object,
      default: () => {},
    },
    attrs: {
      type: Object,
      default: () => {},
    },
    goodsData: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    config() {
      console.log("config变化");
      console.log({
        styles: this.styles,
        attrs: this.attrs,
        goodsData: this.goodsData,
      });

      return {
        styles: this.styles,
        attrs: this.attrs,
        goodsData: this.goodsData,
      };
    },
  },
};
</script>