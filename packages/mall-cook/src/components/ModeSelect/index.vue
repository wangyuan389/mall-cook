<!--
 * @Description: 模板选择容器组件
 * @Autor: WangYuan
 * @Date: 2021-05-31 11:54:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:54:04
-->
<template>
  <div
    class="mode-select"
    :class="[direction=='column' ? 'flex-column' : '']"
  >
    <!-- label -->
    <div class="mode-select-label">
      {{mTooltip}}
    </div>

    <!-- 内容插槽 -->
    <div class="flex flex-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "mode-select",

  provide() {
    return {
      mode: this,
    };
  },

  props: {
    value: {
      default: 0,
    },
    direction: {
      default: "row",
    },
  },

  mounted() {
    let list = this.$slots.default.filter(
      (vnode) =>
        vnode.tag &&
        vnode.componentOptions &&
        vnode.componentOptions.tag == "mode-select-item"
    );

    list.map((item) => {
      let data = item.componentOptions.propsData;
      this.attrObj[data.value] = data.label;
    });

    this.mTooltip = this.attrObj[this.value];
  },

  data() {
    return {
      mValue: "",
      mTooltip: "",
      attrObj: [],
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },
    mValue: {
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
        this.$emit("change", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.mode-select {
  display: flex;
  justify-content: space-between;

  .mode-select-label {
    font-size: 14px; /*no*/
    line-height: 32px; /*no*/
  }
}
</style>