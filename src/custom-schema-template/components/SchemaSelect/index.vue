<!--
 * @Description: 模板选择容器组件
 * @Autor: WangYuan
 * @Date: 2021-05-31 11:54:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 12:02:01
-->
<template>
  <config-item :label='label'>
    <div
      class="mode-select"
      :class="[direction=='column' ? 'flex-column' : '']"
    >
      <!-- label -->
      <div class="mode-select-label">
        {{data.find(v=>v.value==value).label}}
      </div>

      <!-- 内容插槽 -->
      <div class="flex flex-wrap">
        <select-item
          v-for="(item,index) in data"
          v-bind="item"
        ></select-item>
      </div>
    </div>
  </config-item>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import SelectItem from "./SelectItem";

export default {
  name: "SchemaSelect",

  components: {
    SelectItem,
  },

  mixins: [schemaMixin],

  provide() {
    return {
      mode: this,
    };
  },

  props: {
    value: {
      default: 0,
    },
    data: {
      type: Array,
    },
    direction: {
      default: "row",
    },
  },
};
</script>

<style lang="scss" scoped>
.mode-select {
  display: flex;
  justify-content: space-between;

  .mode-select-label {
    font-size: 14px; /*no*/
    line-height: 32px; /*no*/
  }
}
</style>