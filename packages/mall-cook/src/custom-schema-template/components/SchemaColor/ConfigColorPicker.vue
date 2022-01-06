<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-07 16:29:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-06-08 10:36:50
-->
<template>
  <div
    class="flex row-right"
    style="width: calc(100% - 24px);"
  >
    <el-color-picker
      v-model="mValue"
      :predefine="predefineColors"
      show-alpha
    ></el-color-picker>
  </div>
</template>

<script>
export default {
  name: "ConfigColorPicker",
  props: {
    value: {},
  },
  data() {
    return {
      mValue: "",
      predefineColors: [
        "#ffffff",
        "#f5f5f5f5",
        "#F2F2F2",
        "#FF4444",
        "#FFCD00",
        "#3FBC87",
        "#5197FF",
        "#BADCFF",
        "#000000",
      ],
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
        this.$emit("change", newValue);
      },
    },
  },
};
</script>

