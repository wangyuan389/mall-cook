/*
 * @Description: 注册全局组件
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-16 15:00:33
 */


import Vue from 'vue'

// 注册所有自定义组件
register(require.context('@/custom-components', true, /.vue/))

// /**
//  * 注册对应包下所有组件
//  * @param {*} path 包路径
//  */
function register(context) {
    context.keys().forEach(cnt => {
        const component = context(cnt)
        let ctrl = component.default || component
        let a = ctrl.name
        let b = ctrl

        // 注册组件
        Vue.component(a, b)
    })
}
