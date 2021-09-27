/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:43:56
 */

export default {
    value: {
        label: '公告内容',
        type: 'object',
        fields: [
            {
                label: '公告文本',
                key: 'text',
                type: 'string',
                options: {
                    placeholder: '请输入公告内容'
                }
            },
            {
                label: '公告图标',
                key: 'image',
                type: 'upload',
            },
        ]
    },
    style: {
        label: '公告样式',
        type: 'object',
        fields: [
            {
                label: '页面边距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '文本颜色',
                key: 'fontColor',
                type: 'color'
            },
            {
                label: '背景色',
                key: 'cmpBackground',
                type: 'color'
            },
        ]
    }
}