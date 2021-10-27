<!--
 * @Description: 商城容器
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-26 20:42:08
-->
<template>
  <div id="app" class="relative flex flex-column h-100 bg-h5-grey">
    <!-- loading -->
    <loading class="absolute-center"></loading>

    <div
      class="relative flex-1 scroll-y"
      style="height:0"
      :style="getPageStyle()"
    >
      <router-view v-if="showRouter" :key="routerKey" />
    </div>

    <!-- 导航栏 -->
    <nav-bar
      v-if="isMainPage"
      v-bind="navigation"
      :active.sync="active"
    ></nav-bar>
  </div>
</template>

<script>
import store from './store'
import NavBar from './components/NavBar.vue'
import Loading from './components/Loading.vue'
import { parseQueryString } from 'kayran'
import { mapMutations, mapGetters } from 'vuex'
import { getProjectById } from './api'

let { mock, projectId, pageId } = parseQueryString()
store.commit('setProjectId', projectId)

export default {
  components: {
    NavBar,
    Loading
  },

  created () {
    this.init()
  },

  mounted () {
    // 隐藏加载Loading
    document.getElementById('appLoading').style.display = 'none'
  },

  data () {
    return {
      showRouter: false,
      isMainPage: false,
      active: ''
    }
  },

  computed: {
    ...mapGetters(['project', 'projectId']),

    // 当前路由全部路径 (包含参数)
    routerKey () {
      return this.$route.fullPath
    },

    // 导航配置
    navigation () {
      return this.project?.config?.navigation || {}
    }
  },

  methods: {
    ...mapMutations(['setProject']),

    // 初始化
    async init () {
      // 传递模拟数据初始化商城
      if (mock) {
        window.addEventListener('message', e => {
          if (e.data) {
            // 如果本地启动admin 和 h5 ，iframe传输会多传输一次webpack警告
            if (e.data.id) {
              this.setProject(e.data)
              this.initNavigation()
              this.showRouter = true
            }
          }
        })
      }

      // 调用真实数据初始化商城
      if (this.projectId) {
        let { status, data } = await getProjectById({ id: this.projectId })

        if (status == '10000') {
          this.setProject(data)
          this.initNavigation()
          this.showRouter = true
        }
      }
    },

    // 导航栏初始化
    initNavigation () {
      // 获取商城配置数据后，判断当前页面是否有导航栏
      this.isShowNavigation(this.$route)

      // 开启路由监听，判断跳转页是否显示导航栏
      this.$watch('$route', route => this.isShowNavigation(route))
    },

    // 控制导航栏显示
    isShowNavigation (route) {
      // 主页面tabId集合
      let tabIdList = this.navigation.list.map(item => item.jump.id)
      let tabId

      if (route.name == 'custom') {
        // 当前页为自定义页, pageId 为 tabId （若pageId为空，则判定为首页）
        tabId = route.query.pageId
        tabId = tabId || this.project.pages.find(page => page.home).id
      } else {
        // 当前页面为固定页, 路由定义name 为 tabId
        tabId = route.name
      }

      // 当前为主页面，显示导航栏并高亮
      if (tabIdList.includes(tabId)) {
        console.log('当前为主页面，显示导航栏并高亮')
        console.log(tabId)
        console.log(route)
        this.active = tabId
        this.isMainPage = true
      } else {
        this.isMainPage = false
      }
    },

    getPageStyle () {
      let backgroundColor = this.project?.config?.backgroundColor || '#fff'
      return { backgroundColor }
    }
  }
}
</script>

<style lang="scss">
body {
  height: 100%;
}
</style>
