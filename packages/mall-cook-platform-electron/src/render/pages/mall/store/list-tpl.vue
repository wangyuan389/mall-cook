<!--
 * @Description: 商品列表模板配置
 * @Autor: WangYuan
 * @Date: 2021-09-08 19:37:59
 * @LastEditors: June
 * @LastEditTime: 2023-03-10 00:54:34
-->
<template>
  <div class="listTpl m20 p20 bg-white">
    <div
      class="mb20 f14 f-bold"
      style="color:#595961"
    >列表设置</div>
    <div
      class="p10 r10"
      style="background:#f2f2f6"
    >
      <div class="listTpl-body">

        <!-- 展示图 -->
        <img
          class="listTpl-body-left"
          :src="getImage()"
        >

        <!-- 配置项 -->
        <div class="listTpl-body-right">
          <el-form label-width="80px">
            <el-form-item label="默认样式">
              <el-radio
                v-model="listTpl.model"
                label="one"
              >单列</el-radio>
              <el-radio
                v-model="listTpl.model"
                label="two"
              >双列</el-radio>
            </el-form-item>
            <el-form-item label="购物车">
              <el-radio
                v-model="listTpl.addIcon"
                label="cart"
              >样式一</el-radio>
              <el-radio
                v-model="listTpl.addIcon"
                label="add"
              >样式二</el-radio>
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
  name: "listTpl",

  computed: {
    ...mapGetters(["project"]),

    listTpl() {
      return this.project.config.listTpl;
    },
  },

  methods: {
    getImage() {
      let imgUrl = `pc-list-${this.listTpl.model}-${this.listTpl.addIcon}.jpg`;
      return new URL(`../../../assets/image/${imgUrl}`, import.meta.url).href
      // return require("@/assets/image/" + imgUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.listTpl {
  .listTpl-body {
    display: flex;
    padding: 10px 30px;

    .listTpl-body-left {
      width: 375px;
      margin-right: 30px;
    }

    .listTpl-body-right {
      padding-top: 10px;
    }
  }
}
</style>