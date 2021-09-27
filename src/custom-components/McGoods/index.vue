<!--
 * @Description: 商品组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 14:35:36
-->
<template>
  <goods-tabs :config='config'>
    <template v-slot="{list}">
      <goods-list :list='list'></goods-list>
    </template>
  </goods-tabs>
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McGoods",

  mixins: [componentMixin],
};
</script>