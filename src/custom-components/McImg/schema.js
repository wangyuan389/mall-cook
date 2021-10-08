/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 11:32:03
 */

export default {
    value: {
        label: '图片内容',
        type: 'object',
        fields: [
            {
                label: '图片上传',
                key: 'path',
                type: 'upload'
            },
            {
                label: '跳转路径',
                key: 'jump',
                type: 'jump'
            },
        ]
    },
    styles: {
        label: '图片样式',
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
        ]
    },

}