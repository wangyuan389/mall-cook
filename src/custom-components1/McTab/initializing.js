/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-24 11:17:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 15:18:58
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
        type: 'image',
        max: 3,
    },
    jump: {},
    value: [
        {
            image: "https://img01.yzcdn.cn/upload_files/2021/05/25/FiV_ZJYbimW2Hi5aiAOIN8vwBhtU.jpg",
            label: '当季新品',
            jump: {}
        },
    ]
}