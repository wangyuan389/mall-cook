/*
 * @Description: 组件初始配置
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:13:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 16:27:56
 */
export default {
    component: 'McCapCube',
    label: '魔方',
    icon: 'icon-mofang',
    style: {
        pagePadding: 0,
        cmpRadius: 0,
        imgRadius: 0,
        imgMargin: 0,
        cmpBackground: '',
    },
    attr: {
        model: 'custom',
        row: 3,
    },
    jump: {},
    value: {
        cube: {
            model: 'custom',
            row: 3,
            list: [],
        }
    },
}