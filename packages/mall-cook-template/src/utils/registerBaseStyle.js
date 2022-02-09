/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 12:18:36
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-09 14:24:04
 */
import Vue from 'vue'

// 动态渲染通用样式
function wrapStyle (target) {
  if (!target) {
    return {}
  }

  let result = {}

  // 需px单位基础样式
  const needUnit = ['fontSize', 'width', 'height']

  for (const [key, value] of Object.entries(target)) {
    // 需px单位基础样式
    if (needUnit.includes(key)) {
      result[key] = unit(value)
      continue
    }

    // 页面间距
    if (key == 'pagePadding') {
      result['paddingLeft'] = unit(value)
      result['paddingRight'] = unit(value)
      continue
    }


  }

  return result
}

function cmpStyle (target) {
  if (!target) {
    return {}
  }

  let result = {}

  for (const [key, value] of Object.entries(target)) {
    // 容器负边距
    if (key == 'negativeMarginBottom') {
      result['paddingBottom'] = unit(value)
      continue
    }

    // 上部内间距
    if (key == 'cmpUpperPadding') {
      result['paddingTop'] = unit(value)
      continue
    }

    // 下部内间距
    if (key == 'cmpLowerPadding') {
      result['paddingBottom'] = unit(value)
      continue
    }

    // 所有圆角
    if (key == 'cmpRadius') {
      result['borderRadius'] = unit(value)
      continue
    }

    // 上部圆角
    if (key == 'cmpUpperRadius') {
      result['borderTopLeftRadius'] = unit(value)
      result['borderTopRightRadius'] = unit(value)
      continue
    }

    // 下部圆角
    if (key == 'cmpLowerRadius') {
      result['borderBottomLeftRadius'] = unit(value)
      result['borderBottomRightRadius'] = unit(value)
      continue
    }

    // 组件背景色
    if (key == 'cmpBackground') {
      result['background'] = value
      continue
    }
  }

  return result
}

// 样式单位rpx
function unit (target) {
  return `${target * 2}rpx`
}

Vue.prototype.$wrapStyle = wrapStyle
Vue.prototype.$cmpStyle = cmpStyle
Vue.prototype.$unit = unit
