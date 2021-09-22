<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-07-20 11:47:46
-->
<template>
  <div>
    <config-wrap title='公告内容'>
      <config-item label='公告文本'>
        <el-input
          v-model="config.value"
          size='small'
          type="textarea"
          :rows="3"
          placeholder="请输入公告文本"
        ></el-input>
      </config-item>
    </config-wrap>
    <config-wrap title='公告样式'>
      <StyleConfig :value='config.style'></StyleConfig>
      <config-item label='文本颜色'>
        <config-color-picker v-model="style.fontColor"></config-color-picker>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McNoticeConfig",
  mixins: [componentConfigMixin],
};
</script>

<style lang="scss" scoped>
</style>