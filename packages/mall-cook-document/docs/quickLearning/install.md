---
title: 安装
date: 2022-04-08
---

## 项目结构

项目结构采用 Monorepo 风格，即一个项目仓库 (repo) 中管理多个单独项目 (package)

在 clone 项目源码之后先安装对应依赖，在对应工程目录里执行下载依赖

```javascript
mall-cook                             // 项目仓库  (必须下载依赖)
├─ packages
│  ├─ mall-cook-platform              // 搭建平台  (必须下载依赖)
│  ├─ mall-cook-template              // 渲染引擎  (必须下载依赖)
│  ├─ mall-cook-document              // 文档      (如需使用需下载依赖)
│  ├─ mall-cook-service               // node后端  (如需使用需下载依赖)
├─ scripts
└─ package.json
```

## 项目仓库安装依赖

```bash
npm install
```

## 单独项目安装依赖

```bash
cd 进对应项目目录

npm install
```
