<template>
  <el-dialog title="二维码预览" :visible.sync="show" width="12%">
    <div class="flex-column row-center">
      <img class="mb20" :src="getQr()" />
      <span>请扫码预览商城</span>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    open() {
      this.show = true;
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none !important;
}
</style>