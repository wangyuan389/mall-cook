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

import createAxiosShortcut from 'axios-shortcut'
const axiosShortcut = createAxiosShortcut(request)

import 'imgpond/dist/style.css'
import Imgpond from 'imgpond'
import { jsonToFormData } from 'kayran'

Vue.use(Imgpond, {
  upload: (file, context) => new Promise((resolve, reject) => {
    axiosShortcut.POST(global.baseApi + '/upload', jsonToFormData({
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

const eventBus = new Vue()
export { eventBus } // 用于其它组件与 Minimce 通信
import * as ImageInsertion from '@/components/MinimcePlugins/ImageInsertion/index.js'
import Minimce from 'minimce'

Vue.use(Minimce, {
  apiKey: process.env.VUE_APP_APIKey,
  eventBus,
  tinymceOptions: {
    menu: {
      insert: {
        items: 'localimage docx | link mobilelink tel | template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'
      },
    },
    setup: editor => {
      ImageInsertion.init()
      editor.ui.registry.addMenuItem('localimage', {
        text: '图片',
        icon: 'image',
        onAction: () => {
          ImageInsertion.open()
        }
      })
    },
    // 用于复制粘贴的图片和 TinyMCE 自带的图片上传
    images_upload_handler (blobInfo, success, failure) {
      const loading = Vue.prototype.$loading()
      const blob = blobInfo.blob()
      const file = new File([blob], blobInfo.filename(), { type: blob.type })

      axiosShortcut.POST.upload(global.baseApi + '/upload', {
        file,
      }).then(res => {
        if (typeof res.data === 'string') {
          success(res.data)
        } else {
          failure(res.message)
        }
      }).catch(err => {
        failure(String(err))
      }).finally(() => {
        loading.close()
      })
    },
  }
})

Vue.prototype.$jump = jump
Vue.prototype.$getWrapStyle = getWrapStyle
Vue.prototype.$getComponentStyle = getComponentStyle
Vue.prototype.$getMultiBackground = getMultiBackground

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
