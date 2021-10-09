/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:13:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 15:25:59
 */
export default {
    component: 'McCapCube',
    label: '魔方',
    icon: 'icon-mofang',
    styles: {
        pagePadding: 0,
        cmpRadius: 0,
        imgRadius: 0,
        imgMargin: 0,
        cmpBackground: '',
    },
    attrs: {
        model: 'custom',
        row: 3,
    },
    cube: {
        model: 'custom',
        row: 3,
        list: [],
    }
}