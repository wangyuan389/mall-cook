<!--
 * @Description: 商品组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 14:31:08
-->
<template>
  <goods-tabs :config='config'>
    <template v-slot="{list}">
      <goods-list :list='list'></goods-list>
    </template>
  </goods-tabs>
</template>

<script>
export default {
  name: "McGoods",

  props: {
    styles: {
      type: Object,
      default: () => {},
    },
    attrs: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    config() {
      return {
        styles: this.styles,
        attrs: this.attrs,
        value: this.value,
      };
    },
  },
};
</script>