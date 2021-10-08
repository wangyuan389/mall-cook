/*
 * @Description: 配置项 schema
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:03:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 14:27:08
 */

export default {
    value: {
        label: '商品列表',
        type: 'object',
        fields: [
            {
                label: '图片上传',
                key: 'goodsData',
                type: 'goods'
            },
        ]
    },
    attrs: {
        label: '商品设置',
        type: 'object',
        fields: [
            {
                label: '菜单模式',
                key: 'model',
                type: 'select',
                data: [
                    { label: '顶部菜单', value: 'transverse', icon: 'deco-icon-fixed' },
                    { label: '左侧菜单', value: 'vertical', icon: 'deco-icon-scroll' }
                ]
            },
            {
                label: 'tab模式',
                key: 'tabModel',
                type: 'select',
                data: [
                    { label: '样式1', value: 'tab1', icon: 'deco-icon-tabs-1' },
                    { label: '样式2', value: 'tab2', icon: 'deco-icon-tabs-2' },
                    { label: '样式3', value: 'tab3', icon: 'deco-icon-tabs-3' }
                ]
            },
            {
                label: '列表模式',
                key: 'listModel',
                type: 'select',
                data: [
                    { label: '一行两个', value: 'towCols', icon: 'deco-icon-small' },
                    { label: '一行三个', value: 'threeCols', icon: 'deco-icon-three' },
                    { label: '横向滚动', value: 'roll', icon: 'deco-icon-swipe' },
                    { label: '列表', value: 'oneCols', icon: 'deco-icon-list' },
                ]
            },
            {
                label: '对齐方式',
                key: 'itemAlign',
                type: 'select',
                data: [
                    { label: '左对齐', value: 'left', icon: 'deco-icon-align-left' },
                    { label: '居中对齐', value: 'center', icon: 'deco-icon-align-center' },
                ]
            },
            {
                label: '分组标题',
                key: 'showTitle',
                type: 'switch',
            },
            {
                label: '备注',
                key: 'showInfo',
                type: 'switch',
            },
            {
                label: '划线价',
                key: 'showOriginalPrice',
                type: 'switch',
            },
            {
                label: '购买文本',
                key: 'buyText',
                type: 'string',
            },
        ]
    },
    styles: {
        label: '商品样式',
        type: 'object',
        fields: [
            {
                label: '页面间距',
                key: 'pagePadding',
                type: 'number'
            },
            {
                label: '容器间距',
                key: 'wrapPadding',
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
                label: '分组标题',
                key: 'titleColor',
                type: 'color'
            },
            {
                label: '分组副标题',
                key: 'subTitleColor',
                type: 'color'
            },
            {
                label: '背景',
                key: 'background',
                type: 'color'
            },
            {
                label: '选中分组',
                key: 'tabActiveColor',
                type: 'color'
            },
            {
                label: '购买按钮',
                key: 'buyBackgroundColor',
                type: 'color'
            },
        ]
    },


}