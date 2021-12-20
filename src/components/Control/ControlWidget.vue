<!--
 * @Description: 物料列表
 * @Autor: WangYuan
 * @Date: 2021-12-20 19:11:41
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 20:31:50
-->
<template>
  <draggable
    v-model="list"
    group="itxst"
    ghostClass="ghost"
    chosenClass="chosen"
    selector="selector"
    :animation="500"
    :sort="true"
    class="panel"
  >
    <component
      v-for="item in list"
      :key="item.id"
      :is="item.component"
      v-bind="item"
      @click.native="setItem(item)"
    ></component>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ControlWidget",

  components: {
    draggable,
  },

  props: {
    widgets: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      list: [],
    };
  },

  watch: {
    widgets: {
      handler(val) {
        this.list = val;
      },
      immediate: true,
      deep: true,
    },
    list: {
      handler(val) {
        this.$emit("update:widgets", val);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  min-height: 667px;
}
</style>