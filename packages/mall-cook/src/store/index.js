/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-01 20:18:11
 */
import Vue from 'vue'
import Vuex from 'vuex'
import project from './project'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...project.state,
    ...user.state,
  },
  getters: {
    ...project.getters,
    ...user.getters,
  },
  mutations: {
    ...project.mutations,
    ...user.mutations,
  },
  actions: {
  },
  modules: {
  }
})
