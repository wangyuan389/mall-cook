/*
 * @Description: 组件配置混入
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:31:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-06-05 10:17:18
 */

export default {

    props: {
        config: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        attr() {
            return this.config.attr
        },
        style() {
            return this.config.style
        },
        value() {
            return this.config.value
        },
    }
}