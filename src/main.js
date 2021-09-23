/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-22 17:03:21
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jump from '@/utils/jump'
import _ from 'lodash';
import '@/scss/index.scss'
// 适配
import '@/utils/adapter.js'

import componentConfigs from '@/custom-components/config.js'
import globalMethods from '@/utils/globalMethods'
import { getWrapStyle, getComponentStyle, getMultiBackground } from '@/utils/style'

// element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/scss/element-#82AAF1/index.css'

// request
import request from '@/utils/request'

// 全局注册组件
import '@/utils/globalRegister.js'

// 全局注册过滤器
import '@/utils/filters.js'

// vant
import Vant from 'vant';
import 'vant/lib/index.css';

import Imgpond from 'imgpond'
import draggable from "vuedraggable";
import Minimce from 'minimce'
import ElementVerify from 'element-verify'

Vue.config.productionTip = false

// 挂载
Vue.use(Vant);
Vue.use(Element)
Vue.use(globalMethods)
Vue.use(draggable)
Vue.use(ElementVerify)

Vue.use(Imgpond, {
  request,
  url: process.env.VUE_APP_UPLOAD_API + 'upload',
  param: {
    domainId: 3,
    dir: 'img'
  },
  sizeExceededWarningHTML: '<a href="https://www.kdocs.cn/l/smLPgaIjt" target="_blank">点击查看压缩指南</a>',
  poweredBy: 'element'
})

Vue.use(Minimce, {
  apiKey: '7pzmi3ij0wtrd3flanom0g7lb69rvqs8ew1uo45x8utkq09k',
  html2text: true,
  Imgpond,
  // Filepool: Filepool.Filepool,
})

Vue.prototype._ = _
Vue.prototype.$jump = jump
Vue.prototype.$cmpConfigs = componentConfigs
Vue.prototype.$getWrapStyle = getWrapStyle
Vue.prototype.$getComponentStyle = getComponentStyle
Vue.prototype.$getMultiBackground = getMultiBackground

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
