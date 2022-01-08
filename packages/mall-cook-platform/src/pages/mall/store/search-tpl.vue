<!--
 * @Description: 搜索模板配置
 * @Autor: WangYuan
 * @Date: 2021-06-10 19:31:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 11:05:54
-->
<template>
  <div class="wrap">

    <!-- 搜索展示 -->
    <div style="padding-right:360px">
      <preview-ctn>
        <search-bar></search-bar>
      </preview-ctn>
    </div>

    <!-- 搜索配置 -->
    <decorate-ctn title="搜索页设置">
      <config-wrap>
        <div class="mb15 f13">搜索热词</div>
        <div class="nav">
          <div class="mt10 mb15 f12 f-grey">最多配置 5 个精选热词</div>
          <draggable v-model='project.config.hotList'>
            <div
              class="nav-item"
              v-for="(item,index) in project.config.hotList"
              :key="index"
            >
              <div
                class="nav-delete"
                @click="project.config.hotList.splice(index,1)"
              >
                <i class="f12 iconfont icon-cha-"></i>
              </div>
              <el-input
                v-model="item.value"
                size='small'
              ></el-input>
            </div>
          </draggable>
          <div
            v-if="project.config.hotList.length<5"
            class="nav-add"
            @click="add"
          >
            新增
          </div>
        </div>
      </config-wrap>
    </decorate-ctn>
  </div>
</template>

<script>
import PreviewCtn from "@/components/Container/PreviewCtn";
import DecorateCtn from "@/components/Container/DecorateCtn";
import SearchBar from "../../../../h5/components/SearchBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "navigation",

  components: {
    PreviewCtn,
    DecorateCtn,
    SearchBar,
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    add() {
      this.project.config.hotList.push({ value: "" });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>