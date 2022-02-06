<!--
 * @Description: 自定义渲染页面
 * @Autor: WangYuan
 * @Date: 2022-01-19 16:12:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-28 17:05:38
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
    <full-loading v-else :show="true" bgColor="#FFFFFF"></full-loading>
  </global-tab-page>
</template>

<script>
import RenderWidget from "@/components/render-widget";
import FullLoading from "@/components/full-loading.vue";
import { mapMutations, mapGetters } from "vuex";
import { getProjectDetail } from "@/api/index";

export default {
  name: "home",

  components: {
    RenderWidget,
    FullLoading,
  },

  computed: {
    ...mapGetters(["project"]),

    page() {
      console.log("page....");
      console.log(this.project?.pages?.find((page) => page.home));

      return this.project?.pages?.find((page) => page.home);
    },

    complete() {
      if (this.page) {
        setTimeout(() => {
          this.show = true;
        }, 1000);
      }

      return false;
    },
  },
};
</script>