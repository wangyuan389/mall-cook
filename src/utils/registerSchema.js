/*
 * @Description: 解析物料Schmea，注册各物料属性参数与初始值
 * @Autor: WangYuan
 * @Date: 2021-12-27 16:30:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-27 17:27:22
 */
import Vue from 'vue'

// 注册所有物料属性参数与初始值
registerComponentsSchema()

// 获取所有自定义组件schema
function registerComponentsSchema () {
  const files = require.context('@/custom-components', true, /component.json$/)
  let fields = {}
  let initializing = []

  files.keys().forEach(key => {
    const [, name] = key.split('/')
    let config = { component: name, ...files(key) }
    console.log(config)

    fields[name] = config.fields
    initializing.push(initDefaulValue(config))
  })
  Vue.prototype.$fields = fields
  Vue.prototype.$initializing = initializing
}

// 初始化组件初始数据
function initDefaulValue (config) {
  let { component, name, icon, fields } = config
  let temp = { component, name, icon }
  setDefaultValue(fields, temp)
  return temp
}

// 递归设置各层级初始数据
function setDefaultValue (fields, initializing) {
  for (let key in fields) {
    let { type, value, child } = fields[key]
    if (type == 'object') {
      initializing[key] = {}
      child && setDefaultValue(fields[key].child, initializing[key])
    } else {
      initializing[key] = value
    }
  }
  return initializing
}
