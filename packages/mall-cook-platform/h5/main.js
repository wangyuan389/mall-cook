/*
 * @Description: h5 main.js
 * @Autor: WangYuan
 * @Date: 2021-07-05 11:18:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-29 16:53:16
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import jump from '@/utils/jump'
import {
  getWrapStyle,
  getComponentStyle,
  getMultiBackground
} from '@/utils/style'
import globalMethods from './utils/globalMethods'

// request
import request from '@/utils/request'

// 适配
import '@/utils/adapter.js'

// 全局样式
import '@/scss/index.scss'

// 全局注册组件
import './utils/globalRegister.js'

// 全局注册过滤器
import '@/utils/filters.js'

// vant
// import Vant from 'vant';
import 'vant/lib/index.css'
// import { Toast } from 'vant';

// 挂载
// Vue.use(Vant);
// Vue.use(Toast)
Vue.use(globalMethods)
Vue.prototype.$jump = jump
Vue.prototype.$getWrapStyle = getWrapStyle
Vue.prototype.$getComponentStyle = getComponentStyle
Vue.prototype.$getMultiBackground = getMultiBackground

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
