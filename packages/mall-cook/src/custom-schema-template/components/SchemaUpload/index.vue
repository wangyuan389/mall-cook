<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 14:16:11
-->
<template>
  <config-item :label='label'>
    <Imgpond
      v-model="mValue"
      v-bind="mOptions"
      :count="1"
    />
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";

export default {
  name: "SchemaUpload",

  mixins: [schemaMixin],
};
</script>