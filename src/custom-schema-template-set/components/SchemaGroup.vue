<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-12 10:15:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 14:13:11
-->
<template>
  <div class="SchemaGroup">

    <!-- add -->
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="$refs['dialog'].open()"
      >
        新增（对象 / 数组）
      </el-button>
    </div>

    <!-- tabs -->
    <el-tabs
      v-model="schemasValue"
      type="card"
    >
      <el-tab-pane
        v-for="(item, index) in schemas"
        :key="item.key"
        :name="item.key"
      >
        <div
          slot="label"
          class="flex-center"
        >
          <span>{{getTabLabel(item)}}</span>
          <i
            class="el-icon-edit-outline mr5"
            @click="$refs['dialog'].open(item)"
          ></i>
          <i
            class="el-icon-circle-close"
            @click="removeTab(item.key)"
          ></i>
        </div>
        <schema-edit v-model="item.fields"></schema-edit>
      </el-tab-pane>
    </el-tabs>

    <!-- dialog -->
    <schema-group-dialog
      ref='dialog'
      @submit="submitTab"
    />
  </div>
</template>

<script>
import SchemaEdit from "./SchemaEdit.vue";
import SchemaGroupDialog from "./SchemaGroupDialog";

export default {
  provide() {
    return {
      typeCfg: this.typeCfg,
    };
  },

  components: {
    SchemaEdit,
    SchemaGroupDialog,
  },

  data() {
    return {
      schemasValue: "",
      schemas: [],
      typeCfg: {
        object: "对象",
        array: "数组",
      },
    };
  },

  methods: {
    // 提交弹窗
    submitTab(info) {
      console.log(info);
      let { type, form } = info;

      if (type == "add") {
        this.schemas.push(form);
      } else {
        let index = this.schemas.reduce((pre, cur, i) => {
          if (cur.key == form.key) return (pre = i);
        }, 0);
        this.schemas.splice(index, 1, form);
      }

      this.schemasValue = form.key;
    },

    // 删除弹窗
    removeTab(key) {
      console.log("removeTab:" + key);
      let tabs = this.schemas;
      let activeKey = this.schemasValue;
      if (activeKey === key) {
        tabs.forEach((tab, index) => {
          if (tab.key === key) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeKey = nextTab.key;
            }
          }
        });
      }

      this.schemasValue = activeKey;
      this.schemas = tabs.filter((tab) => tab.key !== key);
    },

    getTabLabel(target) {
      return `${target.name}（${this.typeCfg[target.type]}）`;
    },
  },
};
</script>