<!--
 * @Description: 页面导航组件
 * @Autor: WangYuan
 * @Date: 2021-06-10 20:05:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:42:09
-->
<template>
  <ul class="tabs" :style="getTabsStyle()">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="tabs-item"
      :class="[item.jump.id == activeTab ? 'f-h5-theme' : '']"
      @click="changeTab(item)"
    >
      <i class="icon f22" :class="item.icon"></i>
      <span class="f13">{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    active: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },

  data () {
    return {
      activeTab: ''
    }
  },

  watch: {
    active: {
      immediate: true,
      handler () {
        this.activeTab = this.active
      }
    },

    activeTab: {
      handler () {
        this.$emit('update:active', this.activeTab)
      }
    }
  },

  methods: {
    // tabs 动态样式
    getTabsStyle () {
      return {
        // backgroundColor: this.style?.background || '#fff'
        backgroundColor: '#fff'
      }
    },

    // 切换tab
    changeTab (item) {
      if (this.activeTab == item.jump.id) return

      this.activeTab = item.jump.id

      // 设置模式置灰，禁止点击跳转
      if (this.disabled) return

      this.$jump(item.jump)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  width: 100%;
  height: 56px;
  border-top: solid 1px #9b9b9b20;

  .tabs-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    background-size: contain;
    font-size: 10px;
    color: #9b9b9b;

    i {
      font-size: 20px;
      margin-bottom: 3px;
    }
  }

  .tabs-item-select {
    color: #f20c25;
  }
}
</style>
