<!--
 * @Description: 商品分类模板配置
 * @Autor: WangYuan
 * @Date: 2021-09-08 19:37:59
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 10:42:18
-->
<template>
  <div class="categoryTpl m20 p20 bg-white">
    <div
      class="mb20 f14 f-bold"
      style="color:#595961"
    >列表设置</div>
    <div
      class="p10 r10"
      style="background:#f2f2f6"
    >
      <div class="categoryTpl-body">

        <!-- 展示图 -->
        <img
          class="categoryTpl-body-left"
          :src="getImage()"
        >

        <!-- 配置项 -->
        <div class="categoryTpl-body-right">
          <el-form label-width="80px">
            <el-form-item label="默认样式">
              <el-radio
                v-model="categoryTpl.advertising"
                :label="true"
              >开启</el-radio>
              <el-radio
                v-model="categoryTpl.advertising"
                :label="false"
              >关闭</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "categoryTpl",

  computed: {
    ...mapGetters(["project"]),

    categoryTpl() {
      return this.project.config.categoryTpl;
    },
  },

  methods: {
    getImage() {
      return this.categoryTpl.advertising ? require("@/assets/image/pc-template-category-advert.jpg"):require('@/assets/image/pc-template-category-base.jpg')
    },
  },
};
</script>

<style lang="scss" scoped>
.categoryTpl {
  .categoryTpl-body {
    display: flex;
    padding: 10px 30px;

    .categoryTpl-body-left {
      width: 375px;
      margin-right: 30px;
    }

    .categoryTpl-body-right {
      padding-top: 10px;
    }
  }
}
</style>