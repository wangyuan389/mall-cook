<!--
 * @Description: 魔方组件
 * @Autor: WangYuan
 * @Date: 2021-06-03 14:14:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-03 11:01:10
-->
<template>
  <div :style="$getWrapStyle(styles)">
    <div class="cap-cube-wrap" :style="getWrapStyle()">
      <div
        v-for="(item, index) in cube.list"
        :key="index"
        class="absolute cap-cube-item"
        :style="getMainStyle(item)"
      >
        <div class="cap-cube-item-wrap" :style="getItemStyle()">
          <van-image class="cap-cube-img" fit="cover" :src="item.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McCapCube',

  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    cube: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    // 单元块尺度
    itemUnit () {
      return (375 - this.styles.pagePadding * 2) / 6
    },
    // 容器宽度
    wrapHeight () {
      return this.cube.row * this.itemUnit
    },
    // 单项间距
    margin () {
      return this.styles.imgMargin
    }
  },

  methods: {
    // 容器样式
    getWrapStyle () {
      let result = {}

      if (this.cube.list.length > 0) {
        result.height = this.$pxTorem(this.wrapHeight)
      } else {
        result.backgroundImage =
          "url('http://110.42.184.128:8090/img/1638500462286.jpg')"
        result.backgroundSize = `100% 100%`
        result.height = this.$pxTorem(190)
      }

      return {
        ...this.$getComponentStyle(this.styles),
        ...result
      }
    },

    // 主体样式
    getMainStyle (styles) {
      let result = {}

      Object.keys(styles).map(key => {
        let tmep = styles[key] * this.itemUnit

        switch (key) {
          case 'top':
            let paddingTop = tmep == 0 ? this.margin : this.margin / 2
            result.paddingTop = this.$pxTorem(paddingTop)
            break

          case 'left':
            let paddingLeft = tmep == 0 ? this.margin : this.margin / 2
            result.paddingLeft = this.$pxTorem(paddingLeft)
            break

          case 'bottom':
            let paddingBottom =
              tmep == this.wrapHeight ? this.margin : this.margin / 2
            result.paddingBottom = this.$pxTorem(paddingBottom)
            break

          case 'right':
            let paddingRight =
              tmep == 375 - this.styles.pagePadding * 2
                ? this.margin
                : this.margin / 2
            result.paddingRight = this.$pxTorem(paddingRight)
            break
        }

        result[key] = this.$pxTorem(tmep)
      })

      return result
    },

    // 单项容器样式
    getItemStyle () {
      return {
        borderRadius: this.$pxTorem(this.styles.imgRadius)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cap-cube-wrap {
  overflow: hidden;
  position: relative;

  .cap-cube-item {
    display: flex;

    .cap-cube-item-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .cap-cube-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
