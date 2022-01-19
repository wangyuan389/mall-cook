<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-18 17:16:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-19 17:11:48
-->
<template>
  <div class="index">
    <tab-bar v-if="inited" />
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "index",

  components: {
    TabBar,
  },

  created() {
    // this.getProject();
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

<style lang="scss" scoped>
.index {
  // position: relative;
  // height: 100%;
}
</style>