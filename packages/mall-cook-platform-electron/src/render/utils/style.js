/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:57:10
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 11:30:21
 */

import Vue from 'vue'

/**
 * 创建容器样式对象
 * @param {*} style 
 */
export function getWrapStyle(style) {
    if (!style) {
        return {}
    }

    // 需px单位基础样式
    const needUnit = [
        'fontSize',
        'width',
        'height',
    ]

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

    })

    return result
}

export function getComponentStyle(style) {
    const result = {}

    Object.keys(style).forEach(key => {

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

// 组件背景样式 （根据选择处理渐变背景或者图片背景）
export function getMultiBackground(config) {
    if (!config) {
        return {}
    }

    if (config.type == 'color') {
        return {
            backgroundImage: `${gradientChannel(config.colorList)}`
        }
    }
    if (config.type == 'image') {
        return {
            backgroundSize: "cover",
            backgroundImage: `url(${config.url})`
        }
    }
}

// 处理渐变格式
export function gradientChannel(config) {
    if (config && config.list.length != 0) {
        let result = `linear-gradient(${config.angle}deg`;

        if (config.list.length == 1) {
            let one = config.list[0]
            result += `,${one.color} ${one.proportion}%, ${one.color} 100%`;
        } else {
            config.list.map((item) => {
                result += `,${item.color} ${item.proportion}%`;
            });
        }
        result += ")";
        return result;
    } else {
        return ''
    }
}