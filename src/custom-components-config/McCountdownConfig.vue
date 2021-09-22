<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-09 11:21:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-02 17:11:38
-->
<template>
  <div class="McCountdownConfig">
    <config-wrap title='内容设置'>
      <config-item label='开始时间'>
        <el-date-picker
          v-model="value.startTime"
          type="datetime"
          placeholder="选择日期时间"
          format='yyyy-MM-dd HH:mm:ss'
        >
        </el-date-picker>
      </config-item>
      <config-item label='结束时间'>
        <el-date-picker
          v-model="value.endTime"
          type="datetime"
          placeholder="选择日期时间"
          format='yyyy-MM-dd HH:mm:ss'
        >
        </el-date-picker>
      </config-item>
      <config-item label='标题文本'>
        <el-input
          v-model="value.titleText"
          placeholder="请输入"
          size='small'
        ></el-input>
      </config-item>
    </config-wrap>

    <config-wrap title='样式设置'>
      <config-item label='选择模板'>
        <mode-select v-model="attr.model">
          <mode-select-item
            span='样式1'
            tooltip='样式1'
            value='one'
          ></mode-select-item>
          <mode-select-item
            span='样式2'
            tooltip='样式2'
            value='two'
          ></mode-select-item>
          <mode-select-item
            span='样式3'
            tooltip='样式3'
            value='three'
          ></mode-select-item>
        </mode-select>
      </config-item>
      <config-item label='选择位置'>
        <mode-select v-model="style.location">
          <mode-select-item
            icon='deco-icon-align-left'
            tooltip='居左'
            value='left'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-align-center'
            tooltip='居中'
            value='mid'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-align-right'
            tooltip='居右'
            value='right'
          ></mode-select-item>
        </mode-select>
      </config-item>
      <config-item label='标题颜色'>
        <config-color-picker v-model="style.titleColor"></config-color-picker>
      </config-item>
      <config-item label='时间颜色'>
        <config-color-picker v-model="style.timeColor"></config-color-picker>
      </config-item>
      <StyleConfig :value='config.style'></StyleConfig>
    </config-wrap>

    <config-wrap title='背景设置'>
      <BackgroundForm v-model="style.backgroundConfig"></BackgroundForm>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";

export default {
  name: "McCountdownConfig",
  mixins: [componentConfigMixin],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.McCountdownConfig {
}
</style>