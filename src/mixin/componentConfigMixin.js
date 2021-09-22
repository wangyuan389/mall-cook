/*
 * @Description: 组件配置混入
 * @Autor: WangYuan
 * @Date: 2021-06-04 16:31:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:51:49
 */

import Draggable from "vuedraggable";
import ModeSelect from "@/components/ModeSelect";
import DecorateCtn from "@/components/Container/DecorateCtn";
import ModeSelectItem from "@/components/ModeSelect/ModeSelectItem";

export default {
    components: {
        ModeSelect,
        ModeSelectItem,
        DecorateCtn,
        Draggable,
    },
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