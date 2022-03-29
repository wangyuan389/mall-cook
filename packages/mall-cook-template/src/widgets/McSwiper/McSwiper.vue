<!--
 * @Description: 轮播组件
 * @Autor: WangYuan
 * @Date: 2021-06-01 15:04:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-28 11:30:35
-->
<template>
  <div :style="[$wrapStyle(styles),$cmpStyle(styles)]">
    <baseSwiper
      :list="list"
      :crown="mAttrs.crown"
      :shadow="true"
      :loop="mAttrs.loop"
      :autoplay="mAttrs.autoplay"
      :imgWidth="mAttrs.imgWidth"
      :height="130"
      :previousMargin="mAttrs.previousMargin"
      :nextMargin="mAttrs.nextMargin"
      @clickItem='clickItem'
    />
  </div>
</template>

<script>
import baseSwiper from "./baseSwiper";

export default {
  name: "McSwiper",

  components: {
    baseSwiper,
  },

  props: {
    styles: {
      type: Object,
      default: () => {},
    },
    attrs: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      show: true,
      mAttrs: {},
      modelObj: {
        basis: {
          crown: false,
          imgWidth: 100,
          previousMargin: 0,
          nextMargin: 0,
        },
        card: {
          crown: true,
          imgWidth: 100,
          previousMargin: 100,
          nextMargin: 100,
        },
        line: {
          crown: false,
          imgWidth: 97,
          previousMargin: 20,
          nextMargin: 0,
        },
      },
    };
  },

  watch: {
    attrs: {
      handler(newValue, oldValue) {
        this.mAttrs = {
          ...this.attrs,
          ...this.modelObj[newValue.model],
        };
        this.againLoad();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    // 重新加载
    againLoad() {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 0);
    },

    // 单项点击
    clickItem(item) {
      this.$jump(item.jump);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  z-index: 0;
}
</style>