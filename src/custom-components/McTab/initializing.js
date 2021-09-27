/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-24 11:17:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:41:03
 */
export default {
    component: 'McTab',
    label: '图文导航',
    icon: 'icon-daohang',
    style: {
        pagePadding: 10,
        cmpUpperPadding: 10,
        cmpLowerPadding: 10,
        cmpUpperRadius: 0,
        cmpLowerRadius: 0,
        imgPadding: 10,
        imgRadius: 5,
        fontSize: 12,
        titleColor: '#333333',
        cmpBackground: '#fff',
    },
    attr: {
        model: 'fixed',
        type: 'text',
        max: 3,
    },
    value: [
        {
            id: '0001',
            label: '当季新品',
            jump: {}
        },
        {
            id: '0002',
            label: '热销抢购',
            jump: {}
        },
        {
            id: '0003',
            label: '促销商品',
            jump: {}
        },
    ]
}