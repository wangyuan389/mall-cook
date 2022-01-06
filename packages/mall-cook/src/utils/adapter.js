/*
 * @Description: 屏幕适配  (当屏幕大于540时，默认设置屏幕为375)
 * @Autor: WangYuan
 * @Date: 2021-05-21 15:11:30
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-05-21 15:57:44
 */
(function (baseFontSize) {
    // 取消ios高清屏适配
    // const ua = navigator.userAgent;
    // const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    // const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    // let dpr = window.devicePixelRatio || 1;
    // if (!isIos && !(matches && matches[1] > 534)) {
    //     // 如果非iOS, 非Android4.3以上, dpr设为1;
    //     dpr = 1;
    // }
    // const scale = 1 / dpr;
    // const metaEl = document.querySelector('meta[name="viewport"]');
    // if (!metaEl) {
    //     metaEl = document.createElement('meta');
    //     metaEl.setAttribute('name', 'viewport');
    //     window.document.head.appendChild(metaEl);
    // }
    // metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

    let clientWidth = document.documentElement.clientWidth > 540 ? 375 : document.documentElement.clientWidth
    document.documentElement.style.fontSize = clientWidth / 10 + 'px';

    console.log('屏幕宽度:' + clientWidth);
    console.log('html字体大小设置:' + document.documentElement.style.fontSize);
})();