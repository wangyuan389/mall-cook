<!--
 * @Description: 自定义页面（根据配置文件匹配组件生成）
 * @Autor: WangYuan
 * @Date: 2021-07-05 20:47:44
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-26 11:14:09
-->
<template>
  <div class="custom">
    <template v-if="page">
      <component
        v-for="item in page.componentList"
        :key="item.id"
        :is="item.component"
        v-bind="item"
      ></component>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWrapStyle } from '@/utils/style'

export default {
  created () {
    this.initPage()
  },

  data () {
    return {
      page: null
    }
  },

  computed: {
    ...mapGetters(['project'])
  },

  methods: {
    getWrapStyle: getWrapStyle,

    // 初始化页面
    initPage () {
      let { pageId } = this.$route.query

      this.page = pageId
        ? this.project.pages.find(page => page.id == pageId) // 根据pageId查询配置数据，渲染页面
        : this.project.pages.find(page => page.home) // 若未传递pageId，默认渲染首页

      // 设置页面标题
      document.title = this.page.name
    }
  }
}
</script>

<style lang="scss" scoped>
.custom {
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
