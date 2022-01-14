<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-13 15:31:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-14 11:35:03
-->
<template>
  <div class="control">
    <control-widgets />

    <control-panel />

    <contril-config />
  </div>
</template>

<script>
import ControlWidgets from "./ControlWidgets.vue";
import ControlPanel from "./ControlPanel.vue";
import ContrilConfig from "./ContrilConfig.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "control",

  components: { ControlWidgets, ControlPanel, ContrilConfig },

  provide() {
    return {
      control: this,
    };
  },

  data() {
    return {
      curComponent: null,
      dragstatus: false,
    };
  },

  computed: {
    ...mapGetters(["curPage"])
  },
};
</script>

<style lang='scss'>
.control {
  position: relative;
  height: calc(100% - 56px); /*no*/
  overflow: hidden;
}
</style>