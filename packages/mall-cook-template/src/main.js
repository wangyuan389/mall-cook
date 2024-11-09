/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-22 14:55:02
 */
import Vue from 'vue'
import App from './App'
import store from './store'

// 注册全局样式
import '@/scss/index.scss'
// 注册公用渲染方法
import '@/utils/registerBaseStyle.js'
// 注册全局过滤器
import '@/utils/filters.js'

import jump from '@/utils/globalJump'
Vue.prototype.$jump = jump
Vue.prototype.$toast = (title, cb) => {
  if(!title) throw new Error('title不能为空');
  return uni.showToast({
    title,
    icon: 'none',
    success: () => {
      cb && 'function' === typeof cb && cb();
    }
  })
}

// uview组件库
import uView from 'uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
