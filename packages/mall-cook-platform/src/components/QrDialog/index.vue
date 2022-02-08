<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-07 09:18:48
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-08 17:54:24
-->
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
import request from "@/utils/request";
import axios from "axios";

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
      this.getWXQr();
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

    async getWXQr() {
      // let { access_token } = await request({
      //   url: "source/cross",
      //   method: "POST",
      //   data: {
      //     url: "https://api.weixin.qq.com/cgi-bin/token",
      //     method: "get",
      //     params: {
      //       grant_type: "client_credential",
      //       appid: "wxf329e23267085bd9",
      //       secret: "b24cbf018069f2a344ee31400f55e3cf",
      //     },
      //   },
      // });

      await request({
        url: "source/cross",
        method: "POST",
        data: {
          url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=53_CKLnVuvBbbHq0ExaSBzmXjsFzBVuF8znAxipJM2fS2Q_5SoLuqrc8LrtJVTmxRPj2UcakIZ2OdTSfpc6ic6Zj2VoaanHpOILgB1xBoxPRKn-1TINvHad1EGRRv6kkjaB13Nrmti1U_MvdhoREJDbADAWBV",
          method: "post",
          params: {
            page: "pages/index/tabbar/home",
            scene: "id=618dc4ff48f2514904ebd07f",
            env_version: "develop",
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none !important;
}
</style>