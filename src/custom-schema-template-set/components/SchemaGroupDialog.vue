<!--
 * @Description: 保存
 * @Autor: WangYuan
 * @Date: 2021-09-27 16:53:55
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 14:13:33
-->
<template>
  <el-dialog
    :visible.sync="show"
    width="40%"
    top="300px"
  >
    <div class="flex-column col-center">
      <!-- form -->
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        style="width:330px"
      >

        <el-form-item
          label="类型"
          prop="type"
          verify
          class="form-item-none"
        >
          <el-radio
            v-for="(val,key) in typeCfg"
            v-model="form.type"
            :label="key"
          >{{val+' schema'}}</el-radio>
        </el-form-item>

        <el-form-item
          label="名称"
          prop="name"
          verify
        >
          <input
            type="text"
            v-model="form.name"
          >
        </el-form-item>

        <el-form-item
          label="属性名"
          prop="key"
          verify
        >
          <input
            type="text"
            v-model="form.key"
          >
        </el-form-item>

      </el-form>

    </div>

    <!-- submit -->
    <div
      slot="footer"
      class="dialog-footer flex-center"
    >
      <el-button
        type="primary"
        round
        style="width:140px"
        @click="submit"
      >保存</el-button>
    </div>

  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  inject: ["typeCfg"],

  data() {
    return {
      show: false,
      type: "add",
      form: {
        type: "object",
        fields: [],
      },
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },

  methods: {
    ...mapMutations(["setProject"]),

    open(data) {
      if (data) {
        this.form = this._.cloneDeep(data);
        this.type = "edit";
      }
      this.show = true;
    },

    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("submit", { type: this.type, form: this.form });
          this.close();
        }
      });
    },

    close() {
      this.show = false;
      this.form = {
        type: "object",
        fields: [],
      };
      this.type = "add";
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  border: 0;
  margin-bottom: 5px;
}

::v-deep .el-form-item {
  padding-bottom: 5px;
  border-bottom: solid 1px #e3e3e3;

  .el-form-item__label {
    text-align: left;
  }

  .el-form-item__error {
    top: 47px;
    left: -80px;
  }
}

::v-deep .el-button--primary {
  background: $color-theme !important;
}

::v-deep .el-select {
  width: 100%;

  input {
    padding-left: 0;
    border: 0;
  }
}

.form-item-none {
  border-color: transparent;
}
</style>