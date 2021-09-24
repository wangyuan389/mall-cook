<!--
 * @Description: tab组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 15:19:22
-->
<template>
  <div class="wrap">
    <div
      class="wrap-body"
      :style="getWrapStyle()"
    >
      <ul
        class="tabs"
        :style="getTabsStyle()"
      >
        <li
          v-for="(item,index) in value"
          class="tab-item"
          :style="geItemStyle()"
        >
          <img
            v-show="['image','image-text'].includes(attr.type)"
            class="tab-item-img"
            :style="geItemImgStyle()"
            :src="item.image || defaultIamge"
          >
          <span
            v-show="['text','image-text'].includes(attr.type)"
            class="ellipsis-1"
          >{{item.label}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McTab",

  mixins: [componentMixin],

  data() {
    return {
      fixed: true,
      defaultIamge:
        "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
    };
  },

  computed: {
    itemWidth() {
      return (
        (375 - this.style.pagePadding * 2 - this.style.imgPadding) /
        this.attr.max
      );
    },
  },

  methods: {
    // 容器样式
    getWrapStyle() {
      return {
        overflowX: this.attr.model == "fixed" ? "hidden" : "auto",
        ...this.$getComponentStyle(this.style),
      };
    },

    // tabs 样式
    getTabsStyle() {
      return {
        width: this.$pxTorem(
          this.itemWidth * this.value.length + this.style.imgPadding
        ),
        padding: `0 ${this.$pxTorem(this.style.imgPadding / 2)}`,
      };
    },

    // 单项样式
    geItemStyle() {
      return {
        width: this.$pxTorem(this.itemWidth),
        padding: this.$pxTorem(this.style.imgPadding / 2),
      };
    },

    // 单项图片样式
    geItemImgStyle() {
      return {
        borderRadius: this.$pxTorem(this.style.imgRadius),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  .wrap-body {
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .tabs {
      .tab-item {
        display: inline-block;
        text-align: center;

        .tab-item-img {
          width: 100%;
          height: 100%;
          // margin-bottom: 10px;
        }
      }
    }
  }
}
</style>