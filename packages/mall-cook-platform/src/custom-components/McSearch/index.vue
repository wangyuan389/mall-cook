<!--
 * @Description: 搜索组件
 * @Autor: WangYuan
 * @Date: 2021-09-02 20:45:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-25 19:56:02
-->
<template>
  <div class="search" :style="$getComponentStyle(this.styles)">
    <div
      class="search-body"
      :style="getSourceStyle()"
      @click="$routerPage('search')"
    >
      <van-icon class="f16 mr5" name="search" />
      <span class="">{{ value.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McSearch',

  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    // 搜索框样式
    getSourceStyle () {
      let temp = {}
      if (this.styles.shape == 'circular') temp.borderRadius = '25px'
      if (this.styles.location == 'center') temp.justifyContent = 'center'
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 8px 12px;

  .search-body {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    height: 34px;
    background: #fff;
    font-size: 14px;
    color: #969799;
  }
}</style
>+
