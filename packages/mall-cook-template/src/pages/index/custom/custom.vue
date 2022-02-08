<!--
 * @Description: 自定义渲染页面
 * @Autor: WangYuan
 * @Date: 2022-01-19 16:12:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-08 20:52:00
-->
<template>
  <view class="custom">
    <template v-if="page">
      <render-widget
        v-for="item in page.componentList"
        :key="item.id"
        :item="item"
      ></render-widget>
    </template>
  </view>
</template>

<script>
import RenderWidget from "@/components/render-widget";
import { mapGetters } from "vuex";

export default {
  name: "custom",

  components: {
    RenderWidget,
  },

  onLoad(option) {
    console.log("接收参数：" + option.pageId);
    this.pageId = option.pageId;
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
      this.page = this.pageId
        ? this.project.pages.find((page) => page.id == this.pageId) // 根据pageId查询配置数据，渲染页面
        : null; // 若未传递pageId，默认渲染首页

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