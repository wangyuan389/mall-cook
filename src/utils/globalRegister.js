/*
 * @Description: 全局注册
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:36:55
 */


import Vue from 'vue'

// 注册所有全局组件
register(require.context('@/components/global', true, /.vue/))

// 注册所有配置组件
register(require.context('@/custom-schema-template', true, /.vue/))

// 注册所有自定义组件配置
register(require.context('@/custom-components', true, /.vue/))

// 获取所有自定义组件schema数据
registerComponentsSchema()

// 获取所有自定义组件初始配置
registerComponenetsInitializing()


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

// 获取所有自定义组件schema
function registerComponentsSchema() {
    const files = require.context("@/custom-components", true, /schema.js$/);
    const temp = {};

    files.keys().forEach((key) => {
        const comName = key.replace(/(\.\/|\/schema.js)/g, "");
        temp[comName] = files(key).default
    });

    Vue.prototype.$schema = temp
}

// 获取所有自定义组件 initializing
function registerComponenetsInitializing() {
    const files = require.context("@/custom-components", true, /initializing.js$/);
    const temp = {};

    files.keys().forEach((key) => {
        const comName = key.replace(/(\.\/|\/initializing.js)/g, "");
        temp[comName] = files(key).default
    });

    Vue.prototype.$initializing = temp
}



