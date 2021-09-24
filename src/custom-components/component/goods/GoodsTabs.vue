<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-07 10:00:24
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 15:19:13
-->
<template>
  <div
    class="GoodsTabs"
    :style="getWrapStyle()"
  >
    <!-- 横向 -->
    <div
      v-if="attr.model=='transverse'"
      class="transverse-wrap"
    >
      <!-- tabs -->
      <div
        v-if="config.value.length > 1"
        class="transverse-tabs"
        :style="getTabsStyle()"
      >
        <div
          v-for="(tab,index) in config.value"
          :key='index'
          class="transverse-tab"
          :style="getTabStyle(tab)"
          @click="active = tab.id"
        >
          <div
            v-if="attr.tabTitle"
            class="mt3 h24 lh-24 f18 f-bold"
            :style="getTitleStyle()"
          >{{tab.title}}</div>
          <span
            class="h24 lh-24"
            :style="getTabSpanStyle(tab)"
          >{{tab.label}}</span>
          <div
            v-show="attr.tabLine"
            class="transverse-tab-line"
            :style="{height:attr.tabTitle ? `30px` : `10px`}"
          ></div>
        </div>
      </div>

      <!-- slot -->
      <div class="slot-body">
        <slot :list='curList'></slot>
      </div>
    </div>

    <!-- 竖向 -->
    <div
      v-if="attr.model=='vertical'"
      class="vertical-wrap"
    >
      <!-- tabs -->
      <div class="vertical-tabs">
        <div
          v-for="(tab,index) in config.value"
          :key='index'
          class="vertical-tab flex-center"
          :class="[tab.id == active ? 'vertical-tab-active' : '']"
        >
          <span>{{tab.label}}</span>
        </div>
      </div>

      <!-- slot -->
      <div class="slot-body">
        <slot :list='curList'></slot>
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

  created() {
    this.active = this.config.value[0].id;
  },

  data() {
    return {
      active: -1,
    };
  },

  computed: {
    attr() {
      return this.config.attr;
    },
    style() {
      return this.config.style;
    },
    max() {
      return this.config.value.length > 4 ? 4 : this.config.value.length;
    },
    itemWidth() {
      return 375 / this.max;
    },
    tabsWidth() {
      return this.itemWidth * this.config.value.length;
    },
    curList() {
      let tab = this.config.value.find((item) => item.id == this.active);
      return tab.list;
    },
  },

  methods: {
    getCuurList() {
      let tab = this.config.value.find((item) => item.id == this.active);
      return tab.list;
    },

    getWrapStyle() {
      return {
        backgroundColor: this.style.wrapBackgroundColor,
        backgroundRepeat: `no-repeat`,
        backgroundSize: `375px`,
        paddingTop: this.$pxTorem(this.style.wrapPaddingTop),
        // backgroundImage: `url("https://img01.yzcdn.cn/upload_files/2021/05/27/FsZgJ8VXxpmVPfcIHemgIUyQ4Ib6.jpg")`,
        backgroundImage: `url(${this.style.wrapBackgroundImage})`,
      };
    },

    getTabsStyle() {
      return {
        width: this.$pxTorem(this.tabsWidth),
        backgroundColor: this.style.tabBackground,
      };
    },

    getTabStyle(tab) {
      let result = {
        width: this.$pxTorem(this.itemWidth),
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
      };
    },

    getTabSpanStyle(tab) {
      if (tab.id == this.active) {
        if (this.attr.tabModel == "tab1") {
          return {
            paddingBottom: this.$pxTorem(5),
            borderBottom: `solid`,
            color: this.style.tabActiveColor,
            borderColor: this.style.tabActiveColor,
          };
        }

        if (this.attr.tabModel == "tab2") {
          return {
            padding: `${this.$pxTorem(3)} ${this.$pxTorem(10)}`,
            borderRadius: this.$pxTorem(20),
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
          color: this.style.tabColor,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.transverse-wrap {
  overflow-x: auto;

  .transverse-tabs {
    display: flex;
    align-items: center;
    padding: 8px 0 8px 0;
    font-size: 13px;

    .transverse-tab {
      position: relative;
      display: inline-block;
      text-align: center;

      .transverse-tab-line {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
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
}
</style>