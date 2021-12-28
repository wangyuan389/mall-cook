<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-28 09:23:23
-->
<template>
  <div class="title">
    <div :class="[model == 'center' ? 'title-mid-model' : 'title-left-model']">
      <!-- 主标题 -->
      <div
        class="title"
        :style="getTitleStyle()"
      >
        {{ title }}
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
