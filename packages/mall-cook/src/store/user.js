/*
 * @Description: 用户数据管理
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-15 17:13:13
 */
import {
  setAuthToken,
  getAuthToken,
  setAuthUserInfo,
  getAuthUserInfo
} from '@/utils/auth'

export default {
  state: {
    token: getAuthToken(),
    userInfo: getAuthUserInfo()
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setAuthToken(token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setAuthUserInfo(userInfo)
    },
    logout (state) {
      state.token = null
      state.userInfo = null
      sessionStorage.clear()
      localStorage.clear()
    }
  },
  actions: {},
  modules: {}
}
