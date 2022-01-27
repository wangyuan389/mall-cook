<!--
 * @Description: 首页容器
 * @Autor: WangYuan
 * @Date: 2021-06-10 16:20:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:42:52
-->
<template>
  <div class="main">

    <!-- 侧边菜单 -->
    <ul class="main-meau">
      <img
        class="w40 auto-center mt10 mb30 radius"
        :src="project.logo"
      >
      <template v-for="(item,index) in meauList">
        <router-link :to="{path: item.path}">
          <li class="main-meau-item">
            <i
              class="icon"
              :class="item.icon"
            ></i>
            <span>{{item.name}}</span>
          </li>
        </router-link>
      </template>
    </ul>

    <!-- 内容 -->
    <div class="main-body">
      <top-bar></top-bar>
      <div class="main-body-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import { mapMutations, mapGetters } from "vuex";
import { settingProject } from "@/utils/auth";

export default {
  name: "mall",

  components: {
    TopBar,
  },

  created() {
    // 默认设置首页为当前正在构建页面
    this.setHomePage();

    // 利用闭包保存project数据,在刷新时保存
    let temp = this.project;

    // 当页面刷新时，把当前项目数据保存localStorage中
    window.addEventListener("beforeunload", function (e) {
      settingProject(temp);
    });
  },

  data() {
    return {
      meauList: [
        {
          name: "商城",
          icon: "icon-shop",
          path: "/mall/store",
        },
        {
          name: "页面",
          icon: "icon-fuzhiyemian",
          path: "/mall/pages-manage",
        },
        {
          name: "商品",
          icon: "icon-shangpin-meau",
          path: "/mall/goods",
        },
        {
          name: "构建",
          icon: "icon-list",
          path: "/mall/page-build",
        },
        {
          name: "模板",
          icon: "icon-list",
          path: "/mall/model-manage",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    ...mapMutations(["setHomePage"]),
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100vh; /*no*/
  background: #f7f8fa;

  .main-body {
    flex: 1;

    .main-body-content {
      position: relative;
      height: calc(100% - 60px); /*no*/
      margin-top: 4px;
      overflow: hidden;
    }
  }
}

.main-meau {
  width: 120px; /*no*/
  height: 100%;
  padding-top: 16px; /*no*/
  border-right: 1px solid #ebedf0; /*no*/
  // background: #22242f;
  background: #fff;

  .main-meau-item {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px; /*no*/
    padding: 11px 20px;
    color: #7d7e80;
    cursor: pointer;

    i {
      margin-right: 5px;
      font-size: 18px; /*no*/
      color: #7d7e80;
    }
  }

  .active {
    i {
      color: $color-theme !important;
    }
    .main-meau-item {
      position: relative;
      color: $color-theme !important;

      &::after {
        position: absolute;
        top: 10px; /*no*/
        right: 10px; /*no*/
        content: "";
        width: 4px; /*no*/
        height: 21px; /*no*/
        border-radius: 3px; /*no*/
        background: $color-theme;
      }
    }
  }
}
</style>