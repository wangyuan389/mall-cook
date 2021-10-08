/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 11:45:04
 */

export default {

    attrs: {
        label: '轮播设置',
        type: 'object',
        fields: [
            {
                label: '模式选择',
                key: 'model',
                type: 'select',
                data: [
                    { label: '空白', value: 'basis', icon: 'deco-icon-white' },
                    { label: '辅助线', value: 'line', icon: 'deco-icon-line' },
                ]
            },
            {
                label: '模式选择',
                key: 'type',
                type: 'select',
                data: [
                    { label: '实线', value: 'basis', icon: 'deco-icon-line-solid' },
                    { label: '虚线', value: 'dashed', icon: 'deco-icon-line-dashed' },
                ]
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
                label: '高度',
                key: 'height',
                type: 'number'
            },
            {
                label: '分割线颜色',
                key: 'lineColor',
                type: 'color'
            },
        ]
    },

}