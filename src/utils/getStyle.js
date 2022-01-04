/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-01 08:48:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-01 09:11:05
 */
import Vue from 'vue'

export default function getStyle (style) {
  if (!style) {
    return {}
  }

  // 需px单位基础样式
  const needUnit = ['fontSize', 'width', 'height']

  const result = {}
  Object.keys(style).forEach(key => {
    // 需px单位基础样式
    if (needUnit.includes(key)) {
      result[key] = Vue.prototype.$pxTorem(style[key])
    }

    // 页面间距
    if (key == 'pagePadding') {
      result['paddingLeft'] = Vue.prototype.$pxTorem(style[key])
      result['paddingRight'] = Vue.prototype.$pxTorem(style[key])
    }

    // 容器负边距
    if (key == 'negativeMarginBottom') {
      result['marginBottom'] = Vue.prototype.$pxTorem(style[key])
    }

    // 上部内间距
    if (key == 'cmpUpperPadding') {
      result['paddingTop'] = Vue.prototype.$pxTorem(style[key])
    }

    // 下部内间距
    if (key == 'cmpLowerPadding') {
      result['paddingBottom'] = Vue.prototype.$pxTorem(style[key])
    }

    // 所有圆角
    if (key == 'cmpRadius') {
      result['borderRadius'] = Vue.prototype.$pxTorem(style[key])
    }

    // 上部圆角
    if (key == 'cmpUpperRadius') {
      result['borderTopLeftRadius'] = Vue.prototype.$pxTorem(style[key])
      result['borderTopRightRadius'] = Vue.prototype.$pxTorem(style[key])
    }

    // 下部圆角
    if (key == 'cmpLowerRadius') {
      result['borderBottomLeftRadius'] = Vue.prototype.$pxTorem(style[key])
      result['borderBottomRightRadius'] = Vue.prototype.$pxTorem(style[key])
    }

    // 组件背景色
    if (key == 'cmpBackground') {
      result['background'] = style[key]
    }
  })

  return result
}
