<!--
 * @Description: 自定义组件配置模板
 * @Autor: WangYuan
 * @Date: 2021-09-23 20:10:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 11:52:02
-->
<template>
  <ul>
    <li
      v-for="(s,key,index) in schema"
      :key="index"
    >
      <SchemaContainer v-bind="s">

        <!-- schema object类型 -->
        <template v-if="s.type=='object' && s.fields">
          <component
            v-for="(f,i) in s.fields"
            :key="i"
            :is="typeToComponent[f.type]"
            v-model="value[key][f.key]"
            v-bind="f"
          >
          </component>
        </template>

        <!-- schema array类型 -->
        <SchemaList
          v-else-if="s.type=='array' && s.fields"
          v-model="value[key]"
          :schema="s"
          v-bind="s"
        />

        <!-- 特殊类型 -->
        <component
          v-else
          :is="typeToComponent[s.type]"
          :schema="s"
          v-model="value[key]"
          v-bind="s"
        />
      </SchemaContainer>
    </li>
  </ul>
</template>

<script>
import typeToComponent from "@/config/schema-template";

export default {
  name: "custom-schema-template",

  provide() {
    return {
      mode: this,
    };
  },

  props: {
    schema: {
      typeof: Object,
      default: () => {},
    },
    value: {
      typeof: Object,
      default: () => {},
    },
  },

  data() {
    return {
      typeToComponent,
    };
  },

  methods: {
    typeToComponent(type) {
      let typeModel = {
        number: "SchemaNumber",
        string: "SchemaString",
        select: "SchemaSelect",
        switch: "SchemaSwitch",
        color: "SchemaColor",
        upload: "SchemaUpload",
        jump: "SchemaJump",
        time: "SchemaTime",
        cube: "SchemaCapCube",
        goods: "SchemaGoods",
      };

      return typeModel[type];
    },
  },
};
</script>
