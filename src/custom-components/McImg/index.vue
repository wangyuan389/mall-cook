<!--
 * @Description: 图片组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-20 20:52:44
-->
<template>
  <div :style="$getWrapStyle(imageStyle)">
    <img
      class="img"
      :src="imageValue.imagePath || defaultImage"
      :style="$getComponentStyle(this.imageStyle)"
    />
  </div>
</template>

<script>
export default {
  name: 'McImg',

  props: {
    imageStyle: {
      type: Object,
      default: () => {}
    },
    imageValue: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      defaultImage:
        'https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp'
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
}
</style>
