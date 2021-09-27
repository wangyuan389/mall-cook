/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:44:16
 */

export default {
    value: {
        label: '标题内容',
        type: 'object',
        fields: [
            {
                label: '标题',
                key: 'title',
                type: 'string',
                options: {
                    placeholder: '请输入标题内容'
                }
            },
            {
                label: '副标题',
                key: 'info',
                type: 'string',
                options: {
                    placeholder: '请输入副标题内容'
                }
            },
        ]
    },
    attr: {
        label: '标题模式',
        type: 'object',
        fields: [
            {
                label: '模式选择',
                key: 'model',
                type: 'select',
                data: [
                    { label: '居左', value: 'left', icon: 'deco-icon-align-left' },
                    { label: '居中', value: 'center', icon: 'deco-icon-align-center' }
                ]
            },
        ]
    },
    style: {
        label: '标题样式',
        type: 'object',
        fields: [
            {
                label: '页面边距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '上边间距',
                key: 'cmpUpperPadding',
                type: 'number'
            },
            {
                label: '下边间距',
                key: 'cmpLowerPadding',
                type: 'number'
            },
            {
                label: '上边圆角',
                key: 'cmpUpperRadius',
                type: 'number'
            },
            {
                label: '下边圆角',
                key: 'cmpLowerRadius',
                type: 'number'
            },
            {
                label: '标题字体',
                key: 'titleSize',
                type: 'number'
            },
            {
                label: '副标题字体',
                key: 'infoSize',
                type: 'number'
            },
            {
                label: '标题颜色',
                key: 'titleColor',
                type: 'color'
            },
            {
                label: '副标题颜色',
                key: 'infoColor',
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