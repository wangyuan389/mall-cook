/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 10:19:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 16:47:17
 */
export default {
    props: {
        value: {},
        label: {
            type: String,
        },
    },
    
    data() {
        return {
            mValue: undefined,
        };
    },

    watch: {
        value: {
            immediate: true,
            handler() {
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