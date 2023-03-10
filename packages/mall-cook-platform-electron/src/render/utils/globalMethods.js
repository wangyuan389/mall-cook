/*
 * @Description: 全局方法注册
 * @Autor: WangYuan
 * @Date: 2021-03-31 20:00:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-17 10:05:00
 */

export default {
  install: function (Vue) {
    /**
     * 生成随机数  （num 位随机数 + 时间戳）
     */
    Object.defineProperty(Vue.prototype, '$getRandomCode', {
      value: function getRandomCode (num = 8, stamp = true) {
        let data = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        ]
        let nums = ''
        let timestamp = parseInt(new Date().getTime() / 1000) + ''
        for (let i = 0; i < num; i++) {
          let r = parseInt(Math.random() * 61)
          nums += data[r]
        }
        return stamp ? timestamp + nums : nums
      }
    })

    /**
     * 判断空数据 (boolean 为非空数据)
     */
    Object.defineProperty(Vue.prototype, '$isNull', {
      value: function isNull (data) {
        if (
          typeof data != 'boolean' &&
          (typeof data == 'undefined' || data == null || data == '')
        ) {
          return true
        } else {
          return false
        }
      }
    })

    /**
     * 深拷贝
     */
    Object.defineProperty(Vue.prototype, '$cloneDeep', {
      value: function cloneDeepFun (data) {
        return deepClone(data)
      }
    })

    /**
     * 根据组件名生成新组件
     */
    Object.defineProperty(Vue.prototype, '$getNewComponent', {
      value: function getNewComponent (component) {
        let cmp = deepClone(Vue.prototype.$initializing[component])
        cmp.id = Vue.prototype.$getRandomCode(6)
        return cmp
      }
    })

    /**
     * 判断目标值是否在两数值区间内
     * @param {*} arr   [start,end] 区间范围
     * @param {*} target 目标值
     */
    Object.defineProperty(Vue.prototype, '$isMid', {
      value: function isMid (arr, target) {
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
      value: function isIntersection (arrA, arrB) {
        var max = [arrA[0], arrB[0]]
        var min = [arrA[1], arrB[1]]

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
      value: function pxTorem (data) {
        return data / 37.5 + 'rem'
      }
    })
  }
}

function deepClone (obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
