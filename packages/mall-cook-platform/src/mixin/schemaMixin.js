/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 10:19:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-12 16:57:32
 */
export default {
    props: {
        id:{},
        value: {},
        label: {
            type: String,
        },
        options: {
            type: Object,
            default: () => {}
        }
    },

    created () {
      console.log('created');  
    },

    destroyed () {
      console.log('destroyed');
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
            handler(newVal,oldVal) {
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