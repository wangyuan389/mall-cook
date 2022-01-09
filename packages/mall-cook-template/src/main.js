/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 14:48:32
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

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
