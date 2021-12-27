<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-27 17:53:34
-->
<template>
  <div class="title">
    <div
      :class="[
        attrs.model == 'center' ? 'title-mid-model' : 'title-left-model',
      ]"
      :style="$getComponentStyle(styles)"
    >
      <!-- 主标题 -->
      <div
        class="title"
        :class="[attrs.model == 'center' ? 'mb8' : 'mr5']"
        :style="getTitleStyle()"
      >
        {{ value.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTitle",

  props: {
    title: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "center",
    },
    styles: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    // 主标题样式
    getTitleStyle() {
      return {
        color: this.styles.titleColor,
        fontSize: this.styles.titleSize + "px",
        fontWeight: this.styles.tilteWeight,
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
