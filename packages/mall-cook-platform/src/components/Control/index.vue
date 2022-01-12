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
};
</script>

<style lang='scss'>
.control {
  position: relative;
  height: calc(100% - 56px); /*no*/
  overflow: hidden;
}
</style>