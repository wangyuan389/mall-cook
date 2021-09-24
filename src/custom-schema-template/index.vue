<!--
 * @Description: 自定义组件配置模板
 * @Autor: WangYuan
 * @Date: 2021-09-23 20:10:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 16:53:19
-->
<template>
  <ul>
    <li
      v-for="(val,key,index) in schema"
      :key="index"
    >
      <SchemaContainer v-bind="val">
        <template v-if="val.fields">
          <!-- <component
            v-for="(v,i) in val.fields"
            :key="i"
            :is="typeToComponent(v.type)"
            v-model="value[key][v.key]"
            v-bind="v"
          ></component> -->
          <div
            v-for="(v,i) in val.fields"
            :key="i"
          >
            <component
              :is="typeToComponent(v.type)"
              v-model="value[key][v.key]"
              v-bind="v"
            ></component>
            <!-- {{v}} -->
            <!-- {{value[key][v.key]}} -->
            <!-- {{value[key][v.key]}}
            {{value}}
            {{value[key]}}
            {{v.key}}
            {{v.type}}
            {{typeToComponent(v.type)}} -->
          </div>
        </template>
      </SchemaContainer>
    </li>
  </ul>
</template>

<script>
export default {
  name: "custom-schema-template",
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
    return {};
  },
  methods: {
    typeToComponent(type) {
      let typeModel = {
        number: "SchemaNumber",
        upload: "SchemaUpload",
        color: "SchemaColor",
        select: "SchemaSelect",
        cube: "SchemaCapCube",
      };
      console.log(typeModel[type]);

      return typeModel[type];
    },
  },
};
</script>
