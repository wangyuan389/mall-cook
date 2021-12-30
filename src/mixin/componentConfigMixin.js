/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-26 20:49:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 10:58:59
 */
/*
 * @Description: 组件配置混入
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:31:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:51:49
 */

import ModeSelect from "@/components/ModeSelect";
import DecorateCtn from "@/components/Container/DecorateCtn";
import ModeSelectItem from "@/components/ModeSelect/ModeSelectItem";

export default {
    components: {
        ModeSelect,
        ModeSelectItem,
        DecorateCtn,
    },
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