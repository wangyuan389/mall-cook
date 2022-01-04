<!--
 * @Description: tab组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-01 09:13:02
-->
<template>
  <div class="wrap" :style="$getStyle(styles)">
    <div class="wrap-body" :style="getWrapStyle()">
      <ul class="tabs" :style="getTabsStyle()">
        <li
          v-for="item in tabList"
          :key="item.id"
          class="tab-item"
          :style="geItemStyle()"
        >
          <img
            v-show="['image', 'image-text'].includes(attrs.type)"
            class="tab-item-img"
            :style="geItemImgStyle()"
            :src="item.image || defaultIamge"
          />
          <span
            v-show="['text', 'image-text'].includes(attrs.type)"
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
  name: 'McTab',

  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    attrs: {
      type: Object,
      default: () => {}
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      fixed: true,
      defaultIamge:
        'https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp'
    }
  },

  computed: {
    itemWidth () {
      return (
        (375 - this.styles.pagePadding * 2 - this.styles.imgPadding) /
        this.attrs.max
      )
    }
  },

  methods: {
    // 容器样式
    getWrapStyle () {
      return {
        overflowX: this.attrs.model == 'fixed' ? 'hidden' : 'auto',
        ...this.$getStyle(this.styles)
      }
    },

    // tabs 样式
    getTabsStyle () {
      return {
        width: this.$pxTorem(
          this.itemWidth * this.tabList.length + this.styles.imgPadding
        ),
        padding: `0 ${this.$pxTorem(this.styles.imgPadding / 2)}`
      }
    },

    // 单项样式
    geItemStyle () {
      return {
        width: this.$pxTorem(this.itemWidth),
        padding: this.$pxTorem(this.styles.imgPadding / 2),
        color: this.styles.titleColor
      }
    },

    // 单项图片样式
    geItemImgStyle () {
      return {
        width: `${this.styles.imgWidth}%`,
        borderRadius: this.$pxTorem(this.styles.imgRadius),
        marginBottom: this.attrs.type == 'image-text' ? '5px' : 0
      }
    }
  }
}
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
          height: 100%;
          // margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
