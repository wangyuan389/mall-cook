<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-18 17:16:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-20 17:23:24
-->
<template>
  <div class="index">indexxxx</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

// #ifdef H5
console.log("H5 环境");

import { parseQueryString } from "kayran";
let { projectId } = parseQueryString();
// #endif

// #ifdef MP
console.log("小程序 环境");

let projectId = "61b9997d03c79373691b874d";
// #endif

export default {
  name: "index",

  created() {
    this.getProject();
  },

  computed: {
    ...mapGetters(["project"]),

    inited() {
      return this.project.id != undefined;
    },
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
          console.log("获取商城数据");
          console.log(res.data.data);
          this.setProject(res.data.data);
          this.routerHome()
        },
      });
    },

    routerHome() {
      console.log('页面跳转');
      
      uni.switchTab({
        url: "/pages/index/home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  // position: relative;
  // height: 100%;
}
</style>