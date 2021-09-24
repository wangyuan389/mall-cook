<!--
 * @Description: 魔方组件
 * @Autor: WangYuan
 * @Date: 2021-06-03 14:14:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 16:34:13
-->
<template>
  <div
    class="cap-cube-wrap"
    :style="getWrapStyle()"
  >
    <div
      v-for="(item,index) in cube.list"
      :key="index"
      class="absolute cap-cube-item"
      :style="getMainStyle(item)"
    >
      <div
        class="cap-cube-item-wrap"
        :style="getItemStyle()"
      >
        <van-image
          class="cap-cube-img"
          fit='cover'
          :src="item.image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McCapCube",

  mixins: [componentMixin],

  computed: {
    // 魔方数据配置项
    cube() {
      return this.value.cube;
    },
    // 单元块尺度
    itemUnit() {
      return (375 - this.style.pagePadding * 2) / 6;
    },
    // 容器宽度
    wrapHeight() {
      return this.cube.row * this.itemUnit;
    },
    // 单项间距
    margin() {
      return this.style.imgMargin;
    },
  },

  methods: {
    // 容器样式
    getWrapStyle() {
      let result = {};

      if (this.cube.list.length > 0) {
        result.height = this.$pxTorem(this.wrapHeight);
      } else {
        result.backgroundImage =
          "url('http://116.62.142.85:8090/img/1630570966337.jpg')";
        result.backgroundSize = `100% 100%`;
        result.height = this.$pxTorem(190);
      }

      return {
        ...this.$getComponentStyle(this.style),
        ...result,
      };
    },

    // 主体样式
    getMainStyle(style) {
      let result = {};

      Object.keys(style).map((key) => {
        let tmep = style[key] * this.itemUnit;

        switch (key) {
          case "top":
            let paddingTop = tmep == 0 ? this.margin : this.margin / 2;
            result.paddingTop = this.$pxTorem(paddingTop);
            break;

          case "left":
            let paddingLeft = tmep == 0 ? this.margin : this.margin / 2;
            result.paddingLeft = this.$pxTorem(paddingLeft);
            break;

          case "bottom":
            let paddingBottom =
              tmep == this.wrapHeight ? this.margin : this.margin / 2;
            result.paddingBottom = this.$pxTorem(paddingBottom);
            break;

          case "right":
            let paddingRight =
              tmep == 375 - this.style.pagePadding * 2
                ? this.margin
                : this.margin / 2;
            result.paddingRight = this.$pxTorem(paddingRight);
            break;
        }

        result[key] = this.$pxTorem(tmep);
      });

      return result;
    },

    // 单项容器样式
    getItemStyle() {
      return {
        borderRadius: this.$pxTorem(this.style.imgRadius),
      };
    },
  },
};
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