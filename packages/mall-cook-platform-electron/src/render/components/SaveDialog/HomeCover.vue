<!--
 * @Description: 首页封面
 * @Autor: WangYuan
 * @Date: 2021-09-27 17:45:38
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 18:29:56
-->
<template>
  <el-dialog
    :visible.sync="show"
    :append-to-body="true"
    :show-close="false"
    :close-on-click-modal="false"
    top="50px"
    width="415px"
    class="flex-center"
  >
    <div v-loading="show" id="cover" class="cover">
      <iframe
        v-if="show"
        ref="iframe"
        class="w-100"
        frameborder="no"
        :style="{ height: '667px' }"
        :src="iframeUrl"
        @load="setWidgetsMessage"
      ></iframe>
    </div>
  </el-dialog>
</template>

<script>
import RealTimeView from "@render/components/TopBar/RealTimeView.vue";
import { uploadCover } from "@render/api/project";
import global from "@render/config/global";
import { mapGetters } from "vuex";

export default {
  name: "HomeCover",

  components: {
    RealTimeView,
  },

  mounted() {
    this.getMessage();
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    iframeUrl() {
      return `${global.viewUrl}pages/build/build?operate=build`;
    },

    // 首页配置数据
    home() {
      return this.project.pages.find((page) => page.home);
    },
  },

  methods: {
    /**
     * 初始化
     * 1. 初始化iframe页面
     * 2. 等待2s，通知iframe调用方法生成封面base64
     *
     */
    async init() {
      await this.open();

      this.createCover();
    },

    // 打开弹窗，并延迟2s进行后续操作（2s用于渲染，uni-app图片渲染较慢）
    open() {
      return new Promise((resolve, reject) => {
        this.show = true;
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },

    // 发送物料列表用于渲染
    setWidgetsMessage() {
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "list",
          params: this.home.componentList,
        },
        "*"
      );
    },

    // 发送信息，通知iframe调用方法生成封面base64
    createCover() {
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "cover",
        },
        "*"
      );
    },

    // 监听iframe，生成封面base64后会通知回调
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        let { type, params } = e.data;
        if (type == "getCoverBase64") {
          self.upload(params.base64);
        }
      });
    },

    // 上传封面
    upload(base64) {
      return new Promise((resolve, reject) => {
        let coverFile = this.getFile(base64);
        let formData = new FormData();
        formData.append("domainId", 3);
        formData.append("dir", "img");
        formData.append("file", coverFile);
        // 图片上传服务器
        uploadCover(formData)
          .then((res) => {
            if ((res.errorCode = "00000")) {
              console.log("图片上传服务器成功");
              this.$emit("complete", {
                status: 1,
                data: res.data,
              });
            }
          })
          .finally(() => (this.show = false));
      });
    },

    // base64整合文件
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
