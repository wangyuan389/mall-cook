/*
 * @Description: 
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-09 15:37:58
 */


import Vue from 'vue'

// 注册所有schema配置组件
register(require.context('@/custom-schema-template-set/config-template', true, /.vue/))

registerSchemaInitializing()

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

// 获取所有属性配置组件 initializing
function registerSchemaInitializing() {
    const files = require.context("@/custom-schema-template", true, /initializing.js$/);
    const list = [];

    files.keys().forEach((key) => {
        let name = key.replace(/(\.\/|\/initializing.js)/g, "");
        let [, , componentName] = key.split('/')  // 获取组件名

        list.push({ component: componentName, ...files(key).default })

    });

    Vue.prototype.$cmpConfig = list
}


