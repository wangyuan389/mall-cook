<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-07 10:00:24
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-05 15:34:26
-->
<template>
  <div>
    <div class="GoodsTabs" :style="[getWrapStyle()]">
      <!-- 横向 -->
      <div v-if="attr.model == 'transverse'" class="transverse-wrap">
        <!-- tabs -->
        <div v-if="config.goodsData.length > 1" class="transverse-tabs">
          <div
            v-for="(tab, index) in config.goodsData"
            :key="index"
            class="transverse-tab"
            :style="[getTabStyle(tab)]"
            @click="active = tab.id"
          >
            <div
              v-if="attr.showTitle"
              class="mt3 h24 lh-24 f18 f-bold"
              :style="[getTitleStyle()]"
            >
              {{ tab.title }}
            </div>
            <span class="h24 lh-24" :style="[getTabSpanStyle(tab)]">{{
              tab.label
            }}</span>
          </div>
        </div>

        <!-- slot -->
        <div class="slot-body">
          <slot :list="curList"></slot>
        </div>
      </div>

      <!-- 竖向 -->
      <div v-if="attr.model == 'vertical'" class="vertical-wrap">
        <!-- tabs -->
        <div class="vertical-tabs">
          <div
            v-for="(tab, index) in config.goodsData"
            :key="index"
            class="vertical-tab flex-center"
            :class="[tab.id == active ? 'vertical-tab-active' : '']"
          >
            <span>{{ tab.label }}</span>
          </div>
        </div>

        <!-- slot -->
        <div class="slot-body">
          <slot :list="curList"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsTabs",

  provide() {
    return {
      tabs: this,
    };
  },

  props: {
    config: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      active: -1,
    };
  },

  watch: {
    "config.goodsData": {
      immediate: true,
      deep: true,
      handler() {
        this.active = this.config?.goodsData[0]?.id;
      },
    },
  },

  computed: {
    attr() {
      return this.config.attrs;
    },
    style() {
      return this.config.styles;
    },
    max() {
      return this.config.goodsData.length > 4
        ? 4
        : this.config.goodsData.length;
    },
    itemWidth() {
      return 375 / this.max;
    },
    tabsWidth() {
      return this.itemWidth * this.config.goodsData.length;
    },
    curList() {
      let tab = this.config.goodsData.find((item) => item.id == this.active);
      return tab?.list || [];
    },
  },

  methods: {
    getCuurList() {
      let tab = this.config.goodsData.find((item) => item.id == this.active);
      return tab.list;
    },

    getWrapStyle() {
      return {
        padding: `0 ${this.$unit(this.style.pagePadding)}`,
        padding: this.$unit(this.style.wrapPadding),
        backgroundColor: this.style.background,
        ...this.$cmpStyle(this.style),
      };
    },

    getTabStyle(tab) {
      let result = {
        width: this.$unit(this.itemWidth),
      };

      if (tab.id == this.active && this.attr.tabModel == "tab3") {
        result.background = this.style.tabActiveColor;
      }

      return result;
    },

    getTitleStyle() {
      return {
        // height: `20px`,
        // lineHeight: `20px`,
        color: this.style.titleColor,
      };
    },

    getTabSpanStyle(tab) {
      if (tab.id == this.active) {
        if (this.attr.tabModel == "tab1") {
          return {
            paddingBottom: this.$unit(5),
            borderBottom: `solid 3px`,
            color: this.style.tabActiveColor,
            borderColor: this.style.tabActiveColor,
          };
        }

        if (this.attr.tabModel == "tab2") {
          return {
            padding: `${this.$unit(3)} ${this.$unit(10)}`,
            borderRadius: this.$unit(20),
            color: `#ffffff`,
            background: this.style.tabActiveColor,
          };
        }

        if (this.attr.tabModel == "tab3") {
          return {
            color: `#ffffff`,
          };
        }
      } else {
        return {
          color: this.style.subTitleColor,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transverse-wrap {
  // overflow-x: auto;

  // // 隐藏滚动条
  // &::-webkit-scrollbar {
  //   display: none; /* Chrome Safari */
  // }

  .transverse-tabs {
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 8px;
    font-size: 13px;

    .transverse-tab {
      position: relative;
      display: inline-block;
      text-align: center;

      &:nth-child(1)::after {
        display: none;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
        height: 60%;
        background: #dadada;
        transform: translateY(-50%);
      }
    }
  }
}

.vertical-wrap {
  display: flex;
  font-size: 14px;

  .vertical-tabs {
    width: 88px;
    background-color: #f7f8fa;

    .vertical-tab {
      height: 52px;
      background-color: #f7f8fa;
    }

    .vertical-tab-active {
      position: relative;
      background: #fff;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 4px;
        height: 14px;
        background-color: #ee0a24;
        transform: translateY(-50%);
      }
    }
  }
}

.slot-body {
  flex: 1;
  overflow-x: auto;
}
</style>