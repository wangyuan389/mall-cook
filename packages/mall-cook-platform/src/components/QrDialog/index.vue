<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-07 09:18:48
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-28 12:16:33
-->
<template>
  <el-dialog title="二维码预览" :visible.sync="show" width="30%">
    <ul class="flex row-around pt20">
      <li>
        <div class="flex-column row-center mb20">
          <img class="w200 h200 mb20" :src="getQr()" />
          <span class="lb-1 f-h5-grey">请扫码预览H5商城</span>
        </div>
      </li>
      <li>
        <div class="flex-column row-center">
          <img class="w200 h200 mb20" :src="WXCode" />
          <span class="lb-1 f-h5-grey">请扫码预览小程序商城</span>
        </div>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { createWXcode } from "@/api/project";
import global from "@/config/global";

export default {
  data() {
    return {
      show: false,
      WXCode: "",
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    open() {
      this.show = true;
      this.getWXQr();
    },

    getQr() {
      let url = `${global.viewUrl}pages/index/tabbar/home?id=${this.project.id}`;

      let options = {
        padding: 10, // 二维码四边空白（默认为10px）
        width: 160, // 二维码图片宽度（默认为256px）
        height: 160, // 二维码图片高度（默认为256px）
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: "#ffffff", // 二维码背景颜色（默认白色）
        foreground: "#000000", // 二维码颜色（默认黑色）
      };
      console.log("预览地址:" + url);
      return jrQrcode.getQrBase64(url, options);
    },

    async getWXQr() {
      let { data } = await createWXcode({ id: this.project.id });
      this.WXCode = data;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none !important;
}
</style>