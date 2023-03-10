<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-13 15:31:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-18 11:52:36
-->
<template>
  <div class="control">
    <control-widgets />

    <control-panel />

    <control-config />
  </div>
</template>

<script>
import ControlWidgets from "./ControlWidgets.vue";
import ControlPanel from "./ControlPanel.vue";
import ControlConfig from "./ControlConfig.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "control",

  components: {
    ControlWidgets,
    ControlPanel,
    ControlConfig,
  },

  provide() {
    return {
      control: this,
    };
  },

  data() {
    return {
      dragstatus: false,
      curWidget: null,
      dragWidget: null,
    };
  },

  computed: {
    ...mapGetters(["curPage"]),
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