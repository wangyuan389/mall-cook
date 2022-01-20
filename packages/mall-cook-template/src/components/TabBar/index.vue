<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-19 15:22:12
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-20 17:20:26
-->
<template>
  <ul class="tabbar">
    <li
      class="tabbar-item"
      :class="[item.path == activeRoute ? 'tabbar-item-active' : '']"
      v-for="(item, index) in tabList"
      :key="index"
    >
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "tabbar",

  created() {
    this.init();
  },

  data() {
    return {
      activeRoute: "",
    };
  },

  computed: {
    ...mapGetters(["project"]),

    // 导航配置
    navigation() {
      return this.project?.config?.navigation || {};
    },

    // 导航菜单列表
    tabList() {
      const list = this.project?.config?.navigation?.list || [];
      return list.map((item, index) => {
        if (index == 0) item.path = "pages/index/home";
        if (index > 0 && item?.jump?.type == "fixed")
          item.path = `pages/index/${item.id}`;
        return item;
      });
    },
  },

  methods: {
    init() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      this.activeRoute = currentPage.route;
      console.log("init");
      console.log(currentPage.route);
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
  z-index: 998;
  background-color: rgb(255, 255, 255);

  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-size: contain;
    font-size: 10px;
    color: #9b9b9b;

    i {
      font-size: 20px;
      margin-bottom: 3px;
    }
  }

  .tabbar-item-active {
    color: cornflowerblue !important;
  }
}
</style>