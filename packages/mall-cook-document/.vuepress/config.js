/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-07 14:28:16
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-08 17:33:34
 */
module.exports = {
  title: 'Mall-Cook',
  description: 'A SaaS mall visual building platform .',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '教程', icon: 'reco-message', link: '/docs/' },
      // { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      {
        text: '线上平台',
        icon: 'reco-other',
        link: 'http://110.42.184.128:8000/#/login'
      },
      {
        text: 'GitHub',
        icon: 'reco-github',
        link: 'https://github.com/wangyuan389/mall-cook'
      }
    ],
    subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    sidebar: {
      '/docs/': [
        {
          title: '产品介绍',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            { title: '研发背景', path: 'product/background' },
            { title: '低代码之我见', path: 'product/insights' },
            { title: '平台速览', path: 'product/quickLook' }
          ]
        },
        {
          title: '快速上手',
          collapsable: false,
          children: [
            { title: '环境准备', path: 'quickLearning/environment' },
            { title: '安装依赖', path: 'quickLearning/install' },
            { title: '本地运行', path: 'quickLearning/localLaunch' },
            { title: '修改配置路径', path: 'quickLearning/changePath' }
          ]
        },
        {
          title: '交流群',
          collapsable: false,
          children: [
            { title: '加入交流群', path: 'group/join' },
          ]
        },
        {
          title: '未完待续',
          collapsable: false
        }
      ]
    },
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: '雨尽阑珊',
    // 作者头像
    authorAvatar: '/avatar.png',
    // 备案号
    // record: 'xxxx',
    // 项目开始时间
    startYear: '2021.12'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  }
}
