<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-19 15:22:12
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-28 16:22:36
-->
<template>
  <ul class="tabbar" :style="fixSafeArea">
    <li
      v-for="(item, index) in tabList"
      :key="index"
      class="tabbar-item"
      :class="[item.tabId == activeTabId ? 'tabbar-item-active' : '']"
      @click="toTab(item)"
    >
      <u-icon
        class="tabbar-item-icon"
        :name="item.icon"
        custom-prefix="icon"
      ></u-icon>
      <text>{{ item.text }}</text>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "tabbar",

  created() {
    this.matchTab();
  },

  data() {
    return {
      activeTabId: "home",
    };
  },

  computed: {
    ...mapGetters(["project", "systemInfo"]),

    // 兼容iphonex 12 13底部安全区域
    fixSafeArea() {
      const systemInfo = this.systemInfo;
      const safeH = systemInfo ? (systemInfo.windowHeight - systemInfo.safeArea.bottom) : 0
      if(safeH) {
        return `height: ${50 + safeH}px;padding-bottom: ${safeH}px;`
      } else {
        return "height: 50px;"
      }
    },

    // 导航配置
    navigation() {
      return this.project?.config?.navigation || {};
    },

    // 导航菜单列表
    tabList() {
      return this.project?.config?.navigation?.list || [];
    },
  },

  methods: {
    // 根据当前路由匹配tab
    matchTab() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      this.activeTabId = currentPage.route.split("/").pop();
    },

    // 切换tab
    toTab(item) {
      this.$jump({
        name: item.tabId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  z-index: 999;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.1);

  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    background-size: contain;
    font-size: 12px;
    color: #9b9b9b;

    .tabbar-item-icon {
      font-size: 26px;
      margin-bottom: 3px;
    }

    text {
      font-size: 10px;
    }
  }

  .tabbar-item-active {
    color: cornflowerblue !important;
  }
}
</style>