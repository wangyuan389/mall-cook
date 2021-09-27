/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:13:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 20:40:55
 */
export default {
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
            id: '0001',
            image: "https://yjtp.yjctrip.com/4/img/202104/585D42D3ED54360DA089975EDD3BFFF598DC0E20.jpg",
            jump: {}
        },
        {
            id: '0002',
            image: "https://yjtp.yjctrip.com/4/img/202104/D9ECB6B3DE230548733A28439E69CFE7059AEB7B.jpg",
            jump: {}
        },
        {
            id: '0003',
            image: "https://yjtp.yjctrip.com/4/img/202104/779D9024D01730EC06B4706F340A7AB51331466C.jpg",
            jump: {}
        },
    ],
}