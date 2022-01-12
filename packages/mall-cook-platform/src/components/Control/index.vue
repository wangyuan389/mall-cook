<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 19:47:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-11 20:08:18
-->
<template>
  <div class="control">
    <PreviewCtn>
      <ControlPage />
    </PreviewCtn>
  </div>
</template>

<script>
import PreviewCtn from "@/components/Container/PreviewCtn";
import ControlPage from "./ControlPage.vue";
export default {
  name: "control",

  components: {
    PreviewCtn,
    ControlPage,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.control {
  position: absolute;
  left: 176px; /*no*/
  right: 360px; /*no*/
  height: calc(100% - 56px); /*no*/
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>