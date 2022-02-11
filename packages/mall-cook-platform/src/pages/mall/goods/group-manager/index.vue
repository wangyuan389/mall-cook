<!--
 * @Description: 商品分类管理
 * @Autor: WangYuan
 * @Date: 2021-09-07 11:49:30
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 11:46:31
-->
<template>
  <div class="m20 p20 bg-white">
    <div class="mt10 mb20">
      <span class="mr20 f14">商品分组</span>
      <span class="f12 f-grey">拖拽可调整分组顺序，保存生效</span>
    </div>

    <div class="p10 bg-grey">

      <!-- 按钮栏 -->
      <div class="flex row-between p15 r8 bg-white">
        <div>
          <el-button
            class="mr10"
            size="small"
            @click="allUnFold"
          >展开全部</el-button>
          <el-button
            size="small"
            @click="allFold"
          >折叠全部</el-button>
        </div>
        <el-button
          size="small"
          @click="addGroup"
        >新增一级分组</el-button>
      </div>

      <!-- 分组拖拽列表 -->
      <draggable v-model="project.config.goodsGroups">
        <div
          v-for="group in project.config.goodsGroups"
          :key="group.type"
          class="group mt10 p10 bg-white"
        >

          <!-- 分组头部 -->
          <div class="group-head flex row-between col-center p15">
            <div>
              <i
                v-if="!group.fold"
                class="el-icon-arrow-right f14 mr10 pointer"
                @click="fold(group)"
              ></i>
              <i
                v-else
                class="el-icon-arrow-down f14 mr10 pointer"
                @click="fold(group)"
              ></i>
              <span class="f12">{{group.name}}</span>
            </div>
            <div class="f-theme f12">
              <span
                class="mr10 pointer"
                @click="addType"
              >新增二级分组</span>
              <span
                class="mr10 pointer"
                @click="editGroup(group)"
              >编辑</span>
              <span
                class="mr10 pointer"
                @click="delGroup(group.type)"
              >删除</span>
            </div>
          </div>

          <!-- 分组内容 -->
          <ul
            v-if="group.child.length && group.fold"
            class="group-body"
          >
            <li
              v-for="item in group.child"
              :key="item.type"
              class="group-body-item"
            >
              <div class="flex-center">
                <img
                class="w35 h35 mr15"
                  :src="item.image"
                />
                <span>{{item.name}}</span>
              </div>
              <div class="f-theme f12">
                <span
                  class="mr10 pointer"
                  @click="editType(item)"
                >编辑</span>
                <span
                  class="pointer"
                  @click="delType(item)"
                >删除</span>
              </div>
            </li>
          </ul>
        </div>
      </draggable>
    </div>

    <edit ref="edit"></edit>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Edit from "./edit.vue";

export default {
  name: "groupManager",

  components: {
    Edit,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    // 折叠
    fold(group) {
      group.fold
        ? this.$set(group, "fold", false)
        : this.$set(group, "fold", true);
    },

    // 折叠全部
    allFold() {
      this.project.config.goodsGroups.map((item) => (item.fold = false));
    },

    // 展开全部
    allUnFold() {
      this.project.config.goodsGroups.map((item) => (item.fold = true));
    },

    // 新增一级分组
    addGroup() {
      this.$refs.edit.open(1);
    },

    // 编辑一级分组
    editGroup(data) {
      this.$refs.edit.open(1, data);
    },

    // 删除一级分组
    delGroup(type) {
      let groups = this.project.config.goodsGroups;
      let index = groups.reduce((pre, cur, i) => {
        if (cur.type == type) pre = i;
        return pre;
      }, 0);
      groups.splice(index, 1);
    },

    // 新增二级分组
    addType() {
      this.$refs.edit.open(2);
    },

    // 编辑二级分组
    editType(data) {
      this.$refs.edit.open(2, data);
    },

    // 删除二级分组
    delType(data) {
      let temp = this.project.config.goodsGroups.find(
        (item) => item.type == data.parentType
      );
      let index = temp.child.reduce((pre, cur, i) => {
        if (cur.type == data.type) pre = i;
        return pre;
      }, 0);
      temp.child.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  .group-head {
    border: 1px solid #e3e2e5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .group-body {
    padding: 5px 15px 5px 50px;
    border-left: 1px solid #e3e2e5;
    border-right: 1px solid #e3e2e5;
    border-bottom: 1px solid #e3e2e5;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 13px;

    .group-body-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 0;
      border-bottom: 1px solid #e3e2e5;

      &:last-child {
        border: 0;
      }
    }
  }
}
</style>