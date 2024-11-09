<!--
 * @Description: 商品菜单
 * @Autor: WangYuan
 * @Date: 2021-06-10 16:00:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:44:12
-->
<template>
  <SideBar :groups='groups'></SideBar>
</template>

<script>
import SideBar from "@/components/SideBar";
export default {
  components: {
    SideBar,
  },

  data() {
    return {
      groups: [
        {
          label: "模拟商品",
          list: [
            {
              name: "全部商品",
              path: "/mall/goods/goods-manager",
            },
            {
              name: "全部分类",
              path: "/mall/goods/group-manager",
            },
          ],
        },
      ],
    };
  },
};
</script>