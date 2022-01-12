<!--
 * @Description: 页面构建
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-11 20:01:59
-->
<template>
  <div class="home">
    <main>
      <!-- 拖拽组件列表 -->
      <widget-list></widget-list>

      <!-- 组件画布 -->
      <control />

      <!-- 组件配置 -->
      <DecorateCtn v-if="curComponent" :title="curComponent.label">
        <custom-schema-template
          :schema="curSchema"
          v-model="curComponent"
        ></custom-schema-template>
      </DecorateCtn>

      <!-- 页面配置 -->
      <DecorateCtn v-else title="页面配置">
        <page-config></page-config>
      </DecorateCtn>
    </main>
  </div>
</template>

<script>
import DecorateCtn from "@/components/Container/DecorateCtn";
import Editor from "@/components/Editor";
import Control from "@/components/Control";
import WidgetList from "@/components/WidgetList";
import PageConfig from "@/components/PageConfig";
import { mapGetters } from "vuex";

export default {
  components: {
    WidgetList,
    DecorateCtn,
    PageConfig,
    Editor,
    Control,
  },

  computed: {
    ...mapGetters(["curComponent"]),
    curSchema() {
      return this.$fields[this.curComponent.component];
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #f7f8fa;

  main {
    position: relative;
    height: calc(100% - 56px); /*no*/
    overflow: hidden;
  }
}
</style>
