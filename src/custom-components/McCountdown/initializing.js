/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-24 11:17:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 14:23:21
 */
export default {
    component: 'McCountdown',
    label: '倒计时',
    icon: 'icon-daojishi',
    styles: {
        location: 'left',
        pagePadding: 0,
        cmpUpperPadding: 10,
        cmpLowerPadding: 10,
        cmpUpperRadius: 8,
        cmpBackground: '#fff',
        titleColor: '#000',
        timeColor: '#000',
    },
    attrs: {
        model: 'one'
    },
    value: {
        text: '活动',
        startTime: '',
        endTime: '',
    },
}