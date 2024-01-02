<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-07 14:45:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-29 16:27:26
-->
<template>
  <div class="edit">
    <el-dialog
      :title="type=='add' ? '新增分组' : '编辑分组'"
      :visible.sync="show"
      width="25%"
    >
      <div class="auto-center">
        <el-form
          :model="form"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >

          <el-form-item
            label="级别"
            prop="level"
            verify
          >
            <el-radio
              v-model="form.level"
              :label="1"
              :disabled="type=='edit'"
            >一级</el-radio>
            <el-radio
              v-model="form.level"
              :label="2"
              :disabled="type=='edit'"
            >二级</el-radio>
          </el-form-item>

          <el-form-item
            v-if="form.level=='1'"
            label="一级分组名称"
            prop="name"
            :verify="{maxLen: 4}"
          >
            <el-input
              v-model="form.name"
              maxlength="4"
              show-word-limit
              style="width:150px"
              size='small'
            ></el-input>
          </el-form-item>

          <template v-if="form.level=='2'">
            <el-form-item
              label="上级分组"
              prop="parentType"
              verify
            >
              <el-select
                v-model="form.parentType"
                placeholder="请选择上级分组"
                style="width:150px"
                size='small'
                :disabled="type=='edit'"
              >
                <el-option
                  v-for="item in project.config.goodsGroups"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                >
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item
              label="二级分组名称"
              prop="name"
              :verify="{maxLen: 6}"
            >
              <el-input
                v-model="form.name"
                maxlength="4"
                show-word-limit
                style="width:150px"
                size='small'
              ></el-input>
            </el-form-item>
            <el-form-item
              label="二级分组图片"
              prop="image"
              verify
            >
              <FaImageUpload
                :maxCount="1"
                v-model="form.image"
              />
            </el-form-item>
            <el-form-item
              label="二级分组商品"
              prop="shopList"
            >
              <groupGoods v-model="form.shopList"></groupGoods>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import groupGoods from "./groupGoods.vue";

export default {
  components: {
    groupGoods,
  },

  data() {
    return {
      type: "",
      form: {},
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },
  
  methods: {
    // 打开弹窗
    open(level, data) {
      if (!data) {
        this.type = "add";
        this.form = {
          level,
        };
      } else {
        this.type = "edit";
        this.form = this.$cloneDeep(data); // 深拷贝
      }
      this.show = true;
    },

    // 关闭弹窗
    close() {
      this.type = "";
      this.form = {};
      this.show = false;
    },

    // 提交
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.type == "add" ? this.add() : this.edit();
          this.close();
        } else {
          return false;
        }
      });
    },

    add() {
      // 新增一级分类
      if (this.form.level == 1) {
        this.form.type = this.$getRandomCode(4);
        this.form.child = [];
        this.project.config.goodsGroups.push(this.form);
      } else {
        // 新增二级分类
        this.form.type = this.$getRandomCode(4);
        let temp = this.project.config.goodsGroups.find(
          (item) => item.type == this.form.parentType
        );
        temp.child.push(this.form);
      }
    },

    edit() {
      // 编辑一级分类
      if (this.form.level == 1) {
        let temp = this.project.config.goodsGroups.find(
          (item) => item.type == this.form.type
        );
        temp.name = this.form.name;
      } else {
        // 编辑二级分类
        let temp = this.project.config.goodsGroups.find(
          (item) => item.type == this.form.parentType
        );
        let index = temp.child.reduce((pre, cur, i) => {
          if (cur.type == this.form.type) pre = i;
          return pre;
        }, 0);
        temp.child.splice(index, 1, this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  display: inline-block;
  margin: 0 auto;
}
</style>
