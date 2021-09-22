<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-06-23 14:01:37
-->
<template>
  <div>
    <config-wrap title='添加图片'>
      <Imgpond
        :count="1"
        v-model="config.value"
      />
    </config-wrap>
    <config-wrap title='图片样式'>
      <StyleConfig :value='config.style'></StyleConfig>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McImgConfig",
  mixins: [componentConfigMixin],
};
</script>

<style lang="scss" scoped>
</style>