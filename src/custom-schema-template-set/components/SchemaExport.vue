<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-18 10:07:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 11:42:49
-->
<template>
  <el-dialog
    title="导出 Schema"
    :visible.sync="show"
    width="30%"
  >
    <span>这是一段信息</span>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="show = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      schema: {},
      initializing: {},
    };
  },

  inject: ["content"],

  methods: {
    open() {
      this.show = true;
      this.init();
    },

    init() {
      console.log(this.content.model.componentList);
      this.content.model.componentList.map((cmp) => {
        this.initSchema(cmp, this.schema);
        this.initData(cmp, this.initializing);
      });
      console.log(this.schema);
      console.log(this.initializing);
    },

    initSchema(config, schema) {
      let { key, label, type, child } = config;
      let target = (schema[key] = { label, type });

      if (child) child.map((c) => this.initSchema(c, (target.child = {})));
    },

    initData(config, initializing) {
      let { key, label, type, child, fields } = config;
      if (type == "object") {
        child.map((c) => this.initData(c, (initializing[key] = {})));
      } else if (type == "array") {
        child.map((c) => this.initData(c, (initializing[key] = [])));
      } else {
        initializing[key] = fields.value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>