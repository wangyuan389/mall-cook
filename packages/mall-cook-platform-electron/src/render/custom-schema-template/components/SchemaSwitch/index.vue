<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-01 08:57:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 15:18:52
-->
<template>
  <config-item :label='label'>
    <div class="wrap">
      <div class="wrap-label">{{mValue?mOptions.trueLabel:mOptions.falseLabel}}</div>
      <el-checkbox v-model="mValue"></el-checkbox>
    </div>
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";

export default {
  name: "SchemaSwitch",

  mixins: [schemaMixin],

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      defaultOptions: {
        trueLabel: "显示",
        falseLabel: "隐藏",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 25px; /*no*/

  .wrap-label {
    font-size: 14px; /*no*/
    line-height: 32px; /*no*/
  }
}
</style>