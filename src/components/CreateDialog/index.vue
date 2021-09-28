<!--
 * @Description: 保存
 * @Autor: WangYuan
 * @Date: 2021-09-27 16:53:55
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-28 14:36:10
-->
<template>
  <el-dialog
    :visible.sync="show"
    width="40%"
    top="300px"
  >
    <div class="flex-column col-center">

      <!-- logo -->
      <img
        class="w60 mb30"
        :src="form.icon"
      >

      <!-- form -->
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        style="width:300px"
      >
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
          label="类型"
          prop="name"
          verify
          class="form-item-none"
        >
          <el-radio
            v-model="form.type"
            label="mall"
          >电商商城</el-radio>
          <el-radio
            v-model="form.type"
            label="model"
          >商城模板</el-radio>
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
import { addProject, editProject } from "@/api/project";
import { mapGetters, mapMutations } from "vuex";
import { rojectModel } from "@/config/project";

export default {
  name: "CreateDialog",

  data() {
    return {
      show: false,
      form: {
        type: "mall",
      },
      logos: {
        mall: "http://116.62.142.85:8090/img/1632798754987.png",
        model: "http://116.62.142.85:8090/img/1632808536938.png",
      },
    };
  },

  computed: {
    ...mapGetters(["userInfo"]),
  },

  methods: {
    ...mapMutations(["initProject"]),

    open() {
      this.show = true;
    },

    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.createMall();
        }
      });
    },

    /**
     * 创建商城
     *   1.调用新增接口，新建一个空数据
     *   2.初始化一个商城
     *   2.获取接口数据id，调用编辑接口，把初始化商城设置入新建数据
     *   3.商城创建成功
     */
    async createMall() {
      let project = rojectModel;
      let { name, type } = this.form;
      let data = {
        name,
        type,
        logo: this.logos[type],
      };
      let params = {
        userId: this.userInfo.userId,
        richText: "",
        ...data,
      };

      // 新建一条初始项目数据
      let addRes = await addProject(params);

      // 获取创建数据id,通过编辑把初始化项目设置入数据
      if (addRes.status == "10000") {
        project.id = params.id = addRes.id;
        project = { ...project, ...data };
        params.richText = JSON.stringify(project);

        let editRes = await editProject(params);
        this.initProject(project);

        // 创建初始项目成功，进入商城管理
        if (editRes.status == "10000") {
          this.$router.push({ name: "mall" });
        }
      }
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

.form-item-none {
  border-color: transparent;
}
</style>