/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 14:48:32
 */
import Vue from 'vue'
import App from './App'

import '@/scss/index.scss'
import '@/utils/registerBaseStyle.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
