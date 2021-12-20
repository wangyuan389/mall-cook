/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:37:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 14:41:29
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
