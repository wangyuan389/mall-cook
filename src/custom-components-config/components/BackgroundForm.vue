<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-09 11:22:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-02 17:13:51
-->
<template>
  <div>
    <config-item label='背景类型:'>
      <mode-select v-model="mValue.type">
        <mode-select-item
          span='渐变'
          tooltip='渐变背景'
          value='color'
        ></mode-select-item>
        <mode-select-item
          span='图片'
          tooltip='图片背景'
          value='image'
        ></mode-select-item>
      </mode-select>
    </config-item>
    <config-item
      v-if="mValue.type == 'color'"
      label='背景颜色:'
    >
      <gradient v-model="mValue.colorList"></gradient>
    </config-item>

    <config-item
      v-if="mValue.type == 'image'"
      label='背景图片:'
    >
      背景图片
    </config-item>
  </div>
</template>

<script>
import ModeSelect from "@/components/ModeSelect";
import ModeSelectItem from "@/components/ModeSelect/ModeSelectItem";

export default {
  name: "BackgroundForm",
  components: {
    ModeSelect,
    ModeSelectItem,
  },
  props: {
    value: {
      default: () => {},
    },
  },
  data() {
    return {
      mValue: {},
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
</style>