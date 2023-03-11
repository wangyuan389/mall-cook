/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 09:49:33
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 18:34:08
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
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/managet',
    name: 'managet',
    component: () => import('@/pages/managet.vue'),
  },
  {
    path: '/schema',
    name: 'schema',
    component: () => import('@/pages/schema.vue'),
  },
  {
    path: '/mall',
    name: 'mall',
    component: () => import('@/pages/mall/index.vue'),
    redirect: '/mall/pages-manage',
    children: [
      {
        path: 'pages-manage',
        name: 'pages-manage',
        component: () => import('@/pages/mall/pages-manage.vue'),
      },
      {
        path: 'page-build',
        name: 'page-build',
        component: () => import('@/pages/mall/page-build.vue'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/pages/mall/goods/index.vue'),
        redirect: '/mall/goods/goods-manager',
        children: [
          {
            path: 'goods-manager',
            name: 'goods-manager',
            component: () => import('@/pages/mall/goods/goods-manager/index.vue'),
          },
          {
            path: 'goods-edit',
            name: 'goods-edit',
            component: () => import('@/pages/mall/goods/goods-manager/edit.vue'),
          },
          {
            path: 'group-manager',
            name: 'group-manager',
            component: () => import('@/pages/mall/goods/group-manager/index.vue'),
          },
        ]
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/pages/mall/store/index.vue'),
        redirect: '/mall/store/navigation-tpl',
        children: [
          {
            path: 'navigation-tpl',
            name: 'navigation-tpl',
            component: () => import('@/pages/mall/store/navigation-tpl.vue'),
          },
          {
            path: 'search-tpl',
            name: 'search-tpl',
            component: () => import('@/pages/mall/store/search-tpl.vue'),
          },
          {
            path: 'category-tpl',
            name: 'category-tpl',
            component: () => import('@/pages/mall/store/category-tpl.vue'),
          },
          {
            path: 'list-tpl',
            name: 'list-tpl',
            component: () => import('@/pages/mall/store/list-tpl.vue'),
          },
        ]
      },
      {
        path: 'model-manage',
        name: 'model-manage',
        component: () => import('@/pages/mall/model-manage.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
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
