<!--
 * @Description: 魔方多维布局配置
 * @Autor: WangYuan
 * @Date: 2021-06-03 13:59:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-02 17:14:10
-->
<template>
  <div class="cap-cube-avlue">

    <config-item
      v-show="config.attr.model=='custom'"
      label='魔方行数'
    >
      <el-select
        v-model="config.attr.row"
        placeholder="请选择"
        size='small'
        @change="changeRow"
      >
        <el-option
          v-for="key in 10"
          :key="key"
          :label="key+'行'"
          :value="key"
        >
        </el-option>
      </el-select>
    </config-item>

    <template>
      <div class="f-red f13 mb15">魔方布局</div>
      <div class="f-grey f12 mb15">移动鼠标选定布局区域大小</div>
      <cap-cube-layout
        ref="layout"
        :row='config.attr.row'
        :model='config.attr.model'
        v-model='config.value'
        @onCuurIndex='onCuurIndex'
      ></cap-cube-layout>
    </template>

    <div class="mt15 mb20">
      <mode-select
        v-model="config.attr.model"
        direction='column'
        @change="changeModel"
      >
        <mode-select-item
          v-for="(model,index) in models"
          :key="index"
          v-bind="model"
        ></mode-select-item>
      </mode-select>
    </div>

    <div v-if="activeItem" class="nav">
      <Imgpond
        :count="1"
        v-model="activeItem.image"
      />
    </div>
  </div>
</template>

<script>
import ModeSelect from "@/components/ModeSelect";
import ModeSelectItem from "@/components/ModeSelect/ModeSelectItem";
import CapCubeLayout from "./CapCubeLayout";
import ConfigItem from "../ConfigItem";
import { modelObj } from "./config";

export default {
  name: "CapCubeValue",
  components: {
    ModeSelect,
    ConfigItem,
    CapCubeLayout,
    ModeSelectItem,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeItem: {},
      models: [
        {
          tooltip: "一行两个",
          value: "capcub1",
          icon: "deco-icon-cuberow",
          row: 3,
        },
        {
          tooltip: "一行三个",
          value: "capcub2",
          icon: "deco-icon-cuberow2",
          row: 2,
        },
        { tooltip: "两左两右", value: "capcub3", icon: "deco-icon-cube", row: 6 },
        {
          tooltip: "一左两右",
          value: "capcub4",
          icon: "deco-icon-cubeto",
          row: 6,
        },
        {
          tooltip: "一上两下",
          value: "capcub5",
          icon: "deco-icon-cube-upto",
          row: 5,
        },
        {
          tooltip: "一左右三",
          value: "capcub6",
          icon: "deco-icon-cubeto1",
          row: 5,
        },
        {
          tooltip: "自定义",
          value: "custom",
          icon: "deco-icon-cube-custom",
          row: 5,
        },
      ],
    };
  },
  methods: {
    // 切换模型
    changeModel(model) {
      console.log("切换模型");

      if (model) {
        // 设置模板对应行数
        let target = this.models.find((m) => m.value == model);
        this.$set(this.config.attr, "row", target.row);

        // 重置模板
        this.$refs.layout.reset();

        // 设置模板对应初始数据
        if (model == "custom") {
          this.$set(this.config, "value", []);
        } else {
          this.$set(this.config, "value", this._.cloneDeep(modelObj[model]));
        }
      }
    },

    // 切换行数
    changeRow() {
      this.$refs.layout.reset();
    },

    onCuurIndex(itme) {
      this.activeItem = itme;
    },
  },
};
</script>

<style lang="scss" scoped>
.cap-cube-avlue {
}
</style>