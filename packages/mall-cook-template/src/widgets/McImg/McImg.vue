<!--
 * @Description: 图片组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-12 14:34:37
-->
<template>
  <div :style="[$wrapStyle(imageStyle),$cmpStyle(this.imageStyle)]">
    <image
      class="img"
      mode="widthFix"
      :style="[getImgStyle()]"
      :src="imageValue.imagePath || defaultImage"
      @click="$jump(imageValue.jumpPath)"
    />
  </div>
</template>

<script>
export default {
  name: "McImg",

  props: {
    imageStyle: {
      type: Object,
      default: () => {},
    },
    imageValue: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      defaultImage:
        "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
    };
  },

  methods: {
    getImgStyle(){
      return {
        borderRadius:`${this.imageStyle.cmpRadius}px`
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
}
</style>
