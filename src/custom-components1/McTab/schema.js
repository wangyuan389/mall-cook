/*
 * @Description: schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 12:05:28
 */

export default {
    style: {
        label: 'tab样式',
        type: 'objct',
        fields: [
            {
                label: '页面边距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '上边距',
                key: 'cmpUpperPadding',
                type: 'number'
            },
            {
                label: '下边距',
                key: 'cmpLowerPadding',
                type: 'number'
            },
            {
                label: '上圆角',
                key: 'cmpUpperRadius',
                type: 'number'
            },
            {
                label: '下圆角',
                key: 'cmpLowerRadius',
                type: 'number'
            },
            {
                label: '图片间隔',
                key: 'imgPadding',
                type: 'number'
            },
            {
                label: '图片圆角',
                key: 'imgRadius',
                type: 'number'
            },
            {
                label: '文本字体',
                key: 'fontSize',
                type: 'number'
            },
            {
                label: '文本颜色',
                key: 'titleColor',
                type: 'color'
            },
            {
                label: '组件背景',
                key: 'cmpBackground',
                type: 'color'
            },
        ]
    },
    attr: {
        label: 'tab属性',
        type: 'objct',
        fields: [
            {
                label: '模式选择',
                key: 'model',
                type: 'select',
                data: [
                    { label: '固定', value: 'fixed', icon: 'deco-icon-fixed' },
                    { label: '滑动', value: 'scroll', icon: 'deco-icon-scroll' }
                ]
            },
            {
                label: '显示类型',
                key: 'type',
                type: 'select',
                data: [
                    { label: '图片', value: 'image' },
                    { label: '文字', value: 'text' },
                    { label: '图文', value: 'image-text' },
                ]
            },
        ]
    },
    value: {
        label: 'tab数据',
        type: 'objct',
        fields: [
            {
                label: '图片上传',
                key: 'path',
                type: 'upload'
            },
        ]
    }
}