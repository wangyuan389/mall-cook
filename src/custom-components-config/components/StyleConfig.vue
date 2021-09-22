<!--
 * @Description: 组件样式配置
 * @Autor: WangYuan
 * @Date: 2021-05-26 16:35:59
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:51:48
-->
<template>
  <div class="style-config">
    <config-item
      v-for="(value,key,index) in mValue"
      v-if="labelMap[key]"
      :label="labelMap[key]"
      :key="index"
    >

      <!-- 宽度 -->
      <el-input
        v-if="key == 'width'"
        v-model="mValue[key]"
      />

      <!-- 页面边距 -->
      <el-slider
        v-if="key == 'pagePadding'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 上部内间距 -->
      <el-slider
        v-if="key == 'cmpUpperPadding'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 下部内间距 -->
      <el-slider
        v-if="key == 'cmpLowerPadding'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 图片间距 -->
      <el-slider
        v-if="key == 'imgMargin'"
        v-model="mValue[key]"
        :max='10'
        show-input
      >
      </el-slider>

      <!-- 图片圆角 -->
      <el-slider
        v-if="key == 'imgRadius'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 组件圆角 -->
      <el-slider
        v-if="key == 'cmpRadius'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 组件上部圆角 -->
      <el-slider
        v-if="key == 'cmpUpperRadius'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 组件下部圆角 -->
      <el-slider
        v-if="key == 'cmpLowerRadius'"
        v-model="mValue[key]"
        :max='30'
        show-input
      >
      </el-slider>

      <!-- 下部外边距 -->
      <el-slider
        v-if="key == 'negativeMarginBottom'"
        v-model="mValue[key]"
        :min='-50'
        :max='0'
        show-input
      >
      </el-slider>

      <!-- 背景色 -->
      <config-color-picker
        v-if="key == 'cmpBackground'"
        v-model="mValue[key]"
      ></config-color-picker>

    </config-item>
  </div>
</template>

<script>
import ModeSelect from "@/components/ModeSelect";
import ModeSelectItem from "@/components/ModeSelect/ModeSelectItem";

export default {
  name: "StyleConfig",
  components: {
    ModeSelect,
    ModeSelectItem,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      mValue: {},
      labelMap: {
        width: "组件宽度",
        pagePadding: "页面边距",
        cmpRadius: "组件圆角",
        imgMargin: "图片间距",
        imgRadius: "图片圆角",
        cmpUpperRadius: "上部圆角",
        cmpLowerRadius: "下部圆角",
        cmpUpperPadding: "上部内间距",
        cmpLowerPadding: "下部内间距",
        negativeMarginBottom: "容器负边距",
        cmpBackground: "组件背景色",
      },
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },
    mValue: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.style-config {
}
</style>