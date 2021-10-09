/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 15:26:03
 */

export default {
    cube: {
        label: '魔方数据',
        type: 'cube'
    },
    styles: {
        label: '魔方样式',
        type: 'object',
        fields: [
            {
                label: '页面边距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '组件圆角',
                key: 'cmpRadius',
                type: 'number'
            },
            {
                label: '单项间距',
                key: 'imgMargin',
                type: 'number'
            },
            {
                label: '单项圆角',
                key: 'imgRadius',
                type: 'number'
            },
            {
                label: '容器背景',
                key: 'cmpBackground',
                type: 'color'
            },
        ]
    }
}