<!--
 * @Description: 空格组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 16:01:39
-->
<template>
  <div :style="[$wrapStyle(styles)]">
    <div
      class="flex-center w-100"
      :style="{ height: this.styles.height + 'px' }"
    >
      <hr
        v-if="styles.model == 'line'"
        class="w-100"
        :style="[getLineStyle()]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "McEmpty",

  props: {
    styles: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    getLineStyle() {
      return {
        borderTop: `${this.styles.type} 1px ${this.styles.lineColor}`,
      };
    },
  },
};
</script>
