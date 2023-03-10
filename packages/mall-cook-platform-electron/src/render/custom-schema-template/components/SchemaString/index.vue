<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-10 14:20:53
-->
<template>
  <config-item :label='label'>
    <el-input
      v-model="mValue"
      v-bind="mOptions"
      :placeholder='mOptions.placeholder'
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