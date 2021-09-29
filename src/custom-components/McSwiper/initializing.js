/*
 * @Description: 初始数据
 * @Autor: WangYuan
 * @Date: 2021-09-23 19:13:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-29 09:23:02
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
            image: "http://116.62.142.85:8090/img/1632878532574.jpg",
            jump: {}
        },
        {
            id: '0002',
            image: "http://116.62.142.85:8090/img/1632878553443.jpg",
            jump: {}
        },
        {
            id: '0003',
            image: "http://116.62.142.85:8090/img/1632878569981.jpg",
            jump: {}
        },
    ],
}