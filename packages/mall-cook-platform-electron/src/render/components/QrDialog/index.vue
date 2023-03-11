<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-07 09:18:48
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-13 17:33:39
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
    <div class="mt40">
      <el-input placeholder="请输入内容" v-model="url">
        <template slot="append"
          ><el-button
            type="primary"
            icon="el-icon-link"
            @click="link"
          ></el-button
        ></template>
      </el-input>
      <h3 class="mt5 mb10 f12 f-h5-grey">H5商城链接，可跳转直接在浏览器查看</h3>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { createWXcode } from "@render/api/project";
import global from "@render/config/global";

export default {
  data() {
    return {
      show: false,
      WXCode: "",
      url: "",
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
      this.url = `${global.viewUrl}pages/index/tabbar/home?id=${this.project.id}`;

      let options = {
        padding: 10, // 二维码四边空白（默认为10px）
        width: 160, // 二维码图片宽度（默认为256px）
        height: 160, // 二维码图片高度（默认为256px）
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: "#ffffff", // 二维码背景颜色（默认白色）
        foreground: "#000000", // 二维码颜色（默认黑色）
      };
      console.log("预览地址:" + this.url);
      return jrQrcode.getQrBase64(this.url, options);
    },

    async getWXQr() {
      let { data } = await createWXcode({ id: this.project.id });
      this.WXCode = data;
    },

    link() {
      window.open(this.url);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none !important;
}
</style>