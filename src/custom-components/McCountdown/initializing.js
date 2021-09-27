/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-24 11:17:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:41:30
 */
export default {
    component: 'McCountdown',
    label: '倒计时',
    icon: 'icon-daojishi',
    style: {
        location: 'left',
        pagePadding: 0,
        cmpUpperPadding: 10,
        cmpLowerPadding: 10,
        cmpUpperRadius: 8,
        titleColor: '#000',
        timeColor: '#000',
        backgroundConfig: {
            type: 'color',
            colorList: {
                angle: 90,
                list: [
                    { color: "#ffffff", proportion: 0 },
                ]
            }
        }
    },
    attr: {
        model: 'one'
    },
    value: {
        text: '活动',
        startTime: '',
        endTime: '',
    },
}