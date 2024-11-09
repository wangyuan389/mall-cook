<!--
 * @Description: 内部侧边菜单
 * @Autor: WangYuan
 * @Date: 2021-06-10 16:00:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:50:37
-->
<template>
  <div class="flex h-100">

    <!-- 侧边菜单 -->
    <ul class="meau">
      <li
        class="meau-group"
        v-for="(group,index) in groups"
        :key="index"
      >
        <div class="meau-title">{{group.label}}</div>
        <router-link
          v-for="(item,index) in group.list"
          :key="index"
          :to="{path: item.path}"
          class="maeu-item"
        >
          {{item.name}}
        </router-link>
      </li>
    </ul>

    <!-- 内容容器 -->
    <div class="body flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.meau {
  width: 140px;
  height: 100%;
  padding: 10px;
  background: #ffffff;

  .meau-group {
    &::after {
      content: "";
      display: block;
      height: 1px;
      margin: 15px 10px;
      background: #e3e2e5;
    }

    .meau-title {
      color: #595961;
      margin: 15px 0;
      padding-left: 20px;
      font-size: 12px;
      font-weight: 700;
    }

    .maeu-item {
      display: block;
      min-height: 28px;
      line-height: 28px;
      padding: 5px 20px;
      border-radius: 6px;
      color: #75757e;
      font-size: 12px;
      box-sizing: border-box;
      background: #fff;
      cursor: pointer;
    }
  }
}

.body {
  overflow: auto;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

// 路由激活样式
.active {
  background: #ebedf0 !important;
}
</style>