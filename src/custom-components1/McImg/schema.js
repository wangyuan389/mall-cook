/*
 * @Description: 配置schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 11:04:36
 */

export default {
    style: {
        label: '图片样式',
        type: 'objct',
        fields: [
            {
                label: '页面边距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '组件圆角',
                key: 'comRadius',
                type: 'number'
            },
        ]
    },
    value: {
        label: '图片数据',
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