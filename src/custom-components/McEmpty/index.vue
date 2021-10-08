<!--
 * @Description: 空格组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 12:02:00
-->
<template>
  <div class="flex-center w-100">
    <hr
      v-if="attrs.model=='line'"
      class="w-100"
      :style="{borderTop: `${this.attrs.type} 1px ${this.styles.lineColor}`}"
    >
    </hr>
  </div>
</template>

<script>
export default {
  name: "McEmpty",

  props: {
    attrs: {
      type: Object,
      default: () => {},
    },
    styles: {
      type: Object,
      default: () => {},
    },
  },
};
</script>