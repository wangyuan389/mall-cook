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

        <el-button size="small ml10" @click="viewQr">商城二维码</el-button>

        <el-button size="small ml10" @click="show = true">实时预览</el-button>

        <el-button size="small f-white bg-theme" @click="openSave"
          >保存</el-button
        >
        
        <el-button size="small ml10" @click="onLogout">退出</el-button>
      </div>
    </div>

    <real-timeView :show.sync="show"></real-timeView>

    <save-dialog ref="save"></save-dialog>

    <qr-dialog ref="qr"></qr-dialog>
  </div>
</template>

<script>
import RealTimeView from "./RealTimeView.vue";
import SaveDialog from "@/components/SaveDialog";
import QrDialog from "@/components/QrDialog";
import jrQrcode from "jr-qrcode";
import { mapGetters, mapMutations } from "vuex";
import { editProject } from "@/api/project";

export default {
  components: {
    RealTimeView,
    SaveDialog,
    QrDialog,
  },

  provide() {
    return {
      topBar: this,
    };
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

    openSave(view = false) {
      this.$refs.save.open(view);
    },

    toSchema() {
      let { href } = this.$router.resolve({
        path: "/schema",
      });
      window.open(href);
    },

    viewQr() {
      this.$confirm("如不更新，则预览为上次保存的项目数据?", "是否更新保存", {
        confirmButtonText: "更新保存",
        cancelButtonText: "不更新",
        type: "warning",
      }).then(() => {
        this.openSave(true);
      }).catch(()=>{
        this.openQr()
      })
    },

    openQr() {
      this.$refs.qr.open();
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
