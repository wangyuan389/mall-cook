<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 14:40:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-19 17:18:09
-->

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
        },
      });
    },
  },
};
</script>

<style>
/*每个页面公共css */
</style>
