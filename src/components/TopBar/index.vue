<!--
 * @Description: PC头部菜单
 * @Autor: WangYuan
 * @Date: 2021-05-19 14:07:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-15 17:09:06
-->
<template>
  <div>
    <div class="topBar">
      <!-- 左侧内容 -->
      <span class="f14 pointer" @click="back">切换商城</span>

      <!-- 右侧内容 -->
      <div>
        <git-control />
        <el-button size="small" @click="toSchema">schema 生成器</el-button>

        <el-popover placement="bottom" width="204" trigger="click">
          <template>
            <img :src="getQr()" />
            <span>请先保存然后扫二维码预览</span>
          </template>
          <el-button size="small ml10" slot="reference">商城二维码</el-button>
        </el-popover>

        <el-button size="small ml10" @click="show = true">实时预览</el-button>
        <el-button size="small f-white bg-theme" @click="openSave"
          >保存</el-button
        >
        <el-button size="small ml10" @click="onLogout">退出</el-button>
      </div>
    </div>

    <real-timeView :show.sync="show"></real-timeView>

    <save-dialog ref="save"></save-dialog>
  </div>
</template>

<script>
import RealTimeView from "./RealTimeView.vue";
import SaveDialog from "@/components/SaveDialog";
import jrQrcode from "jr-qrcode";
import { mapGetters, mapMutations } from "vuex";
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
    ...mapMutations(["logout"]),
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

    getQr() {
      let url = `${process.env.VUE_APP_VIEW_API}custom?projectId=${this.project.id}`;

      let options = {
        padding: 0, // 二维码四边空白（默认为10px）
        width: 180, // 二维码图片宽度（默认为256px）
        height: 180, // 二维码图片高度（默认为256px）
        correctLevel: QRErrorCorrectLevel.H, // 二维码容错level（默认为高）
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: "#ffffff", // 二维码背景颜色（默认白色）
        foreground: "#000000", // 二维码颜色（默认黑色）
      };
      console.log("预览地址:" + url);
      return jrQrcode.getQrBase64(url, options);
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

    // 退出
    onLogout() {
      this.$confirm("是否确定退出平台?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.logout();
        this.$router.push({ name: "login" });
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
