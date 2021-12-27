<!--
 * @Description: 属性组件配置模板
 * @Autor: WangYuan
 * @Date: 2021-09-23 20:10:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-27 16:22:47
-->
<template>
  <ul>
    <li v-for="(s, key, index) in schema" :key="index">
      <component
        :key="index"
        :is="typeToComponent[s.type]"
        v-model="value[key]"
        v-bind="s"
        :schema="s"
      >
        <custom-schema-template
          v-if="s.child"
          :schema="s.child"
          :value="value[key]"
        ></custom-schema-template>
      </component>
    </li>
  </ul>
</template>

<script>
import typeToComponent from '@/config/schema-template'

export default {
  name: 'custom-schema-template',

  provide () {
    return {
      mode: this
    }
  },

  props: {
    schema: {
      typeof: Object,
      default: () => {}
    },
    value: {
      typeof: Object,
      default: () => {}
    }
  },

  data () {
    return {
      typeToComponent
    }
  }
}
</script>
