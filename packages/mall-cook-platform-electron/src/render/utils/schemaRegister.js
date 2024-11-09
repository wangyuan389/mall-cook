/*
 * @Description: 
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: June
 * @LastEditTime: 2023-05-04 12:35:45
 */


import Vue from 'vue'

// 注册所有schema配置组件
register(import.meta.glob('@/custom-schema-template-set/config-template/**/*.vue', {
    eager: true,
    import: 'default',
}))

registerSchemaInitializing()

// /**
//  * 注册对应包下所有组件
//  * @param {*} path 包路径
//  */
function register(context) {
    Object.keys(context).forEach(cnt => {
        const component = context[cnt]
        let ctrl = component.default || component
        let a = ctrl.name
        let b = ctrl

        // 注册组件
        Vue.component(a, b)
    })
}
// 获取所有属性配置组件 initializing
function registerSchemaInitializing() {
    // const files = require.context("@/custom-schema-template", true, /initializing.js$/);
    const files = import.meta.glob('@/custom-schema-template/**/initializing.js', {
        eager: true,
        import: 'default',
    })
    const list = [];

    Object.keys(files).forEach((key) => {
        let name = key.replace(/(\.\/|\/initializing.js)/g, "");
        let [, , , , , componentName] = name.split('/')  // 获取组件名
        list.push({ component: componentName, ...files[key] })

    });
    Vue.prototype.$cmpConfig = list
}


