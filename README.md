<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 14:20:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-07 09:42:02
-->
<!-- [English](./README.md) | 简体中文  -->

<h2 align="center">Mall-Cook - 商城可视化搭建平台</h2>

> 基于vue开发可视化商城搭建平台

> 我前端基建梦想的一小步

## 介绍
Mall-Cook是一个基于vue开发的可视化商城搭建平台，包括多页面可视化构建、Json Schema生成器（可视化搭建物料控制面板），实现组件流水线式标准接入平台。

## 体验
<p data-tool="mdnice编辑器" style="font-size: 16px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;">预览地址：<a href="http://110.42.184.128:8000/#/login" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">传送门</a></p>

<figcaption style="margin-top: 10px;margin-bottom: 10px; text-align: center; color: #888; font-size: 14px;">拖拽构建页面</figcaption>
<img src="https://files.mdnice.com/user/2544/f5f46fc7-38cf-4221-ae81-98274080f832.gif" alt style="display: block; margin: 0 auto; max-width: 100%;">

<figcaption style="margin-top: 30px;margin-bottom: 10px; text-align: center; color: #888; font-size: 14px;">Json-Schema生成器</figcaption>
<img src="https://files.mdnice.com/user/2544/4e087cef-f13a-4b35-8bbf-1b8156740ba0.gif" alt style="display: block; margin: 0 auto; max-width: 100%;">


## 可视化搭建教程
项目从被阮一峰老师推荐到技术周刊，到一天得到200个star深深的激励了我，感谢大佬们的抬爱。

本着授人以鱼不如授人以渔思想，我决定在项目新建shelf分支，正常迭代Mall-Cook情况下，从零重构一套"干净"的可视化架构（很多现成的思路和组件是能复用的，并不是重新写一个），同时会在掘金同步出教程文章详细讲述关键功能点，带大家一览此类平台从零到架构搭建的整个过程，谢谢大家的支持

<figcaption style="margin-top: 10px;margin-bottom: 10px; text-align: center; color: #888; font-size: 14px;">Mall-Cook平台架构</figcaption>
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bf42b58cd14458c8f9d2e9dd7e1e7c2~tplv-k3u1fbpfcp-watermark.image" alt style="display: block; margin: 0 auto; max-width: 100%;">

<p data-tool="mdnice编辑器" style="font-size: 16px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;">可视化搭建教程体验项目：<a href="http://110.42.184.128:7000/#/" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">传送门</a></p>

<p data-tool="mdnice编辑器" style="font-size: 15px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;"><a href="https://juejin.cn/post/7040993073437868063" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">商城可视化搭建平台 Mall-Cook详细介绍</a></p>

<p data-tool="mdnice编辑器" style="font-size: 15px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;"><a href="https://juejin.cn/post/7044432832965378061/" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">手把手带你开发一个低代码可视化平台（一） 实现拖拽搭建面板</a></p>

<p data-tool="mdnice编辑器" style="font-size: 15px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;"><a href="https://juejin.cn/post/7046924227340926983" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">手把手带你开发一个低代码可视化平台（二） 物料JSON构建属性面板流水线</a></p>

<p data-tool="mdnice编辑器" style="font-size: 15px; padding-top: 8px; padding-bottom: 8px; margin: 0; line-height: 26px; color: black;"><a href="https://juejin.cn/post/7049149768328544270" style="text-decoration: none; color: #1e6bb8; word-wrap: break-word; font-weight: bold; border-bottom: 1px solid #1e6bb8;">手把手带你开发一个低代码可视化平台（三） 组件物料复合类型属性</a></p>


## 特性

- 项目基于VUE语言开发
- 暂支持生成H5商城，后续提供生成小程序商城
- 生成商城支持屏幕适配
- 提供物料Json Schema 生成器，根据Json自动生成配置栏
- 提供多页面搭建
- 提供模板商城，可直接套用模板构建商城
- 自定义底部tab菜单



## 安装

```bash
$ npm install         # install cli
$ npm run dev         # 开发
$ npm run build:dev   # 编译发布 (包括平台与h5商城项目)
```

## 结构

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

## to do list
- 持续业务组件开发
- 开发小程序版商城（uni-app）
- 开发物料库（uni-app版），可在现有小程序中引入物料库，传入Mall-Cook配置Json，即可生成页面
- 探索平台接入NPM组件

## Mall-Cook 交流群
大家可以加群交流低代码/零代码可视化搭建
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9dd52f6364940409fb992fa0cfdb243~tplv-k3u1fbpfcp-watermark.image" alt style="display: block; margin: 30px auto; width: 30%;">