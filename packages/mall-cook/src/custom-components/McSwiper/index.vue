<!--
 * @Description: 轮播组件
 * @Autor: WangYuan
 * @Date: 2021-06-01 15:04:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-27 19:16:38
-->
<template>
<div :style="$getWrapStyle(styles)">
  <ls-swiper
    v-if="show"
    v-model="list"
    v-bind="attrs"
    class="wrap"
    @clickItem="clickItem"
  ></ls-swiper>
</div>
</template>

<script>
import LsSwiper from './LsSwiper'

export default {
  name: 'McSwiper',

  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    attrs: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },

  components: {
    LsSwiper
  },

  data () {
    return {
      show: true,
      modelObj: {
        basis: {
          center: true,
          crown: false,
          imgWidth: 100,
          imgHeight: 180,
          spaceBetween: 0
        },
        card: {
          center: true,
          crown: true,
          imgWidth: 80,
          imgHeight: 180,
          spaceBetween: 0
        },
        line: {
          center: false,
          crown: false,
          imgWidth: 80,
          imgHeight: 180,
          spaceBetween: 10
        }
      }
    }
  },

  watch: {
    'attrs.model': {
      handler (newValue, oldValue) {
        this.show = false
        let cuur = this.modelObj[newValue]
        for (let key in cuur) {
          this.$set(this.attrs, key, cuur[key])
        }
        setTimeout(() => {
          this.show = true
        }, 0)
      },
      immediate: true
    },
    'attrs.loop': {
      handler (newValue, oldValue) {
        this.againLoad()
      }
    },
    'attrs.autoplay': {
      handler (newValue, oldValue) {
        this.againLoad()
      }
    }
  },

  methods: {
    // 重新加载
    againLoad () {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    },

    // 单项点击
    clickItem (item) {
      console.log('单项点击')
      console.log(item)
      this.$jump(item.jump)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  z-index: 0;
}
</style>
