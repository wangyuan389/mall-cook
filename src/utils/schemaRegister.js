/*
 * @Description: 
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 19:45:57
 */


import Vue from 'vue'

registerSchemaInitializing()


// 获取所有属性配置组件 initializing
function registerSchemaInitializing() {
    const files = require.context("@/custom-schema-template", true, /initializing.js$/);
    const list = [];

    files.keys().forEach((key) => {
        let name = key.replace(/(\.\/|\/initializing.js)/g, "");
        let [, , componentName] = key.split('/')  // 获取组件名

        list.push({ component: componentName, ...files(key).default })

    });

    Vue.prototype.$schemaCmpConfig = list
}


