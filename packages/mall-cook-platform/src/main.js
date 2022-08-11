/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 11:48:03
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jump from '@/utils/jump'
import '@/scss/index.scss'
// 适配
import '@/utils/adapter.js'

import globalMethods from '@/utils/globalMethods'
import {
  getWrapStyle,
  getComponentStyle,
  getMultiBackground
} from '@/utils/style'

// request
import request from '@/utils/request'

// 全局注册组件
import '@/utils/globalRegister.js'

// 全局注册过滤器
import '@/utils/filters.js'

// element css
import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element-#82AAF1/index.css'

// vant css
// import 'vant/lib/index.css'

import draggable from 'vuedraggable'
import ElementVerify from 'element-verify'
import _ from 'lodash'
import global from '@/config/global'

Vue.config.productionTip = false

Vue.prototype._ = _

Vue.component('draggable', draggable)

// 挂载
Vue.use(globalMethods)
Vue.use(ElementVerify)

/**
 * Axios 捷径
 */
import createAxiosShortcut from 'axios-shortcut'
const axiosShortcut = createAxiosShortcut(request)
for (let k in axiosShortcut) {
  if (!Vue.prototype[`$${k}`]) {
    Object.defineProperty(Vue.prototype, `$${k}`, {
      value: axiosShortcut[k]
    })
  }
}

/**
 * 图片预览
 */
import 'pic-viewer/dist/style.css'
import PicViewer from 'pic-viewer'
Vue.use(PicViewer)

/**
 * 图片上传
 */
import 'imgpond/dist/style.css'
import Imgpond from 'imgpond'

Vue.use(Imgpond, {
  upload: (file, context) => new Promise((resolve, reject) => {
    Vue.prototype.$POST.upload(global.baseApi + 'upload', ({
      file,
      ...context.$attrs.requestParam,
    }), {
      baseURL: '',
      timeout: 20000,
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  }),
})

/**
 * 富文本
 */
import useMiniMCE from '@/components/MiniMCE'
useMiniMCE()

Vue.prototype.$jump = jump
Vue.prototype.$getWrapStyle = getWrapStyle
Vue.prototype.$getComponentStyle = getComponentStyle
Vue.prototype.$getMultiBackground = getMultiBackground

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
