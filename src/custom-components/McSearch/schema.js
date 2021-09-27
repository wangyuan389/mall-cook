/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:44:00
 */

export default {
    value: {
        label: '搜索框内容',
        type: 'object',
        fields: [
            {
                label: '搜索文本',
                key: 'text',
                type: 'string',
            },
        ]
    },
    attr: {
        label: '导航栏设置',
        type: 'object',
        fields: [
            {
                label: '形状',
                key: 'shape',
                type: 'select',
                data: [
                    { label: '方形', value: 'square' },
                    { label: '圆形', value: 'circular' }
                ]
            },
            {
                label: '文本位置',
                key: 'location',
                type: 'select',
                data: [
                    { label: '居左', value: 'left' },
                    { label: '居中', value: 'center' },
                ]
            },
        ]
    },

}