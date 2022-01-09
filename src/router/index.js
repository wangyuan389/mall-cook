/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:37:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 15:03:00
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
  },
  {
    path: '/schema',
    name: 'schema',
    component: () => import('@/views/schema'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
