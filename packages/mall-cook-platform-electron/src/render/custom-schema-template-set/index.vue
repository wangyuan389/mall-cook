<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-08 16:29:43
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 20:49:14
-->
<template>
  <div class="schema">
    <ul class="schema-head">
      <li>schema 生成器</li>
      <li>
        <el-button size="small" @click="resetSchema">重置 schema</el-button>
        <el-button size="small" class="f-white bg-theme" @click="exportSchema"
          >导出 schema</el-button
        >
      </li>
    </ul>
    <div class="schema-body">
      <schema-content></schema-content>
    </div>

    <schema-export ref="export"></schema-export>
  </div>
</template>

<script>
// schema生成器页面所需注册文件，进入当前路由再懒加载执行
import '@/utils/schemaRegister.js'

import SchemaContent from './components/SchemaContent.vue'
import SchemaExport from './components/SchemaExport.vue'

export default {
  name: 'custom-schema-template-set',

  components: {
    SchemaContent,
    SchemaExport
  },

  provide () {
    return {
      content: this
    }
  },

  data () {
    return {
      model: {
        label: '新增组件',
        icon: 'icon-zujian',
        componentList: []
      },
      curComponent: null
    }
  },

  methods: {
    exportSchema () {
      this.$refs.export.open()
    },

    resetSchema () {
      this.model = {
        label: '新增组件',
        icon: 'icon-zujian',
        componentList: []
      }
      this.curComponent = null
    }
  }
}
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

  .schema-body {
    height: calc(100vh - 56px); /*no*/
  }
}
</style>
