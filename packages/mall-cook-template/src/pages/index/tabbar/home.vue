<!--
 * @Description: 自定义渲染页面
 * @Autor: WangYuan
 * @Date: 2022-01-19 16:12:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-09 15:00:57
-->
<template>
  <global-tab-page>
    <!-- 自定义首页物料渲染 -->
    <template v-if="page">
      <render-widget
        v-for="item in page.componentList"
        :key="item.id"
        :item="item"
      ></render-widget>
    </template>

    <!-- loading -->
    <full-loading :show="loading" bgColor="#FFFFFF"></full-loading>
  </global-tab-page>
</template>

<script>
import RenderWidget from "@/components/render-widget";
import FullLoading from "@/components/full-loading.vue";
import { mapMutations, mapGetters } from "vuex";
import { getProjectDetail } from "@/api/index";

// #ifdef H5
console.log("H5 环境");
import { parseQueryString } from "kayran";
let { operate, projectId } = parseQueryString();

// 默认预览操作
operate = operate || "view";
// #endif

// #ifdef MP
// 展示默认项目

// let projectId = "618dc4ff48f2514904ebd07f";
let projectId = "62009795c163ee452d3b35b1";
// #endif

export default {
  name: "home",

  components: {
    RenderWidget,
    FullLoading,
  },

  // 进入项目初始化
  onLoad(query) {
    console.log(".....onLoad");

    // #ifdef H5
    this.initH5();
    // #endif

    // #ifdef MP
    let { id } = this.formatQuery(decodeURIComponent(query.scene));
    if (id) {
      projectId = id;
    } else {
      // 默认项目搭建用于小程序审核
      this.enterAuth();
    }

    this.initMP();
    // #endif
  },

  onShow() {
    // 每次进入页面，返回顶部
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    page() {
      return this.project?.pages?.find((page) => page.home);
    },
  },

  methods: {
    ...mapMutations(["setProject", "enterAuth"]),

    // 初始化 - H5环境
    initH5() {
      switch (operate) {
        case "realTime":
          this.listenerMessage();
          break;
        case "view":
          this.initProject();
          break;
      }
    },

    // 初始化 - 小程序环境
    initMP() {
      this.initProject();
    },

    // 获取商城数据，初始化商城
    async initProject() {
      if (!projectId) return;

      let { data } = await getProjectDetail({ id: projectId });

      this.formatProjectData(data);

      this.setProject(data);

      this.loadingComplete();
    },

    // 处理项目数据格式（老数据结构，不满足小程序版本）
    formatProjectData(project) {
      // 处理tabbar列表
      const list = project?.config?.navigation?.list || [];

      list.forEach((item, index) => {
        if (index == 0) item.tabId = "home";
        if (index > 0 && item?.jump?.type == "fixed") item.tabId = item.jump.id;

        const fonts = item.icon.split("-");
        if (fonts.length == 2) item.icon = fonts[1];
      });
    },

    // iframe通信，接收项目数据实时预览
    listenerMessage() {
      console.log("iframe通信，接收项目数据实时预览");

      window.addEventListener("message", (e) => {
        if (e.data) {
          // 如果本地启动admin 和 h5 ，iframe传输会多传输一次webpack警告
          if (e.data.id) {
            this.setProject(e.data);
          }
        }
      });
    },

    // 格式化query
    formatQuery(query) {
      query = query.split("&");
      return query.reduce((params, item) => {
        let q = item.split("=");
        if (q.length === 2) params[q[0]] = q[1];
        return params;
      }, {});
    },

    // 加载完成，取消loading  小程序渲染卡顿，多加载一会，优化体验效果
    loadingComplete() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>