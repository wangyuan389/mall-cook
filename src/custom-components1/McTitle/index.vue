<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 11:13:37
-->
<template>
  <div class="title">
    <div
      :class="[attr.model=='mid' ? 'title-mid-model' : 'title-left-model']"
      :style="$getComponentStyle(style)"
    >
      <!-- 主标题 -->
      <div
        class="title"
        :class="[attr.model=='mid' ? 'mb8' : 'mr5']"
        :style="getTitleStyle()"
      >{{value.title}}</div>

      <!-- 副标题 -->
      <div
        class="info"
        :style="getInfoStyle()"
      >{{value.info}}</div>
    </div>
  </div>
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McTitle",

  mixins: [componentMixin],

  methods: {
    // 主标题样式
    getTitleStyle() {
      return {
        color: this.style.titleColor,
        fontSize: this.$pxTorem(this.style.titleSize),
        fontWeight: this.style.tilteWeight,
      };
    },

    // 副标题样式
    getInfoStyle() {
      return {
        color: this.style.infoColor,
        fontSize: this.$pxTorem(this.style.infoSize),
        fontWeight: this.style.infoWeight,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  .title-left-model {
    display: flex;
    align-items: flex-end;
    padding-left: 10px;
    padding-right: 10px;
  }

  .title-mid-model {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>