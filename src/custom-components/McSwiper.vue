<!--
 * @Description: 轮播组件
 * @Autor: WangYuan
 * @Date: 2021-06-01 15:04:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 14:54:57
-->
<template>
  <ls-swiper
    v-if="show"
    v-bind="attr"
    :value='config.value'
    :loop='loop'
    :autoplay='autoplay'
    class="wrap"
    @clickItem='clickItem'
  ></ls-swiper>
</template>

<script>
import LsSwiper from "./component/LsSwiper";
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McSwiper",

  mixins: [componentMixin],

  components: {
    LsSwiper,
  },

  props: {
    model: {
      type: String,
      default: "basis",
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      show: true,
      modelObj: {
        basis: {
          center: true,
          crown: false,
          imgWidth: 100,
          imgHeight: 180,
          spaceBetween: 0,
        },
        card: {
          center: true,
          crown: true,
          imgWidth: 80,
          imgHeight: 180,
          spaceBetween: 0,
        },
        line: {
          center: false,
          crown: false,
          imgWidth: 80,
          imgHeight: 180,
          spaceBetween: 10,
        },
      },
    };
  },

  watch: {
    model: {
      handler(newValue, oldValue) {
        this.show = false;
        let cuur = this.modelObj[this.model];
        for (let key in cuur) {
          this.$set(this.attr, key, cuur[key]);
        }
        setTimeout(() => {
          this.show = true;
        }, 0);
      },
      immediate: true,
    },
    loop: {
      handler(newValue, oldValue) {
        this.againLoad();
      },
    },
    autoplay: {
      handler(newValue, oldValue) {
        this.againLoad();
      },
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

    getStyle() {
      return {
        // marginBootom: `${this.style.swiperMarginBottom}px`,
      };
    },

    // 单项点击
    clickItem(item) {
      console.log("单项点击");
      console.log(item);
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