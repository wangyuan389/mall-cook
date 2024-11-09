<!--
 * @Description: 商品菜单
 * @Autor: WangYuan
 * @Date: 2021-06-10 16:00:34
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 18:31:33
-->
<template>
  <SideBar :groups='groups'></SideBar>
</template>

<script>
import SideBar from "@/components/SideBar/index.vue";
export default {
  components: {
    SideBar,
  },
  
  data() {
    return {
      groups: [
        {
          label: "个性装修",
          list: [
            {
              name: "商城导航",
              path: "/mall/store/navigation-tpl",
            },
          ],
        },
        {
          label: "系统页面",
          list: [
            {
              name: "列表模板",
              path: "/mall/store/list-tpl",
            },
            {
              name: "分类模板",
              path: "/mall/store/category-tpl",
            },
            {
              name: "搜索页",
              path: "/mall/store/search-tpl",
            },
          ],
        },
      ],
    };
  },
};
</script>