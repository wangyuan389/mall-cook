# 商城H5

### 进入此商城H5所需参数
- projectId：projectId查询接口数据进入商城  (必传)
- dataSource：使用此商城H5用途（非必输）  
    1.mock 模拟实时数据  
    2.remote 远程真实数据
    3.null 跳过初始化直接跳入某个页面


### 开发须知
- 首页跳转
    跳转 /coustom 页面，不传pageId, 自定义页面会默认查询首页数据展示
