<!--
 * @Description: PC头部菜单
 * @Autor: WangYuan
 * @Date: 2021-05-19 14:07:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 16:40:32
-->
<template>
  <div>
    <div class="topBar">
      <!-- 左侧内容 -->
      <span
        class="f14 pointer"
        @click="back"
      >切换商城</span>

      <!-- 右侧内容 -->
      <div>
        <el-button
          size='small mr2'
          @click="toSchema"
        >schema 生成器</el-button>
        <el-button
          size='small mr2'
          @click="show = true"
        >实时预览</el-button>
        <el-button
          size='small f-white bg-theme'
          @click="openSave"
        >保存</el-button>
      </div>
    </div>

    <real-timeView :show.sync="show"></real-timeView>

    <save-dialog ref='save'></save-dialog>
  </div>
</template>

<script>
import RealTimeView from "./RealTimeView.vue";
import SaveDialog from "@/components/SaveDialog";
import { mapGetters } from "vuex";
import { editProject } from "@/api/project";

export default {
  components: {
    RealTimeView,
    SaveDialog,
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  methods: {
    // 返回商城管理
    back() {
      this.$router.push({ name: "managet" });
    },

    openSave() {
      this.$refs.save.open();
    },

    toSchema() {
      let { href } = this.$router.resolve({
        path: "/schema",
      });
      window.open(href);
    },

    // 保存
    async save() {
      let data = {
        id: this.project.id,
        userId: this.userInfo.userId,
        name: this.project.name,
        richText: JSON.stringify(this.project),
      };

      let { status } = await editProject(data);

      if (status == "10000")
        this.$notify({
          title: "成功",
          message: "项目保存成功",
          type: "success",
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}
</style>