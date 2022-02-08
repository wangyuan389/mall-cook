<!--
 * @Description: 页面用于初始化
 * @Autor: WangYuan
 * @Date: 2022-02-08 18:01:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-08 20:35:04
-->
<template>
  <div class="index">
    <full-loading :show="true" bgColor="#FFFFFF"></full-loading>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getProjectDetail } from "@/api/index";
import FullLoading from "@/components/full-loading.vue";

// #ifdef H5
console.log("H5 环境");
import { parseQueryString } from "kayran";
let { operate, projectId } = parseQueryString();

// 默认预览操作
operate = operate || "view";

// #endif

// #ifdef MP

// 展示默认项目
let projectId = "61b9997d03c79373691b874d";

// #endif

export default {
  components: {
    FullLoading,
  },

  onLoad(query) {
    this.getSystemInfo();

    // #ifdef H5
    this.initH5();
    // #endif

    // #ifdef MP
    const scene = decodeURIComponent(query.scene);
    let { id } = this.formatParams(scene);
    if (id) projectId = id;

    this.initMP();
    // #endif
  },

  methods: {
    ...mapMutations(["setProject", "setStatusHeight"]),

    // 初始化 - H5环境
    initH5() {
      switch (operate) {
        case "realTime":
          console.log("iframe通信");

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

      this.$jump({ name: "home" });
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

    // 获取并设置状态栏高度
    getSystemInfo() {
      let that = this;

      uni.getSystemInfo({
        success: (res) => {
          wx.getSystemInfo({
            success: function (res) {
              let height = res.statusBarHeight;
              that.setStatusHeight(height);
            },
          });
        },
      });
    },

    formatParams(query) {
      query = query.split("&");
      return query.reduce((params, item) => {
        let q = item.split("=");
        if (q.length === 2) params[q[0]] = q[1];
        return params;
      }, {});
    },
  },
};
</script>

<style lang="scss">
</style>
