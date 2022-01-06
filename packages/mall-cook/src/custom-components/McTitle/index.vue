<!--
 * @Description: 标题组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:37:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-25 19:43:24
-->
<template>
  <div class="title" :style="$getWrapStyle(styles)">
    <div
      :class="[
        attrs.model == 'center' ? 'title-mid-model' : 'title-left-model'
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

      <!-- 副标题 -->
      <div class="info" :style="getInfoStyle()">{{ value.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McTitle',

  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    attrs: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    // 主标题样式
    getTitleStyle () {
      return {
        color: this.styles.titleColor,
        fontSize: this.$pxTorem(this.styles.titleSize),
        fontWeight: this.styles.tilteWeight
      }
    },

    // 副标题样式
    getInfoStyle () {
      return {
        color: this.styles.infoColor,
        fontSize: this.$pxTorem(this.styles.infoSize),
        fontWeight: this.styles.infoWeight
      }
    }
  }
}
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
