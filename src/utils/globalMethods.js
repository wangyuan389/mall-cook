/*
 * @Description: 全局方法注册
 * @Autor: WangYuan
 * @Date: 2021-03-31 20:00:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 11:02:10
 */
import _ from 'lodash';

export default {
    install: function (Vue) {
        /**
         * 生成随机数  （num 位随机数 + 时间戳）
         */
        Object.defineProperty(Vue.prototype, '$getRandomCode', {
            value: function getRandomCode(num = 8) {
                let data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                let nums = "";
                let timestamp = parseInt(new Date().getTime() / 1000) + ''
                for (let i = 0; i < num; i++) {
                    let r = parseInt(Math.random() * 61);
                    nums += data[r];
                }
                return timestamp + nums;
            }
        })

        /**
         * 判断空数据 (boolean 为非空数据)
         */
        Object.defineProperty(Vue.prototype, '$isNull', {
            value: function isNull(data) {
                if (typeof data != 'boolean' && (typeof data == 'undefined' || data == null || data == '')) {
                    return true
                } else {
                    return false
                }
            }
        })

        /**
         * 根据组件名生成新组件
         */
        Object.defineProperty(Vue.prototype, '$getNewComponent', {
            value: function getNewComponent(component) {
                console.log('执行');
                
                console.log('Vue.prototype.$initializing');
                console.log(Vue.prototype.$initializing);
                console.log(Vue.prototype.$initializing[component]);
                let cmp = _.cloneDeep(Vue.prototype.$initializing[component])
                cmp.id = Vue.prototype.$getRandomCode(6);
                return cmp
            }
        })


        /**
         * 判断目标值是否在两数值区间内
         * @param {*} arr   [start,end] 区间范围
         * @param {*} target 目标值
         */
        Object.defineProperty(Vue.prototype, '$isMid', {
            value: function isMid(arr, target) {
                if (arr[0] <= target && arr[1] >= target) {
                    return true
                }

                return false
            }
        })

        /**
         * 判断两数值区间是否有交集
         * @param {*} arrA 
         * @param {*} arrB 
         */
        Object.defineProperty(Vue.prototype, '$isIntersection', {
            value: function isIntersection(arrA, arrB) {
                var max = [arrA[0], arrB[0]];
                var min = [arrA[1], arrB[1]];

                if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
                    return true
                }

                return false
            }
        })

        /**
         * px to rem
         * 以375像素为画板，创建页面，则转换为375px对应
         * @param {*} data     要转换像素  （px）
         */
        Object.defineProperty(Vue.prototype, '$pxTorem', {
            value: function pxTorem(data) {
                return data / 37.5 + 'rem'
            }
        })

    }
}

