/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:13:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:41:33
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