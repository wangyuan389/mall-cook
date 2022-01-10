/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:37:09
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-10 16:31:21
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import '@/scss/index.scss'

// 适配文件,移动端(小于540px)才进行适配
import '@/utils/adapter.js'

// 全局方法注册
import globalMethods from '@/utils/globalMethods'
Vue.use(globalMethods)

// 全局组件注册
import '@/utils/globalRegister.js'
import '@/utils/registerSchema.js'

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element);

// lodash
import _ from 'lodash'
Vue.prototype._ = _

// request
import request from '@/utils/request'

import draggable from "vuedraggable";
Vue.component("draggable", draggable);

import Imgpond from 'imgpond'
Vue.use(Imgpond, {
  request,
  url: process.env.VUE_APP_UPLOAD_API + 'upload',
  param: {
    domainId: 3,
    dir: 'img'
  },
  sizeExceededWarningHTML:
    '<a href="https://www.kdocs.cn/l/smLPgaIjt" target="_blank">点击查看压缩指南</a>',
  poweredBy: 'element'
})

import getStyle from '@/utils/getStyle'
Vue.prototype.$getStyle = getStyle

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
