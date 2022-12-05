<!--
 * @Description: 商城导航
 * @Autor: WangYuan
 * @Date: 2021-06-10 19:31:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-08-11 11:00:51
-->
<template>
  <div class="wrap">
    <!-- 导航展示 -->
    <div style="padding-right: 360px">
      <phone-ctn>
        <div class="edit">
          <nav-bar
            v-bind="project.config.navigation"
            :disabled="true"
          ></nav-bar>
        </div>
      </phone-ctn>
    </div>

    <!-- 导航配置 -->
    <config-ctn title="商城导航">
      <config-wrap>
        <div class="mb15 f13">导航</div>
        <div class="nav">
          <div class="mt10 mb15 f12 f-grey">可配置 1 至 4 个导航</div>
          <div class="mt10 mb15 f12 f-red">主页导航不可配置</div>
          <draggable v-model="navigation.list">
            <div
              class="nav-item"
              v-for="(item, index) in navigation.list"
              v-if="index > 0"
              :key="item.id"
            >
              <div
                v-if="navigation.list.length > 2"
                class="nav-delete"
                @click="navigation.list.splice(index, 1)"
              >
                <i class="f12 icon icon-cha-"></i>
              </div>
              <config-item label="菜单图标" class="flex f13">
                <icon-select v-model="item.icon"></icon-select>
              </config-item>
              <config-item label="菜单名称">
                <el-input
                  v-model="item.text"
                  size="small"
                  maxlength="4"
                  show-word-limit
                ></el-input>
              </config-item>
              <config-item label="跳转页面">
                <jump-select v-model="item.jump"></jump-select>
              </config-item>
            </div>
          </draggable>
          <div v-if="navigation.list.length < 4" class="nav-add" @click="add">
            新增导航
          </div>
        </div>
      </config-wrap>
    </config-ctn>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import IconSelect from "@/components/IconSelect";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    IconSelect,
  },

  computed: {
    ...mapGetters(["project"]),

    navigation() {
      return this.project.config.navigation;
    },
  },

  methods: {
    add() {
      this.navigation.list.push({ value: "" });
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-height: 603px /*no*/;
  background: #f7f8fa;
}
</style>