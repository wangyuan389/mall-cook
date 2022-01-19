<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-19 15:22:12
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-19 16:06:28
-->
<template>
  <ul class="tabbar">
    <li
      class="tabbar-item"
      v-for="(item, index) in navigation.list"
      :key="index"
    >
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "tabbar",

  created() {
    this.init();
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters(["project"]),

    // 导航配置
    navigation() {
      return this.project?.config?.navigation || {};
    },
  },

  methods: {
    init() {
      console.log("init");
      this.watchRouter(this.$route);

      // 开启路由监听，判断跳转页是否显示导航栏
      this.$watch("$route", (route) => this.watchRouter(route));
    },

    watchRouter(route) {
      console.log("监听导航栏.....");
      console.log(route);
      console.log(this.navigation);

      // let tabId;
      // let tabIdList = this.navigation.list.map((item) => item.jump.id);

      // if (route.name == "custom") {
      //   // 当前页为自定义页, pageId 为 tabId （若pageId为空，则判定为首页）
      //   tabId = route.query.pageId;
      //   tabId = tabId || this.project.pages.find((page) => page.home).id;
      // } else {
      //   // 当前页面为固定页, 路由定义name 为 tabId
      //   tabId = route.name;
      // }
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
}
</style>