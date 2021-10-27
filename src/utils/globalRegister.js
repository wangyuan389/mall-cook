/*
 * @Description: 全局注册
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-26 13:56:50
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

// /**
//  * 注册对应包下所有组件
//  * @param {*} path 包路径
//  */
function register (context) {
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
function registerComponentsSchema () {
  const files = require.context('@/custom-components', true, /schema.json$/)
  let schema = {}
  let initializing = {}

  files.keys().forEach(key => {
    const [, name] = key.split('/')
    let config = { component: name, ...files(key) }
    console.log(config)

    schema[name] = config.schema
    initializing[name] = initDefaulValue(config)
  })
  Vue.prototype.$schema = schema
  Vue.prototype.$initializing = initializing
  console.log('schema')
  console.log(schema)
  console.log('initializing')
  console.log(initializing)
}

// 初始化组件初始数据
function initDefaulValue (config) {
  let { component, label, icon, schema } = config
  let temp = { component, label, icon }
  setDefaultValue(schema, temp)
  return temp
}

// 递归设置各层级初始数据
function setDefaultValue (schema, initializing) {
  for (let key in schema) {
    let { type, value, child } = schema[key]
    if (type == 'object') {
      initializing[key] = {}
      child && setDefaultValue(schema[key].child, initializing[key])
    } else {
      initializing[key] = value
    }
  }
  return initializing
}
