/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-07-05 20:48:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 16:03:19
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import { loadingPages } from '../utils/config'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/custom'
    },
    {
        path: '/custom',
        name: 'custom',
        component: () => import('../pages/custom'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login'),
    },
    {
        path: '/car',
        name: 'car',
        meta: {
            title: '购物车'
        },
        component: () => import('../pages/car'),
    },
    {
        path: '/category',
        name: 'category',
        meta: {
            title: '商品分类'
        },
        component: () => import('../pages/category'),
    },
    {
        path: '/search',
        name: 'search',
        meta: {
            title: '搜索内容'
        },
        component: () => import('../pages/search'),
    },

    // goods
    {
        path: '/goods-detail',
        name: 'goods-detail',
        meta: {
            title: '商品详情'
        },
        component: () => import('../pages/goods/goods-detail'),
    },
    {
        path: '/goods-list',
        name: 'goods-list',
        meta: {
            title: '商品列表'
        },
        component: () => import('../pages/goods/goods-list'),
    },


    // my
    {
        path: '/my',
        name: 'my',
        meta: {
            title: '我的'
        },
        component: () => import('../pages/my/index'),
    },
    {
        path: '/my-order',
        name: 'my-order',
        meta: {
            title: '订单列表'
        },
        component: () => import('../pages/my/my-order'),
    },

    // order
    {
        path: '/order',
        name: 'order',
        meta: {
            title: '确认订单'
        },
        component: () => import('../pages/order/index'),
    },
    {
        path: '/order-address-list',
        name: 'order-address-list',
        meta: {
            title: '地址列表'
        },
        component: () => import('../pages/order/order-address-list'),
    },
    {
        path: '/order-address-edit',
        name: 'order-address-edit',
        meta: {
            title: '地址编辑'
        },
        component: () => import('../pages/order/order-address-edit'),
    },
    {
        path: '/order-pay',
        name: 'order-pay',
        meta: {
            title: '支付'
        },
        component: () => import('../pages/order/order-pay'),
    },
    {
        path: '/order-pay-success',
        name: 'order-pay-success',
        meta: {
            title: '支付成功'
        },
        component: () => import('../pages/order/order-pay-success'),
    },
]

const router = new VueRouter({
    routes
})

// 需登录页面
const permissionList = ['order', 'orderList']

// 全局路由守卫
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // 需加载页面显示loading
    if (loadingPages.includes(to.name)) {
        Vue.prototype.$showLoading()
    }

    if (permissionList.includes(to.name) && !store.getters.token) {
        next({
            name: 'login',
            query: { redirect: to.fullPath }
        })
    }

    next()
})

export default router