<!--
 * @Description: 处理初始化逻辑
 * @Autor: WangYuan
 * @Date: 2022-01-11 14:40:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-28 16:25:37
-->

<script>
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
console.log("小程序 环境");
let projectId = "618dc4ff48f2514904ebd07f";

// let projectId = "61b9997d03c79373691b874d";
// #endif

export default {
  created() {
    this.getSystemInfo();

    // #ifdef H5
    this.initH5();
    // #endif

    // #ifdef MP
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
            this.showRouter = true;
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
  },
};
</script>

<style lang="scss">
@import "./static/font/iconfont.css";
</style>
