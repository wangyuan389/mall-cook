<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-06-09 19:35:50
-->
<template>
  <div>
    <config-wrap title='魔方内容'>
      <CapCubeValue :config='config'></CapCubeValue>
    </config-wrap>
    <config-wrap title='魔方样式'>
      <StyleConfig :value='config.style'></StyleConfig>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McCapCubeConfig",
  mixins: [componentConfigMixin],
};
</script>

<style lang="scss" scoped>
</style>