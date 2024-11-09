/*
 * @Description: 全局注册
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:00:49
 * @LastEditors: June
 * @LastEditTime: 2023-03-10 20:27:35
 */

import Vue from 'vue'

// 注册所有全局组件
register(import.meta.glob('@/components/global/**/*.vue', {
  eager: true,
  import: 'default',
}))

register(import.meta.glob('@/custom-schema-template/**/*.vue', {
  eager: true,
  import: 'default',
}))


// 注册所有配置组件
register(import.meta.glob(
  '@/customSchemaTemplate/**/*.vue',
  {
      eager: true,
      import: 'default',
  },
))

// 注册所有物料
// register(require.context('../../../mall-cook-template/src/widgets', true, /.vue/))

// 获取所有物料初始数据与schema数据
registerComponentsSchema()

// /**
//  * 注册对应包下所有组件
//  * @param {*} path 包路径
//  */
function register (coms) {
  Object.keys(coms).forEach(cnt => {
    const component = coms[cnt]
    let ctrl = component.default || component
    let a = ctrl.name
    let b = ctrl

    // 注册组件
    Vue.component(a, b)
  })
}

// 获取所有自定义组件schema
function registerComponentsSchema () {
  const files = import.meta.glob('@/widgets/**/*.json', {
    eager: true,
    import: 'default',
  })
  let fields = {}
  let initializing = {}
  Object.keys(files).forEach(key => {
    const [,,,,name] = key.split('/')
    let config = { component: name, ...files[key]}
    fields[name] = config.fields
    initializing[name] = initDefaulValue(config)
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
