<!--
 * @Description: 保存
 * @Autor: WangYuan
 * @Date: 2021-09-27 16:53:55
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-02 09:55:02
-->
<template>
  <el-dialog :visible.sync="show" top="50px" width="40%">
    <div class="flex-column col-center">
      <!-- logo -->
      <img class="w60 mb30 radius" :src="project.logo" />

      <!-- form -->
      <el-form
        :model="project"
        ref="form"
        label-width="80px"
        style="width: 300px"
      >
        <el-form-item label="商城名称" prop="name" verify>
          <input type="text" v-model="project.name" />
        </el-form-item>
      </el-form>

      <!-- 封面 -->
      <div class="cover">
        <div class="cover-title">
          <el-button
            icon="el-icon-refresh-right"
            circle
            @click="changeCover"
          ></el-button>
          <span class="ml10 lb-1 f-theme">点击更新商城封面</span>
        </div>
        <div class="cover-img">
          <img class="w-100" :src="project.cover" />
        </div>
      </div>
    </div>

    <!-- submit -->
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" round style="width: 140px" @click="submit"
        >保存</el-button
      >
    </div>

    <home-cover ref="home-cover" @complete="complete"></home-cover>
  </el-dialog>
</template>

<script>
import HomeCover from "./HomeCover.vue";
import { editProject } from "@/api/project";
import { mapGetters } from "vuex";

export default {
  name: "SaveDialog",

  components: {
    HomeCover,
  },

  inject: ["topBar"],

  data() {
    return {
      show: false,
      view: false,
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  methods: {
    open(view) {
      this.show = true;
      this.view = view;
    },

    /**
     * 更新封面
     * 成功更新封面图片,失败则更新为默认图片
     */
    changeCover() {
      this.$refs["home-cover"].init();
    },

    complete(result) {
      console.log("complete.....");
      console.log(result);

      if (result.status == 1) {
        this.$set(this.project, "cover", result.data);
        this.$notify({
          title: "成功",
          message: "封面生成成功!",
          type: "success",
        });
      } else {
        this.$set(
          this.project,
          "cover",
          "https://i.niupic.com/images/2022/11/02/aaa2.jpeg"
        );
        this.$notify({
          title: "失败",
          message: "封面生成失败,显示默认封面",
          type: "warning",
        });
      }
    },

    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.save();
        }
      });
    },

    // 保存
    async save() {
      let { status } = await editProject(this.project);

      if (status == "10000") {
        this.show = false;
        this.$notify({
          title: "成功",
          message: "商城保存成功",
          type: "success",
        });

        if (this.view) {
          this.topBar.openQr();
          this.view = false;
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

.cover {
  position: relative;

  .cover-title {
    margin: 10px 0 15px 0;
  }

  .cover-img {
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }

  .cover-btn {
    position: absolute;
    top: 40px;
    right: -120px;
    z-index: 1;
  }
}
</style>