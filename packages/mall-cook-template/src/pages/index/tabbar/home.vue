<!--
 * @Description: 自定义渲染页面
 * @Autor: WangYuan
 * @Date: 2022-01-19 16:12:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 17:15:31
-->
<template>
  <global-tab-page>
    <!-- 自定义首页物料渲染 -->
    <template v-if="page">
      <RenderWidget
        v-for="item in page.componentList"
        :key="item.id"
        :item="item"
      ></RenderWidget>
    </template>

    <!-- loading -->
    <full-loading :show="loading" bgColor="#FFFFFF"></full-loading>
  </global-tab-page>
</template>

<script>
import RenderWidget from "@/components/RenderWidget";
import FullLoading from "@/components/full-loading.vue";
import { mapMutations, mapGetters } from "vuex";

// #ifdef H5
console.log("H5 环境");
// import { parseQueryString } from "kayran";
// let { projectId } = parseQueryString();
let projectId = "618dc4ff48f2514904ebd07f";
// #endif

// #ifdef MP
console.log("小程序 环境");
let projectId = "61b9997d03c79373691b874d";
// #endif

export default {
  name: "home",

  components: {
    RenderWidget,
    FullLoading,
  },

  onLoad() {
    this.getProject();
  },

  data() {
    return {
      page: undefined,
      loading: true,
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    ...mapMutations(["setProject"]),

    // 获取商城数据
    getProject() {
      uni.request({
        url: "http://110.42.184.128:3000/project/getById",
        method: "POST",
        data: { id: projectId },
        success: (res) => {
          this.setProject(res.data.data);
          this.initPage();
        },
      });
    },

    // 初始化页面
    initPage() {
      this.page = this.project.pages.find((page) => page.home);

      // #ifdef H5
      document.title = this.page.name;
      // #endif

      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>