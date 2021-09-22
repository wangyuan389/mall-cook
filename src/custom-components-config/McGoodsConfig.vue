<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 15:44:44
-->
<template>
  <div>
    <config-wrap title='商品'>
      <GoodsConfigManager v-model="config.value"></GoodsConfigManager>
    </config-wrap>

    <config-wrap title='模板设置'>
      <config-item label='选择模板'>
        <mode-select
          v-model="attr.model"
          @change='changeModel'
        >
          <mode-select-item
            icon='deco-icon-menu-top'
            tooltip='顶部菜单'
            value='transverse'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-menu-left'
            tooltip='左侧菜单'
            value='vertical'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item
        v-if="attr.model == 'transverse'"
        label='列表样式'
      >
        <mode-select
          v-model="attr.listModel"
          direction='column'
        >
          <mode-select-item
            v-for="(item,index) in listStyleConfig"
            :key="index"
            :icon='item.icon'
            :label='item.label'
            :value='item.value'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='对齐方式'>
        <mode-select v-model="attr.itemAlign">
          <mode-select-item
            icon='deco-icon-align-left'
            tooltip='左对齐'
            value='left'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-align-center'
            tooltip='居中对齐'
            value='mid'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='文本加粗'>
        <mode-select v-model="attr.itemBold">
          <mode-select-item
            icon='deco-icon-font-regular'
            tooltip='常规体'
            :value='false'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-font-bold'
            tooltip='加粗体'
            :value='true'
          ></mode-select-item>
        </mode-select>
      </config-item>
    </config-wrap>

    <template v-if="attr.model == 'transverse'">
      <config-wrap title='分组设置'>

        <config-item label='分组样式'>
          <mode-select v-model="attr.tabModel">
            <mode-select-item
              v-for="(item,index) in tabStyleConfig"
              :key="index"
              :icon='item.icon'
              :tooltip='item.label'
              :value='item.value'
            ></mode-select-item>
          </mode-select>
        </config-item>

        <config-item label='显示分割线'>
          <mode-switch v-model="attr.tabLine"></mode-switch>
        </config-item>

        <config-item label='显示大标题'>
          <mode-switch v-model="attr.tabTitle"></mode-switch>
        </config-item>

        <config-item
          v-if="attr.tabTitle"
          label='大标题颜色'
        >
          <config-color-picker v-model="style.tabTitleColor"></config-color-picker>
        </config-item>

        <config-item label='标题颜色'>
          <config-color-picker v-model="style.tabColor"></config-color-picker>
        </config-item>

        <config-item label='选中颜色'>
          <config-color-picker v-model="style.tabActiveColor"></config-color-picker>
        </config-item>

        <config-item label='背景颜色'>
          <config-color-picker v-model="style.tabBackground"></config-color-picker>
        </config-item>
      </config-wrap>
    </template>

    <config-wrap title='容器样式设置'>
      <config-item label='上部间距'>
        <el-slider
          v-model="style.wrapPaddingTop"
          :max='300'
          show-input
        >
        </el-slider>
      </config-item>
      <config-item label='背景图片'>
        <div class="flex row-right">
          <Imgpond
            :count="1"
            v-model="style.wrapBackgroundImage"
          />
        </div>
      </config-item>
      <config-item label='背景色'>
        <config-color-picker v-model="style.wrapBackgroundColor"></config-color-picker>
      </config-item>
    </config-wrap>

    <config-wrap title='字段设置'>
      <config-item label='商品名称'>
        <mode-switch v-model="attr.showName"></mode-switch>
      </config-item>
      <config-item label='商品描述'>
        <mode-switch v-model="attr.showInfo"></mode-switch>
      </config-item>
      <config-item label='商品现价'>
        <mode-switch v-model="attr.showPresentPrice"></mode-switch>
      </config-item>
      <config-item label='商品原价'>
        <mode-switch v-model="attr.showOriginalPrice"></mode-switch>
      </config-item>
      <config-item label='购买'>
        <mode-switch v-model="attr.showBuy"></mode-switch>
      </config-item>

      <template v-if="attr.showBuy">
        <config-item label='购买背景色'>
          <config-color-picker v-model="style.buyBackgroundColor"></config-color-picker>
        </config-item>
        <config-item label='购买文本'>
          <el-input
            v-model="attr.buyText"
            placeholder="请输入"
            size='small'
          ></el-input>
        </config-item>
      </template>
    </config-wrap>

  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
import GoodsConfigManager from "./components/Goods/GoodsConfigManager.vue";
import ModeSwitch from "@/components/ModeSwitch";

export default {
  name: "McGoodsConfig",
  mixins: [componentConfigMixin],
  components: {
    GoodsConfigManager,
    ModeSwitch,
  },
  data() {
    return {
      tabStyleConfig: [
        {
          icon: "deco-icon-tabs-1",
          label: "样式1",
          value: "tab1",
        },
        {
          icon: "deco-icon-tabs-2",
          label: "样式2",
          value: "tab2",
        },
        {
          icon: "deco-icon-tabs-3",
          label: "样式3",
          value: "tab3",
        },
      ],
      listStyleConfig: [
        {
          icon: "deco-icon-small",
          label: "一行两个",
          value: "towCols",
        },
        {
          icon: "deco-icon-three",
          label: "一行三个",
          value: "threeCols",
        },
        {
          icon: "deco-icon-swipe",
          label: "横向滚动",
          value: "roll",
        },
        {
          icon: "deco-icon-list",
          label: "列表",
          value: "oneCols",
        },
      ],
    };
  },
  methods: {
    changeModel() {
      if (this.attr.model == "vertical") this.attr.listModel = "oneCols";
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload-list__item {
  margin: 0;
}
</style>