<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-02 17:13:43
-->
<template>
  <div>
    <!-- 标题内容 -->
    <config-wrap title='标题内容'>
      <config-item label='大标题'>
        <el-input
          v-model="config.value.title"
          placeholder="请输入"
          size='small'
        ></el-input>
      </config-item>
      <config-item label='小标题'>
        <el-input
          v-model="config.value.info"
          placeholder="请输入"
          size='small'
        ></el-input>
      </config-item>

      <config-item label='选择模板'>
        <mode-select v-model="attr.model">
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
        </mode-select>
      </config-item>
    </config-wrap>

    <config-wrap title='标题容器样式'>
      <StyleConfig :value='config.style'></StyleConfig>
    </config-wrap>

    <!-- 标题样式设置 -->
    <config-wrap
      title='标题样式'
      :line='true'
    >
      <config-item label='大标题大小'>
        <mode-select v-model="style.titleSize">
          <mode-select-item
            v-for="(item,index) in sizeConfig"
            :key="index"
            :icon='item.icon'
            :tooltip='item.label'
            :value='item.value'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='大标题粗细'>
        <mode-select v-model="style.tilteWeight">
          <mode-select-item
            v-for="(item,index) in weightConfig"
            :key="index"
            :icon='item.icon'
            :tooltip='item.label'
            :value='item.value'
          ></mode-select-item>
        </mode-select>
      </config-item>

    </config-wrap>
    <config-wrap>

      <config-item label='小标题大小'>
        <mode-select v-model="style.infoSize">
          <mode-select-item
            v-for="(item,index) in sizeConfig"
            :key="index"
            :icon='item.icon'
            :tooltip='item.label'
            :value='item.value'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='小标题粗细'>
        <mode-select v-model="style.infoWeight">
          <mode-select-item
            v-for="(item,index) in weightConfig"
            :key="index"
            :icon='item.icon'
            :tooltip='item.label'
            :value='item.value'
          ></mode-select-item>
        </mode-select>
      </config-item>
    </config-wrap>

  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McTitleConfig",
  mixins: [componentConfigMixin],
  data() {
    return {
      sizeConfig: [
        {
          icon: "deco-icon-font-s",
          label: "12号",
          value: 12,
        },

        {
          icon: "deco-icon-font-m",
          label: "16号",
          value: 16,
        },
        {
          icon: "deco-icon-font-x",
          label: "20号",
          value: 20,
        },
      ],
      weightConfig: [
        {
          icon: "deco-icon-font-regular",
          label: "常规体",
          value: 100,
        },
        {
          icon: "deco-icon-font-bold",
          label: "加粗体",
          value: 700,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>