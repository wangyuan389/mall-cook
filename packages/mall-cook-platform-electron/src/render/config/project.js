/*
 * @Description: 项目配置数据
 * @Autor: WangYuan
 * @Date: 2021-08-31 19:57:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-02 09:55:11
 */

// 固定页面集合
export const fixedPages = [
  {
    id: 'search',
    name: '搜索页',
    type: 'fixed'
  },
  {
    id: 'car',
    name: '购物车',
    type: 'fixed'
  },
  {
    id: 'my',
    name: '我的',
    type: 'fixed'
  },
  {
    id: 'category',
    name: '商品分类',
    type: 'fixed'
  }
]

// 导航配置
export const navigation = {
  label: '导航',
  styles: {
    background: '#fff'
  },
  list: [
    {
      id: '00001',
      icon: 'icon-shop',
      text: '首页',
      jump: {
        type: 'custom',
        id: '000000'
      }
    },
    {
      id: '00003',
      icon: 'icon-sort',
      text: '分类',
      jump: {
        type: 'fixed',
        id: 'category'
      }
    },
    {
      id: '00004',
      icon: 'icon-cart',
      text: '购物车',
      jump: {
        type: 'fixed',
        id: 'car'
      }
    },
    {
      id: '00005',
      icon: 'icon-my',
      text: '我的',
      jump: {
        type: 'fixed',
        id: 'my'
      }
    }
  ]
}

// 商品分组配置
export const goodsGroups = [
  {
    name: '新品上架',
    type: '0001',
    level: 1,
    child: []
  },
  {
    name: '热销排行',
    type: '0002',
    level: 1,
    child: []
  }
]

// 商品列表模板配置
export const listTpl = {
  model: 'one',
  addIcon: 'cart'
}

// 商品列表模板配置
export const categoryTpl = {
  advertising: false // 广告位
}

// 商城初始配置
export const rojectModel = {
  name: '',
  cover:
    'https://i.niupic.com/images/2022/11/02/aaa2.jpeg',
  config: {
    navigation: navigation,
    goodsGroups: goodsGroups,
    listTpl: listTpl,
    categoryTpl: categoryTpl,
    hotList: [],
    backgroundColor: '#FFFFFF'
  },
  pages: [
    // 自定义页面集合
    {
      id: '000000',
      name: '首页',
      home: true,
      componentList: []
    }
  ]
}
