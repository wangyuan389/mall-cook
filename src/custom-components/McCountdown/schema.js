/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:43:18
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
    style: {
        label: '倒计时样式',
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
        ]
    },
    attr: {
        label: '倒计时设置',
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
        ]
    },

}