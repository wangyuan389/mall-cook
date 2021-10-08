/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:13:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 13:50:19
 */
export default {
    component: 'McTitle',
    label: '标题',
    icon: 'icon-biaotizujian',
    styles: {
        pagePadding: 0,
        cmpUpperPadding: 10,
        cmpLowerPadding: 10,
        cmpUpperRadius: 0,
        cmpLowerRadius: 0,
        titleSize: 20,
        tilteWeight: 100,
        titleColor: '#333333',
        infoSize: 12,
        infoWeight: 100,
        infoColor: '#999999',
        cmpBackground: '#fff',
    },
    attrs: {
        model: 'left',
    },
    value: {
        title: 'LEADING SERIES',
        info: '品牌系列推荐'
    },
}