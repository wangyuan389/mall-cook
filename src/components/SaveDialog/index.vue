<!--
 * @Description: 保存
 * @Autor: WangYuan
 * @Date: 2021-09-27 16:53:55
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-28 16:43:06
-->
<template>
  <el-dialog
    :visible.sync="show"
    top='50px'
    width="40%"
  >
    <div class="flex-column col-center">

      <!-- logo -->
      <img
        class="w60 mb30 radius"
        :src="project.logo"
      >

      <!-- form -->
      <el-form
        :model="project"
        ref="form"
        label-width="80px"
        style="width:300px"
      >
        <el-form-item
          label="商城名称"
          prop="name"
          verify
        >
          <input
            type="text"
            v-model="project.name"
          >
        </el-form-item>
      </el-form>

      <!-- 封面 -->
      <div class="cover">
        <div class="cover-title">商城封面</div>
        <div class="cover-img">
          <img
            class="w-100"
            :src="project.cover"
          >
        </div>
        <el-tooltip
          effect="light"
          content="更新封面"
          placement="bottom"
        >
          <el-button
            class="cover-btn"
            icon="el-icon-refresh-right"
            circle
            @click="changeCover"
          ></el-button>
        </el-tooltip>
      </div>

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

    <home-cover ref='home-cover'></home-cover>

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

  data() {
    return {
      show: false,
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  methods: {
    open() {
      this.show = true;
    },

    /**
     * 更新封面
     * 成功更新封面图片,失败则更新为默认图片
     */
    changeCover() {
      this.$refs["home-cover"].createCover().then(
        (value) => {
          this.$set(this.project, "cover", value);
          this.$notify({
            title: "成功",
            message: "封面生成成功!",
            type: "success",
          });
        },
        () => {
          this.$set(
            this.project,
            "cover",
            "https://pic4.zhimg.com/80/v2-4e3b0006f64cba037876398ff973e75f_720w.jpg"
          );
          this.$notify.error({
            title: "失败",
            message: "封面生成失败,显示默认封面",
          });
        }
      );
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
      let data = {
        id: this.project.id,
        userId: this.userInfo.userId,
        name: this.project.name,
        richText: JSON.stringify(this.project),
      };

      let { status } = await editProject(data);

      if (status == "10000") {
        this.show = false;
        this.$notify({
          title: "成功",
          message: "商城保存成功",
          type: "success",
        });
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
    right: -60px;
    z-index: 1;
  }
}
</style>