<!--
 * @Description: 首页封面
 * @Autor: WangYuan
 * @Date: 2021-09-27 17:45:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-30 15:08:53
-->
<template>
  <el-dialog
    :visible.sync="show"
    :append-to-body='true'
    :show-close='false'
    :close-on-click-modal='false'
    top='50px'
    width="415px"
    class="flex-center"
  >
    <div v-loading="show">
      <div
        id='cover'
        class="cover"
      >
        <component
          v-for="item in home.componentList"
          :is='item.component'
          v-bind="item.attr"
          :config='item'
          :style='$getWrapStyle(item.style)'
        ></component>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import domtoimage from "dom-to-image";
import { uploadCover } from "@/api/project";
import { mapGetters } from "vuex";

export default {
  name: "HomeCover",

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),
    home() {
      return this.project.pages.find((page) => page.home);
    },
  },

  methods: {
    open() {
      this.show = true;
    },

    createCover() {
      return new Promise((resolve, reject) => {
        this.show = true;

        setTimeout(() => {
          // 页面组件为空
          if (!this.home.componentList.length) {
            reject();
            return;
          }

          // 生成封面
          let node = document.getElementById("cover");
          domtoimage.toPng(node).then(
            (base64) => {
              // resolve(base64)

              return this.upload(base64);
            },
            () => {
              reject();
            }
          );
        }, 300);
      }).finally(() => {
        this.show = false;
      });
    },

    upload(base64) {
      return new Promise((resolve, reject) => {
        let coverFile = this.getFile(base64);
        console.log(coverFile);
        let formData = new FormData();
        formData.append("domainId", 3);
        formData.append("dir", "img");
        formData.append("file", coverFile);

        // 图片上传服务器
        uploadCover(formData).then((res) => {
          if ((res.errorCode = "00000")) {
            resolve(res.data);
          }
        });
      });
    },

    getFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cover {
  width: 375px;
  min-height: 667px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>