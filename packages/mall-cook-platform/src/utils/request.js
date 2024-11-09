/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-03-24 16:07:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 10:14:08
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import global from '@/config/global'

// create an axios instance
const request = axios.create({
  baseURL: global.baseApi, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
request.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = store.getters.token
  }

  return config
})

// response interceptor
request.interceptors.response.use(response => {
  const token = response.headers['right-token']
  token && store.commit('setToken', token)

  return response.data
})

export default request
