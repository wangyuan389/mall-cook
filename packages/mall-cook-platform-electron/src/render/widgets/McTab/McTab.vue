<!--
 * @Description: tab组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-28 11:32:02
-->
<template>
  <div class="wrap" :style="[$wrapStyle(styles)]">
    <div class="wrap-body" :style="[getWrapStyle()]">
      <ul class="tabs" :style="[getTabsStyle()]">
        <li
          v-for="item in tabList"
          :key="item.id"
          class="tab-item"
          :style="[geItemStyle()]"
          @click="$jump(item.jump)"
        >
          <image
            v-if="['image', 'image-text'].includes(attrs.type)"
            mode="widthFix"
            :style="[geItemImgStyle()]"
            :src="item.image || defaultIamge"
          />
          <span
            v-if="['text', 'image-text'].includes(attrs.type)"
            class="ellipsis-1"
            >{{ item.label }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTab",

  props: {
    styles: {
      type: Object,
      default: () => {},
    },
    attrs: {
      type: Object,
      default: () => {},
    },
    tabList: {
      type: Array,
      default: () => [],
    },
  },

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
        (375 - this.styles.pagePadding * 2 - this.styles.imgPadding) /
        this.attrs.max
      );
    },
  },

  methods: {
    // 容器样式
    getWrapStyle() {
      return {
        overflowX: this.attrs.model == "fixed" ? "hidden" : "auto",
        ...this.$cmpStyle(this.styles),
      };
    },

    // tabs 样式
    getTabsStyle() {
      return {
        width: this.$unit(
          this.itemWidth * this.tabList.length + this.styles.imgPadding
        ),
        padding: `0 ${this.$unit(this.styles.imgPadding / 2)} 8px ${this.$unit(
          this.styles.imgPadding / 2
        )}`,
      };
    },

    // 单项样式
    geItemStyle() {
      return {
        width: this.$unit(this.itemWidth),
        padding: this.$unit(this.styles.imgPadding),
        color: this.styles.titleColor,
      };
    },

    // 单项图片样式
    geItemImgStyle() {
      return {
        width: `${this.styles.imgWidth}%`,
        borderRadius: this.$unit(this.styles.imgRadius),
        marginBottom: this.attrs.type == "image-text" ? "5px" : 0,
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
        display: inline-flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
