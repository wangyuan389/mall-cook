/*
 * @Description: 组件配置混入
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:31:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 10:58:42
 */

export default {

    props: {
        attr: {
            type: Object,
            default: () => { }
        },
        style: {
            type: Object,
            default: () => { }
        },
        value: {
            type: Object,
            default: () => { }
        },
    },
}