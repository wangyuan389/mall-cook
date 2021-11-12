<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-13 14:14:54
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-12 17:17:45
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
      <config-item label='默认时间'>
        <el-date-picker
          v-model="content.curComponent.value"
          style="width:100%"
          type="datetime"
          size='small'
        >
        </el-date-picker>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
export default {
  name: "SchemaTimeConfig",

  inject: ["content"],
};
</script>

