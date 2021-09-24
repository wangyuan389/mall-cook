/*
 * @Description: 物料配置文件
 * @Autor: WangYuan
 * @Date: 2021-05-20 20:45:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 15:19:19
 */
import goodsList from './mock'

export default [
    {
        component: 'McTitle',
        label: '标题',
        icon: 'icon-biaotizujian',
        style: {
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
        attr: {
            model: 'left',
        },
        jump: {},
        value: {
            title: 'LEADING SERIES',
            info: '品牌系列推荐'
        },
    },
    {
        component: 'McImg',
        label: '图片',
        icon: 'icon-image',
        style: {
            pagePadding: 0,
            cmpRadius: 0,
        },
        jump: {},
        value: '',
    },
    {
        component: 'McSwiper',
        label: '广告轮播',
        icon: 'icon-swiper',
        jump: {},
        style: {
            pagePadding: 0,
            negativeMarginBottom: 0
        },
        attr: {
            model: 'basis',
            loop: true,
            autoplay: true,
        },
        value: [
            {
                image: "https://yjtp.yjctrip.com/4/img/202104/585D42D3ED54360DA089975EDD3BFFF598DC0E20.jpg",
                jump: {}
            },
            {
                image: "https://yjtp.yjctrip.com/4/img/202104/D9ECB6B3DE230548733A28439E69CFE7059AEB7B.jpg",
                jump: {}
            },
            {
                image: "https://yjtp.yjctrip.com/4/img/202104/779D9024D01730EC06B4706F340A7AB51331466C.jpg",
                jump: {}
            },
        ],
    },
    {
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
            {
                image: "https://img01.yzcdn.cn/upload_files/2021/05/25/FiV_ZJYbimW2Hi5aiAOIN8vwBhtU.jpg",
                label: '当季新品1',
                jump: {}
            },
        ]
    },
    {
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
        value: [],
    },
    {
        component: 'McGoods',
        label: '商品',
        icon: 'icon-shangpin',
        style: {
            wrapPaddingTop: 0,
            wrapBackgroundColor: '',
            wrapBackgroundImage: '',
            tabColor: '#7F8080',
            tabActiveColor: '#000000',
            tabTitleColor: '#000000',
            tabBackground: '#ffffff',
            buyBackgroundColor: '#df201e'
        },
        attr: {
            model: 'transverse',
            tabModel: 'tab2',
            listModel: 'oneCols',
            itemAlign: 'mid',
            itemBold: true,
            tabTitle: true,
            tabLine: true,
            buyText: '购买',
            buyIcon: 'van-icon-shopping-cart-o',
            showName: true,
            showInfo: true,
            showPresentPrice: true,
            showOriginalPrice: true,
            showBuy: true,
        },
        value: goodsList,
    },
    {
        component: 'McEmpty',
        label: '辅助分割',
        icon: 'icon-line',
        style: {
            pagePadding: 0,
            lineType: 'solid',
            lineColor: '#e5e5e5',
            height: 20,
        },
        attr: {
            model: 'basis'
        },
        jump: {},
        value: '',
    },
    {
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
        jump: {},
        value: {
            titleText: '活动',
            startTime: '2021-08-18 00:00:00',
            endTime: '2021-08-22 00:00:00'
        },
    },
    {
        component: 'McNotice',
        label: '公告',
        icon: 'icon-gonggao',
        style: {
            pagePadding: 0,
            cmpBackground: '#fff',
            fontColor: '#8c8b8a',
            iconImage: ''
        },
        jump: {
        },
        value: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
    },
    {
        component: 'McSearch',
        label: '搜索',
        icon: 'icon-image',
        style: {
        },
        attr: {
            shape: 'square',
            location: 'left'
        },
        jump: {},
        value: '',
    },
]

