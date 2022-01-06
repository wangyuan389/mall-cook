<!--
 * @Description: 商品价格组件
 * @Autor: WangYuan
 * @Date: 2021-09-11 11:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:43:56
-->
<template>
  <div class="flex">
    <!-- 现价 -->
    <p
      v-if="price"
      class="f-h5-theme"
    >
      <span :class="`price-icon-${size}`">¥</span>
      <span :class="`price-text-${size}`">{{price | money}}</span>
    </p>

    <!-- 原价 -->
    <p
      v-if="original"
      class="ml6 text-through f-grey"
    >
      <span :class="`original-icon-${size}`">¥</span>
      <span :class="`original-text-${size}`">{{original | money}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "PriceSpan",

  props: {
    // 现价
    price: {
      type: [String, Number],
    },
    // 原价
    original: {
      type: [String, Number],
    },
    // 尺寸
    size: {
      type: String,
      default: "small",
    },
  },
};
</script>

<style lang="scss" scoped>
.price-icon-small {
  font-size: 12px;
  letter-spacing: -1px;
}

.price-text-small {
  font-size: 16px;
}

.original-icon-small {
  font-size: 12px;
  letter-spacing: 1px;
}

.original-text-small {
  font-size: 12px;
}
</style>
