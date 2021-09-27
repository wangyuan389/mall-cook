<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 09:11:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:08:44
-->
<template>
  <div class="nav">
    <div class="nav-title">{{mOptions.title}}</div>
    <draggable v-model="mValue">
      <div
        v-for="item in mValue"
        :key="item.id"
        class="nav-item"
      >
        <component
          v-for="s in schema.fields"
          :key="s.id"
          :is="mode.typeToComponent(s.type)"
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
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import Draggable from "vuedraggable";

export default {
  name: "SchemaList",

  components: {
    Draggable,
  },

  mixins: [schemaMixin],

  inject: ["mode"],

  props: {
    schema: {
      type: Object,
      default: () => {},
    },
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