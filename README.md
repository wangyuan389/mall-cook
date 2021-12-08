[English](./README.md) | 简体中文 

<h2 align="center">Mall-Cook - 商城可视化搭建平台</h2>

> Mall-Cook平台，可视化拖拽生成移动商城

> 希望完成前端基建的梦想

## 项目体验
<img src="https://files.mdnice.com/user/2544/bf983a4a-e29d-4553-b62c-2e42e9b05e97.jpg" alt style="display: block; margin: 0 auto; max-width: 100%;">

<p data-tool="mdnice编辑器" style="font-size: 16px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;">预览地址：<a href="http://110.42.184.128:8000/#/login" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">传送门</a></p>

## 快速开始开发项目

```bash
$ npm istall          # install cli
$ npm run dev         # 开发
$ npm run build:dev   # 编译发布 (包括平台与h5商城项目)
```

## 项目结构

```javascript
├─ h5                                   // h5项目
│  ├─ api                       
│  ├─ assets                     
│  ├─ components                 
│  ├─ pages                      
│  ├─ router                     
│  ├─ store                      
│  ├─ utils                      
│  ├─ App.vue                    
│  └─ main.js                    
├─ src                                  // admin项目  
│  ├─ api   
│  ├─ assets                         
│  ├─ components              
│  ├─ config                            // 初始配置文件     
│  ├─ custom-components                 // 物料库
│  ├─ custom-schema-template            // 属性组件库
│  ├─ custom-schema-template-set        // 属性面板生成器
│  ├─ mixin                              
│  ├─ pages        
│  ├─ router  
│  ├─ scss  
│  ├─ store  
│  ├─ utils  
│  ├─ App.vue  
│  └─ main.js              
├─ package.json   
└─ webpack.config.js    
```

<!-- ## Omi 生态

[→ Omi 生态学习路线图](https://github.com/Tencent/omi/tree/master/assets/rm.md) -->
### 特性

- 项目基于VUE语言开发
- 暂支持生成H5商城，后续提供生成小程序商城
- 生成商城支持屏幕适配
- 提供物料Json Schema 生成器，根据Json自动生成配置栏
- 提供多页面搭建
- 提供模板商城，可直接套用模板构建商城
- 自定义底部tab菜单

### to do list
- 持续业务组件开发
- 开发小程序版商城（uni-app）
- 开发物料库（uni-app版），可在现有小程序中引入物料库，传入Mall-Cook配置Json，即可生成页面
- 探索平台接入NPM组件

