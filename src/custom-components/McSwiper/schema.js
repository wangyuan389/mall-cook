/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 13:58:35
 */

export default {
    value: {
        label: '轮播列表',
        type: 'array',
        fields: [
            {
                label: '轮播图片',
                key: 'image',
                type: 'upload'
            },
            {
                label: '跳转路径',
                key: 'jump',
                type: 'jump'
            },
        ],
        options: {
            title: '最多6张，图片尺寸需要一致',
            max: 6
        }
    },
    attrs: {
        label: '轮播设置',
        type: 'object',
        fields: [
            {
                label: '模式选择',
                key: 'model',
                type: 'select',
                data: [
                    { label: '基础', value: 'basis' },
                    { label: '卡片', value: 'card' },
                    { label: '横向', value: 'line' },
                ]
            },
            {
                label: '自动播放',
                key: 'autoplay',
                type: 'switch',
                options: {
                    trueLabel: '开启',
                    falseLabel: '关闭'
                }
            },
            {
                label: '是否循环',
                key: 'loop',
                type: 'switch',
                options: {
                    trueLabel: '开启',
                    falseLabel: '关闭'
                }
            },
        ]
    },
    styles: {
        label: '轮播样式',
        type: 'object',
        fields: [
            {
                label: '页面边距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '下边间距',
                key: 'negativeMarginBottom',
                type: 'number',
                options: {
                    min: -20,
                }
            },
        ]
    },

}