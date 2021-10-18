<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-18 10:07:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 15:17:53
-->
<template>
  <el-dialog
    title="导出"
    :visible.sync="show"
    width="40%"
  >
    <div>
      <el-radio-group
        v-model="tab"
        class="mb20"
        fill='#155bd4'
      >
        <el-radio-button label="schema">schema</el-radio-button>
        <el-radio-button label="initializing">initializing</el-radio-button>
      </el-radio-group>
      <template v-if="tab=='schema'">
        <h3 class="mb20 f13 f-grey">组件配置项schema,放在组件包下 schema.json 配置文件中,若不满足可手动修改</h3>
        <json-viewer
          v-model="schema"
          :expand-depth="6"
          :copyable="{copyText: '复制JSON', copiedText: '已复制', timeout: 1000}"
          boxed
        ></json-viewer>
      </template>
      <template v-else>
        <h3 class="mb20 f13 f-grey">组件初始数据，放在组件包下 initializing.json 配置文件中，若不满足可手动修改</h3>
        <json-viewer
          v-model="initializing"
          :expand-depth="6"
          :copyable="{copyText: '复制JSON', copiedText: '已复制', timeout: 1000}"
          boxed
        ></json-viewer>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import JsonViewer from "vue-json-viewer";

export default {
  components: {
    JsonViewer,
  },

  data() {
    return {
      tab: "schema",
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
        initializing[key] = [];
      } else {
        initializing[key] = fields.value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .jv-button {
  margin-top: 10px;
  color: $color-theme !important;
}

textarea {
  display: inline-block;
  width: 100%;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  border: solid 1px #c0c0c0;
}
</style>