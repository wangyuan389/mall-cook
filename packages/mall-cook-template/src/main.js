/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-17 14:53:47
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

// import draggable  from "vuedraggable";
// Vue.component("draggable", draggable);

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
