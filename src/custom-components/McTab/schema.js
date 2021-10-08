/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 14:26:28
 */

export default {
    tabList: {
        label: '导航栏列表',
        type: 'array',
        fields: [
            {
                label: '导航名称',
                key: 'label',
                type: 'string'
            },
            {
                label: '导航图片',
                key: 'image',
                type: 'upload'
            },
            {
                label: '跳转路径',
                key: 'jump',
                type: 'jump'
            },
        ]
    },
    attrs: {
        label: '导航栏设置',
        type: 'object',
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
            {
                label: '最多显示',
                key: 'max',
                type: 'select',
                data: [
                    { label: '2.5个', value: '2.5' },
                    { label: '3个', value: '3' },
                    { label: '3.5个', value: '3.5' },
                    { label: '4个', value: '4' },
                    { label: '4.5个', value: '4.5' },
                    { label: '5个', value: '5' },
                ]
            },
        ]
    },
    styles: {
        label: '导航栏样式',
        type: 'object',
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
}