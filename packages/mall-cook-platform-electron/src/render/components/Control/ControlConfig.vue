<!--
 * @Description: 物料属性面板
 * @Autor: WangYuan
 * @Date: 2022-01-13 15:31:38
 * @LastEditors: June
 * @LastEditTime: 2023-05-17 00:05:23
-->
<template>
  <div class="Config">
    <config-ctn
      v-if="control.curWidget"
      :title="control.curWidget.name"
    >
      <custom-schema-template
        :schema="curSchema"
        v-model="control.curWidget"
        :key="control.curWidget.id"
      ></custom-schema-template>
    </config-ctn>

    <config-ctn v-else title="页面配置">
      <page-config></page-config>
    </config-ctn>
  </div>
</template>

<script>
import PageConfig from "@/components/PageConfig/index.vue";
export default {
  components: {
    PageConfig
  },
  
  inject: ["control"],

  computed: {
    curSchema() {
      console.log('curSchema');
      console.log(this.control.curWidget);
      
      
      return this.$fields[this.control.curWidget.component];
    },
  },
};
</script>

<style lang='scss'>
</style>