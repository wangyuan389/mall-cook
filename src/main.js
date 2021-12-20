/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:37:09
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 20:15:19
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import '@/scss/index.scss'

// 适配文件,移动端(小于540px)才进行适配
import '@/utils/adapter.js'

// 全局组件注册
import '@/utils/globalRegister.js'

// lodash
import _ from 'lodash';
Vue.prototype._ = _

// 全局方法注册
import globalMethods from '@/utils/globalMethods'
Vue.use(globalMethods)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
