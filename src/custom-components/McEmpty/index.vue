<!--
 * @Description: 空格组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 11:48:37
-->
<template>
  <div
    class="flex-center"
    :style="getStyle()"
  >
    <hr
      v-if="attr.model=='line'"
      :style="getLineStyle()"
    >
    </hr>
  </div>
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McEmpty",

  mixins: [componentMixin],

  methods: {
    getStyle() {
      return {
        width: `100%`,
        height: this.style.height,
      };
    },
    getLineStyle() {
      return {
        width: `100%`,
        borderTop: `${this.attr.type} 1px ${this.style.lineColor}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
}
</style>