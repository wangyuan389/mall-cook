<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 11:26:41
-->
<template>
  <config-item :label='label'>
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
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";

export default {
  name: "SchemaColor",

  mixins: [schemaMixin],

  data() {
    return {
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
};
</script>