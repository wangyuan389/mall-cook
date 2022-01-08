<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 14:21:13
-->
<template>
  <config-item :label='label'>

    <el-date-picker
      v-model="mValue"
      type="datetime"
      v-bind="mOptions"
      size='small'
      style="width:100%"
    >
    </el-date-picker>
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
export default {
  name: "SchemaTime",
  mixins: [schemaMixin],

  data() {
    return {
      defaultOptions: {
        placeholder: "选择日期时间",
        format: "yyyy-MM-dd HH:mm:ss",
      },
    };
  },
};
</script>