/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 14:23:41
 */

export default {
    value: {
        label: '倒计时内容',
        type: 'object',
        fields: [
            {
                label: '活动名',
                key: 'text',
                type: 'string'
            },
            {
                label: '开始时间',
                key: 'startTime',
                type: 'time',
            },
            {
                label: '结束时间',
                key: 'endTime',
                type: 'time'
            },
        ]
    },
    styles: {
        label: '倒计时样式',
        type: 'object',
        fields: [
            {
                label: '位置',
                key: 'location',
                type: 'select',
                data: [
                    { label: '居左', value: 'left', icon: 'deco-icon-align-left' },
                    { label: '居中', value: 'center', icon: 'deco-icon-align-center' },
                    { label: '居右', value: 'right', icon: 'deco-icon-align-right' },
                ]
            },
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
                label: '标题颜色',
                key: 'titleColor',
                type: 'color'
            },
            {
                label: '时间颜色',
                key: 'timeColor',
                type: 'color'
            },
            {
                label: '背景色',
                key: 'cmpBackground',
                type: 'color'
            },
        ]
    },
    attrs: {
        label: '倒计时设置',
        type: 'object',
        fields: [
            {
                label: '模式选择',
                key: 'model',
                type: 'select',
                data: [
                    { label: '样式一', value: 'one' },
                    { label: '样式二', value: 'two' },
                    { label: '样式三', value: 'three' }
                ]
            },
        ]
    },

}