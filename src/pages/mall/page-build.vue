<!--
 * @Description: 页面构建
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:40:27
-->
<template>
  <div class="home">
    <main>

      <!-- 拖拽组件列表 -->
      <div class="mallCmps">
        <componentList :list='componentConfigts'></componentList>
      </div>

      <!-- 组件画布 -->
      <div class="preview-wrap">
        <PreviewCtn>
          <editor />
        </PreviewCtn>
      </div>

      <!-- 组件配置 -->
      <DecorateCtn
        v-if="curComponent"
        :title="curComponent.label"
      >
        <component
          :is='curComponentConfig'
          :config='curComponent'
        ></component>
      </DecorateCtn>

    </main>
  </div>
</template>

<script>
import PreviewCtn from "@/components/Container/PreviewCtn";
import DecorateCtn from "@/components/Container/DecorateCtn";
import Editor from "@/components/Editor";
import componentList from "@/components/ComponentList";
import componentConfigts from "@/custom-components/config.js";
import { mapGetters } from "vuex";

export default {
  components: {
    componentList,
    PreviewCtn,
    DecorateCtn,
    Editor,
  },

  data() {
    return {
      componentConfigts,
    };
  },

  computed: {
    ...mapGetters(["curComponent"]),
    curComponentConfig() {
      return this.curComponent.component + "Config";
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #f7f8fa;

  main {
    position: relative;
    height: calc(100% - 56px); /*no*/
    overflow: hidden;

    .mallCmps {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 176px; /*no*/
      overflow: hidden;
    }

    .preview-wrap {
      position: absolute;
      left: 176px; /*no*/
      right: 360px; /*no*/
      height: calc(100% - 56px); /*no*/
      overflow: auto;

      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
  }
}
</style>
