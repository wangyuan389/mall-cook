<!--
 * @Description: 属性组件配置模板
 * @Autor: WangYuan
 * @Date: 2021-09-23 20:10:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-12 16:31:13
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

      <!-- <SchemaObject v-bind="s">
        <template v-if="s.type == 'object' && s.fields">
          <component
            v-for="(f, i) in s.fields"
            :key="i"
            :is="typeToComponent[f.type]"
            v-model="value[key][f.key]"
            v-bind="f"
          >
          </component>
        </template>

        <SchemaArray
          v-else-if="s.type == 'array' && s.fields"
          v-model="value[key]"
          :schema="s"
          v-bind="s"
        />

        <component
          v-else
          :is="typeToComponent[s.type]"
          :schema="s"
          v-model="value[key]"
          v-bind="s"
        />
      </SchemaObject> -->
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
