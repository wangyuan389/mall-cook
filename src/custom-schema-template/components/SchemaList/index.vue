<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 16:28:02
-->
<template>
  <config-wrap title='数组'>
    <div class="nav">
      <div class="nav-title">{{mOptions.title}}</div>
      <draggable v-model="mValue">
        <slot></slot> 
        <div
          v-for="item in mValue"
          :key="item.id"
          class="nav-item"
        >
          <component
          v-for="s in schema.fields"
          :key="s.id"
          :is="typeToComponent[s.type]"
          v-model="item[s.key]"
          v-bind="s"
        >
        </component>
          <div
            class="nav-delete"
            @click="delItem"
          >x</div>
        </div>
      </draggable>

      <div
        class="nav-add"
        @click="addItem"
      >新增数据</div>
    </div>
  </config-wrap>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import Draggable from "vuedraggable";
import typeToComponent from "@/config/schema-template";

export default {
  name: "SchemaList",

  components: {
    Draggable,
  },

  mixins: [schemaMixin],

  props: {
    schema: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      typeToComponent,
    };
  },

  methods: {
    addItem() {
      if (this.mValue.length >= this.mOptions?.max) {
        this.$notify({
          title: "无法新增",
          message: `最多只能添加${this.mOptions?.max}条数据`,
          type: "warning",
        });
        return;
      }

      this.mValue.push({
        id: this.$getRandomCode(6),
      });
    },

    delItem(i) {
      this.mValue.splice(i, 1);
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep .config-item {
  margin-bottom: 10px !important;
}
</style>