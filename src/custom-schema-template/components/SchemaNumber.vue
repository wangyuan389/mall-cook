<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 10:20:38
-->
<template>
  <config-item :label='label'>
    <el-slider
      v-model="mValue"
      :max='100'
      show-input
    >
    </el-slider>
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
export default {
  name: "SchemaNumber",
  mixins: [schemaMixin],
};
</script>