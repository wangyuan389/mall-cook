<!--
 * @Description: 自定义渲染页面
 * @Autor: WangYuan
 * @Date: 2022-01-19 16:12:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-20 15:17:34
-->
<template>
  <main-page>
    <template v-if="page">
      <RenderWidget
        v-for="item in page.componentList"
        :key="item.id"
        :item="item"
      ></RenderWidget>
    </template>
  </main-page>
</template>

<script>
import MainPage from "@/components/MainPage";
import RenderWidget from "@/components/RenderWidget";
import { mapGetters } from "vuex";

export default {
  name: "home",

  components: {
    MainPage,
    RenderWidget,
  },

  onLoad() {
    this.initPage();
  },

  data() {
    return {
      page: undefined,
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    // 初始化页面
    initPage() {
      this.page = this.project.pages.find((page) => page.home);

      // 设置页面标题
      // #ifdef H5
      document.title = this.page.name;
      // #endif
    },
  },
};
</script>