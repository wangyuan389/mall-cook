<!--
 * @Description: 物料列表
 * @Autor: WangYuan
 * @Date: 2021-12-20 19:11:41
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-22 14:50:18
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
    <widget-shape v-for="item in list" :key="item.id" :widget="item">
      <component
        :is="item.component"
        v-bind="item"
      ></component>
    </widget-shape>
  </draggable>
</template>

<script>
export default {
  name: "ControlWidget",

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