<!--
 * @Description: 商品管理
 * @Autor: WangYuan
 * @Date: 2021-08-16 16:46:55
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-08 20:50:29
-->
<template>
  <div class="m20 p20 bg-white">
    <div class="mb20">
      <el-button
        size='small'
        class='f-white bg-theme'
        @click="add"
      >发布商品</el-button>
    </div>

    <!-- 表格 -->
    <div class="mt30">
      <el-table
        :data="list"
        :header-cell-style="{background:'#f7f8fa',color:'#323233',fontWeight:500}"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="商品名"
          align='center'
          header-align='center'
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品封面"
          align='center'
          header-align='center'
        >
          <template slot-scope="scope">
            <img
              class="w50 h50"
              :src="scope.row.cover"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格（元）"
          align='center'
          header-align='center'
        >
          <template slot-scope="scope">
            {{scope.row.price | moneyDec}}
          </template>
        </el-table-column>
        <el-table-column
          prop="originalPrice"
          label="原价（元）"
          align='center'
          header-align='center'
        >
          <template slot-scope="scope">
            {{scope.row.originalPrice | moneyDec}}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="inventory"
          label="库存"
          align='center'
          header-align='center'
        >
        </el-table-column> -->

        <el-table-column
          label="操作"
          align='center'
          header-align='center'
        >
          <template slot-scope="scope">
            <span
              class="mr5 f-theme pointer"
              @click="edit(scope.row)"
            >编辑</span>
            <span
              class="ml5 mr5 f-theme pointer"
              @click="copy(scope.row)"
            >复制</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsList, copyGoods } from "@/api/goods";

export default {
  name: "goodsManager",

  created() {
    this.getList();
  },

  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  methods: {
    async getList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });
      if (status == "10000") this.list = list;
    },

    add() {
      this.$router.push({ name: "goods-edit" });
    },

    edit(params) {
      this.$router.push({
        name: "goods-edit",
        params: this.$cloneDeep(params),
      });
    },

    async copy(data) {
      let { status } = await copyGoods(data);

      if (status == "10000") {
        this.getList();
        this.$notify({
          title: "成功",
          message: "商品复制成功",
          type: "success",
        });
      }
    },
  },
};
</script>