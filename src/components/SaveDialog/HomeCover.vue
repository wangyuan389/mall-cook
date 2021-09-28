<!--
 * @Description: 首页封面
 * @Autor: WangYuan
 * @Date: 2021-09-27 17:45:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-28 16:46:53
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
            (base64Img) => {
              resolve(base64Img);
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
  },
};
</script>

<style lang="scss" scoped>
.cover {
  width: 375px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>