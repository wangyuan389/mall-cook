/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 10:19:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-27 20:46:54
 */
export default {
    props: {
        value: {},
        label: {
            type: String,
        },
        options: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            mValue: undefined,
            defaultOptions: {}      // 如有默认options配置，则在调用组件重新定义此变量
        };
    },

    computed: {
        mOptions() {
            return { ...this.defaultOptions, ...this.options }
        }
    },

    watch: {
        value: {
            immediate: true,
            deep:true,
            handler() {
                console.log(111);
                console.log(this.value);
                this.mValue = this.value;
            },
        },
        mValue: {
            handler() {
                this.$emit("input", this.mValue);
                this.$emit("change", this.mValue);
            },
        },
    },
}