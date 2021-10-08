/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-24 11:17:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 14:27:40
 */
export default {
    component: 'McGoods',
    label: '商品',
    icon: 'icon-shangpin',
    styles: {
        pagePadding: 0,
        wrapPadding: 0,
        cmpUpperRadius: 0,
        cmpLowerRadius: 0,
        titleColor: '#000000',
        subTitleColor: '#7F8080',
        tabActiveColor: '#000000',
        background: '#ffffff',
        buyBackgroundColor: '#df201e',

    },
    attrs: {
        model: 'transverse',
        tabModel: 'tab2',
        listModel: 'oneCols',
        itemAlign: 'center',
        showTitle: true,
        showInfo: true,
        showOriginalPrice: true,
        buyText: '购买',
    },
    value: {
        goodsData: [{
            id: 1,
            title: '新品',
            label: '上新商品',
            list: []
        }]
    },
}