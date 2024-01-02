import Vue from 'vue'
import global from '@/config/global'

export default async (file) => new Promise((resolve, reject) => {
  Vue.prototype.$POST.upload(global.baseApi + 'upload', ({
    file,
  }), {
    baseURL: '',
    timeout: 20000,
  }).then(res => {
    resolve(res.data)
  }).catch(e => {
    reject(e)
  })
})
