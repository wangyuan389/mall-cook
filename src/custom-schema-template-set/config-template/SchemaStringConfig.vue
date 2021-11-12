<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-13 14:14:54
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-12 17:17:36
-->
<template>
  <div>
    <config-wrap title='必输配置'>
      <config-item label='属性名'>
        <el-input
          v-model="content.curComponent.property"
          placeholder="请输入属性名"
          size='small'
        ></el-input>
      </config-item>
    </config-wrap>
    <config-wrap title='基础配置'>
      <config-item label='标题'>
        <el-input
          v-model="content.curComponent.label"
          placeholder="请输入标题"
          size='small'
        ></el-input>
      </config-item>
            <config-item label='占位符'>
        <el-input
          v-model="content.curComponent.options.placeholder"
          placeholder="请输入占位符"
          size='small'
        ></el-input>
      </config-item>
      <config-item label='默认值'>
        <el-input
          v-model="content.curComponent.value"
          placeholder="请输入默认值"
          size='small'
        ></el-input>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: "SchemaStringConfig",

  inject: ["content"],
};
</script>

