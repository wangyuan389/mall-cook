<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-08 16:34:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-09 10:33:18
-->
<template>
  <div class="schema">
    <ul class="schema-head">
      <li>schema 生成器</li>
      <li>
        <el-button size="small">重置 schema</el-button>
        <el-button
          size="small"
          class='f-white bg-theme'
        >导出 schema</el-button>
      </li>
    </ul>

    <custom-schema-template-set />
  </div>
</template>

<script>
import customSchemaTemplateSet from "@/custom-schema-template-set/index";
export default {
  name: "schema",
  components: {
    customSchemaTemplateSet,
  },
};
</script>

<style lang="scss" scoped>
.schema {
  .schema-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    width: 100%;
    padding: 0 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
  }
}
</style>