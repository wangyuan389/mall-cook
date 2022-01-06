<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-24 10:29:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 16:05:41
-->
<template>
  <el-dialog
    title="选择商品"
    :visible.sync="visible"
    :close-on-click-modal='false'
    :append-to-body='true'
    width="45%"
  >
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="300"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align='center'
        header-align='center'
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名"
        align='center'
        header-align='center'
      >
      </el-table-column>
      <el-table-column
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
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        label="原价（元）"
        align='center'
        header-align='center'
      >
      </el-table-column>
    </el-table>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="visible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { getGoodsList } from "@/api/goods";

export default {
  name: "GoodsConfigChoose",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  created() {
    this.getList();
  },

  data() {
    return {
      visible: false,
      selectList: [],
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  watch: {
    show: {
      immediate: true,
      handler(newValue, oldValue) {
        this.visible = this.show;
      },
    },
    visible: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("update:show", newValue);
      },
    },
  },

  methods: {
    // 获取商城商品列表
    async getList() {
      let { status, list } = await getGoodsList({ projectId: this.project.id });

      if (status == "10000") {
        // 筛选字段
        this.list = list;

        // 根据选中列表id，筛选匹配对应数组，用于勾选回显
        this.selectList = this.list.filter((item) => {
          return this.value.includes(item.id);
        });

        // 勾选回显回调方法
        setTimeout(() => {
          this.toggleSelection(this.selectList);
        }, 0);
      }
    },

    // 勾选回显
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },

    // 勾选选中
    handleSelectionChange(val) {
      this.selectList = val;
    },

    // 提交
    submit() {
      this.$emit(
        "submit",
        this.selectList.map((item) => item.id)
      );
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__title {
    font-size: 14px !important;
    font-weight: 600;
  }
  .el-dialog__body {
    padding: 10px 20px 30px 20px !important;
  }
}

.wrap {
  background: #f2f2f6;
  height: 400px;
  border-radius: 5px;
}
</style>