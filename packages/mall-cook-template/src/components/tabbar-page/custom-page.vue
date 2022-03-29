<!--
 * @Description: 自定义渲染页面
 * @Autor: WangYuan
 * @Date: 2022-01-19 16:12:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-22 11:51:22
-->
<template>
  <global-tab-page>
    <template v-if="page">
      <render-widget
        v-for="item in page.componentList"
        :key="item.id"
        :item="item"
      ></render-widget>
    </template>
  </global-tab-page>
</template>

<script>
import RenderWidget from "@/components/render-widget";
import { mapGetters } from "vuex";

export default {
  name: "custom",

  inject: ["tabbar"],

  components: {
    RenderWidget,
  },

  created() {
    this.initPage();
  },

  data() {
    return {
      page: undefined,
      pageId: undefined,
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    // 初始化页面
    initPage() {
      this.page = this.project.pages.find(
        (page) => page.id == this.tabbar.tab.jump.id
      );

      // 设置页面标题
      // #ifdef H5
      document.title = this.page.name;
      // #endif
    },
  },
};
</script>

<style lang="scss" scoped>
.custom {
}
</style>