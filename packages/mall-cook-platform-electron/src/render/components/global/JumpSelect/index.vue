<!--
 * @Description: 页面跳转选择组件
 * @Autor: WangYuan
 * @Date: 2021-08-12 11:06:37
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-01 20:03:27
-->

<template>
  <div class="flex col-center h25">
    <!-- <div class="mr15">链接</div> -->
    <template>
      <div
        v-if="!mValue.id"
        class="f12 f-theme pointer"
        @click="open"
      >
        选择跳转到的页面
      </div>

      <template v-else>
        <el-tag size='small'>{{pageName}}</el-tag>
        <span class="ml5 f12 f-theme pointer" @click="open">修改</span>
      </template>
    </template>

    <JumpDialog ref='jump'></JumpDialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "JumpSelect",
  provide() {
    return {
      value: this.value,
    };
  },
  props: {
    value: {
      default: () => ({}),
    },
  },
  data() {
    return {
      mValue: null,
    };
  },
  computed: {
    ...mapGetters(["project","fixedPages"]),
    pageName() {
      let page = null;
      switch (this.mValue.type) {
        case "fixed":
          page = this.fixedPages.find(
            (page) => page.id == this.mValue.id
          );
          break;
        case "custom":
          page = this.project.pages.find((page) => page.id == this.mValue.id);
          break;
        case "link":
          page = { name: "外链h5" };
          break;
        default:
          break;
      }
      return page.name;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
        console.log('mValue');
        console.log(this.mValue);
        
        
      },
    },
    mValue: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    open() {
      this.$refs.jump.open();
    },

    getName() {
      console.log("触发getName");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
