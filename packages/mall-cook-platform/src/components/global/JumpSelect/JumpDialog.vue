<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-12 17:23:08
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-31 20:12:08
-->
<template>
  <el-dialog
    title="请选择跳转页面"
    :visible.sync="show"
    width="30%"
  >
    <div class="tabs mb30">
      <div
        class="tab flex-center"
        :class="[value.type == tab.type?'tab-active':'']"
        v-for="(tab,i) in tabs"
        :key="i"
        @click="changeTab(tab.type)"
      >
        {{tab.label}}
      </div>
    </div>

    <!-- 微页面 -->
    <template v-if="value.type == 'fixed'">
      <el-select
        v-model="value.id"
        placeholder="请选择要跳转的微页面"
        size='mini'
        style="width:250px"
      >
        <el-option
          v-for="(page,i) in fixedPages"
          :key="i"
          :label="page.name"
          :value="page.id"
        >
        </el-option>
      </el-select>
    </template>

    <!-- 自定义页面 -->
    <template v-if="value.type == 'custom'">
      <el-select
        v-model="value.id"
        placeholder="请选择要跳转的自定义页面"
        size='mini'
        style="width:250px"
      >
        <el-option
          v-for="(page,i) in customPages"
          :key="i"
          :label="page.name"
          :value="page.id"
        >
        </el-option>
      </el-select>
    </template>

    <!-- 站外链接 -->
    <template v-if="value.type == 'link'">
      <el-input
        v-model="value.id"
        placeholder="请输入外部h5链接地址"
        size='mini'
        style="width:250px"
      ></el-input>
    </template>

  </el-dialog>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "JumpDialog",
  inject: ["value"],
  data() {
    return {
      show: false,
      tabs: [
        {
          label: "微页面",
          type: "fixed",
        },
        {
          label: "自定义页面",
          type: "custom",
        },
        {
          label: "站外链接",
          type: "link",
        },
        {
          label: "不跳转",
          type: undefined,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["project", "fixedPages"]),
    customPages() {
      return this.project.pages;
    },
  },
  methods: {
    open() {
      this.show = true;
    },

    changeTab(type) {
      this.$set(this.value, "type", type);
      this.$set(this.value, "id", "");
    },
    setPageId(id) {
      this.$set(this.value, "id", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;

  .tab {
    width: 100px;
    height: 30px;
    color: #979797;
    border: solid 1px #ebedf0;
    cursor: pointer;
  }

  .tab-active {
    color: $color-theme;
    border: solid 1px $color-theme;
    background: #e0edff;
  }
}
</style>