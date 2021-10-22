<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-21 15:15:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-21 15:19:11
-->
<template>
  <div class="SchemaComponent">
    <config-wrap title="组件配置">
      <config-item label="组件名称">
        <el-input
          v-model="content.model.label"
          placeholder="请输入组件名称"
          size="small"
        ></el-input>
      </config-item>
      <config-item label="组件图标">
        <Imgpond v-model="content.model.icon" :count="1" />
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: 'SchemaComponent',

  inject: ['content']
}
</script>

<style lang="scss" scoped>
.SchemaComponent {
}
</style>
