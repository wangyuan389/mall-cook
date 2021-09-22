<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-03 09:15:02
-->
<template>
  <div>
    <!-- 标题内容 -->
    <config-wrap title='样式设置'>

      <config-item label='框体样式'>
        <mode-select v-model="attr.shape">
          <mode-select-item
            span='方形'
            value='square'
          ></mode-select-item>
          <mode-select-item
            span='圆形'
            value='circular'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='文本位置'>
        <mode-select v-model="attr.location">
          <mode-select-item
            span='居左'
            value='left'
          ></mode-select-item>
          <mode-select-item
            span='居中'
            value='center'
          ></mode-select-item>
        </mode-select>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McSearchConfig",
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