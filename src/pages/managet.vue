<!--
 * @Description: 商城管理
 * @Autor: WangYuan
 * @Date: 2021-06-10 15:46:39
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-28 16:31:26
-->
<template>
  <div class="manage">

    <!-- 头部菜单 -->
    <div class="manage-head">
      <div class="manage-head-content">
        <el-button
          size='small f-white bg-theme'
          @click="create"
        >立即创建</el-button>
      </div>
    </div>

    <!-- 内容 -->
    <div
      v-for="(type,index) in list"
      :key="index"
      class="manage-body"
    >
      <h2 class="manage-body-title">
        {{type.title}}
        <span>{{type.subTitle}}</span>
      </h2>

      <ul class="list">
        <li
          class="list-item"
          v-for="item in type.list"
          :key="item.id"
        >
          <div
            class="list-item-content"
            @click="update(item)"
          >
            <img
              :src="item.logo"
              class="w50 mt10 radius"
            >
            <div class="mt25 f20">{{item.name}}</div>
            <div class="list-item-content-type">{{type.title}}</div>
            <div class="list-item-content-btn">
              <span @click="update(item)">修改</span>
              <span @click.stop="del(item.id)">删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 页尾 -->
    <div class="footer"></div>

    <create-dialog ref="create"></create-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getProjectList } from "@/api/project";
import { mallType } from "@/config/mall";
import CreateDialog from "@/components/CreateDialog";

export default {
  name: "mall-managet",

  components: {
    CreateDialog,
  },

  created() {
    this.dropProject();
    this.getMallList();
  },

  data() {
    return {
      show: false,
      form: {},
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  watch: {
    show: {
      immediate: true,
      handler() {
        if (!this.show) this.form = {};
      },
    },
  },

  methods: {
    ...mapMutations(["dropProject", "initProject"]),

    // 获取商城列表
    async getMallList() {
      let map = new Map();
      let temp = mallType;
      temp.map((item) => {
        item.list = [];
        map.set(item.type, item.list);
      });

      let { list } = await getProjectList({ userId: this.userInfo.userId });

      list.map((itme) => {
        let list = map.get(itme.type);
        list && list.push(itme);
      });

      this.list = temp;
    },

    // 创建商城
    create() {
      this.$refs["create"].open();
    },

    // 编辑商城
    update(mall) {
      this.initProject(JSON.parse(mall.richText));
      this.$router.push({ name: "mall" });
    },

    // 删除商城
    del(id) {},
  },
};
</script>

<style lang="scss" scoped>
.manage {
  position: relative;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .manage-head {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);

    .manage-head-content {
      width: 970px;
      margin: 0 auto;
      line-height: 50px;
      text-align: right;
    }
  }

  .manage-body {
    width: 1000px;
    margin: 100px auto;

    .manage-body-title {
      font-size: 18px;
      color: #1b1c26;
      margin-bottom: 20px;
      padding: 0 15px;
      font-weight: 700;

      span {
        color: #ced1d6;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
        height: 300px;

        .list-item-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 220px;
          margin: 10px 15px 50px;
          padding-top: 20px;
          border-radius: 10px;
          background-image: linear-gradient(-50deg, #edf1f7, #ebedf4);
          box-shadow: 0 5px 10px 0 rgba(2, 31, 65, 0.05);
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            box-shadow: 0 20px 40px 0 rgba(15, 48, 85, 0.1);
            margin-top: 5px;
          }

          .list-item-content-type {
            position: relative;
            margin-top: 15px;
            font-size: 14px;
            color: #61616a;
            line-height: 24px;

            &::after {
              content: "";
              position: absolute;
              top: 50%;
              right: -50px;
              width: 35px;
              height: 1px;
              background-color: #e1e0e6;
            }

            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: -50px;
              width: 35px;
              height: 1px;
              background-color: #e1e0e6;
            }
          }

          .list-item-content-btn {
            margin: 50px auto 25px;
            width: 180px;
            height: 40px;
            line-height: 40px;
            border-radius: 100px;
            background-color: hsla(0, 0%, 100%, 0.4);

            span {
              display: inline-block;
              width: 50%;
              height: 100%;
              font-size: 12px;
              color: #61616a;
              text-align: center;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 200px;
    width: 100%;
  }
}
</style>