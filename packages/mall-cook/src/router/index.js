/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 16:34:09
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
  },
  {
    path: '/managet',
    name: 'managet',
    component: () => import('@/pages/managet'),
  },
  {
    path: '/schema',
    name: 'schema',
    component: () => import('@/pages/schema'),
  },
  {
    path: '/mall',
    name: 'mall',
    component: () => import('@/pages/mall'),
    redirect: '/mall/pages-manage',
    children: [
      {
        path: 'pages-manage',
        name: 'pages-manage',
        component: () => import('@/pages/mall/pages-manage'),
      },
      {
        path: 'page-build',
        name: 'page-build',
        component: () => import('@/pages/mall/page-build'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/pages/mall/goods'),
        redirect: '/mall/goods/goods-manager',
        children: [
          {
            path: 'goods-manager',
            name: 'goods-manager',
            component: () => import('@/pages/mall/goods/goods-manager/index'),
          },
          {
            path: 'goods-edit',
            name: 'goods-edit',
            component: () => import('@/pages/mall/goods/goods-manager/edit'),
          },
          {
            path: 'group-manager',
            name: 'group-manager',
            component: () => import('@/pages/mall/goods/group-manager/index'),
          },
        ]
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/pages/mall/store'),
        redirect: '/mall/store/navigation-tpl',
        children: [
          {
            path: 'navigation-tpl',
            name: 'navigation-tpl',
            component: () => import('@/pages/mall/store/navigation-tpl'),
          },
          {
            path: 'search-tpl',
            name: 'search-tpl',
            component: () => import('@/pages/mall/store/search-tpl'),
          },
          {
            path: 'category-tpl',
            name: 'category-tpl',
            component: () => import('@/pages/mall/store/category-tpl'),
          },
          {
            path: 'list-tpl',
            name: 'list-tpl',
            component: () => import('@/pages/mall/store/list-tpl'),
          },
        ]
      },
      {
        path: 'model-manage',
        name: 'model-manage',
        component: () => import('@/pages/mall/model-manage'),
      },
    ]
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫鉴权
router.beforeEach((to, from, next) => {
  if (to.name == 'login') {
    next()
  } else {
    if (!store.getters.token) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
