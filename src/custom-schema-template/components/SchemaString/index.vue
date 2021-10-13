<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 14:16:01
-->
<template>
  <config-item :label='label'>
    <el-input
      v-model="mValue"
      v-bind="mOptions"
      size='small'
    ></el-input>
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
export default {
  name: "SchemaString",
  mixins: [schemaMixin],
};
</script>