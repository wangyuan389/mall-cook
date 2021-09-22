<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-02 17:11:53
-->
<template>
  <div>
    <config-wrap>

      <config-item label='分割类型'>
        <mode-select v-model="attr.model">
          <mode-select-item
            icon='deco-icon-white'
            tooltip='辅助空白'
            value='basis'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-line'
            tooltip='辅助线'
            value='line'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='空白高度'>
        <el-slider
          v-model="style.height"
          :max='100'
          show-input
        >
        </el-slider>
      </config-item>

      <StyleConfig :value='config.style'></StyleConfig>

      <template v-if="attr.model=='line'">
        <config-item label='选择样式'>
          <mode-select v-model="style.lineType">
            <mode-select-item
              icon='deco-icon-line-solid'
              tooltip='实线'
              value='solid'
            ></mode-select-item>
            <mode-select-item
              icon='deco-icon-line-dashed'
              tooltip='虚线'
              value='dashed'
            ></mode-select-item>
          </mode-select>
        </config-item>

        <config-item label='辅助线颜色'>
          <config-color-picker v-model="style.lineColor"></config-color-picker>
        </config-item>
      </template>

    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McEmptyConfig",
  mixins: [componentConfigMixin],
};
</script>

<style lang="scss" scoped>
</style>