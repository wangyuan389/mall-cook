<!--
 * @Description: 店铺管理
 * @Autor: WangYuan
 * @Date: 2021-06-10 15:46:39
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-22 16:15:31
-->
<template>
  <div>
    <div class="managet">

      <!-- 头部 -->
      <div class="managet-head">
        <div>
          <img
            class="w50 h50 mr15 radius"
            src='https://img0.baidu.com/it/u=4281814793,1494955010&fm=26&fmt=auto&gp=0.jpg'
            alt=""
          >
          <span class="f14 lb-1 f-grey">{{userInfo.userName}}</span>

        </div>
        <el-button
          size='small f-white bg-theme'
          @click="show=true"
        >创建店铺</el-button>
      </div>

      <!-- 项目列表 -->
      <div class="managet-body">
        <div class="managet-body-content">
          <div
            v-for="mall in mallList"
            :key="mall.id"
            class="managet-body-item"
            :style="getBgStyle()"
            @click="editMall(mall)"
          >
            <div class="mb15 f14 lb-2">{{mall.name}}</div>
            <div class="mb15">
              <span>店铺状态：</span>
              <span>未开启</span>
            </div>
            <span class="managet-body-item-tab">微店铺</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增店铺 -->
    <el-dialog
      title="创建店铺"
      :visible.sync="show"
      width="25%"
      :close-on-click-modal='false'
    >
      <el-form
        :model="form"
        label-width="70px"
      >
        <el-form-item label="名称">
          <el-input
            v-model="form.name"
            size='small'
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="createMall()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getProjectList, addProject, editProject } from "@/api/project";

export default {
  name: "mall-managet",

  created() {
    this.dropProject();
    this.getMallList();
  },

  data() {
    return {
      show: false,
      form: {},
      mallList: [],
    };
  },

  computed: {
    ...mapGetters(["project", "userInfo"]),
  },

  watch: {
    show: {
      immediate: true,
      handler() {
        if (!this.show) this.form = {};
      },
    },
  },

  methods: {
    ...mapMutations(["dropProject", "initProject"]),

    // 获取店铺列表
    async getMallList() {
      let { list } = await getProjectList({ userId: this.userInfo.userId });
      this.mallList = list;
    },

    /**
     * 创建店铺
     *   1.调用新增接口，新建一个空数据
     *   2.初始化一个店铺
     *   2.获取接口数据id，调用编辑接口，把初始化店铺设置入新建数据
     *   3.店铺创建成功
     */
    async createMall() {
      if (!this.form.name) {
        this.$notify({
          message: "请输入店铺名",
          type: "warning",
        });
        return;
      }

      // 项目初始化
      this.initProject();

      // 调用接口创建空数据
      let data = {
        userId: this.userInfo.userId,
        name: this.form.name,
        richText: "",
      };
      let addRes = await addProject(data);

      // 获取创建数据id,通过编辑把初始化项目设置入数据
      if (addRes.status == "10000") {
        this.project.id = data.id = addRes.id;
        this.project.name = this.form.name;
        data.richText = JSON.stringify(this.project);
        let editRes = await editProject(data);

        // 创建初始项目成功，进入店铺管理
        if (editRes.status == "10000") {
          this.$router.push({ name: "mall" });
        }
      }
    },

    // 编辑店铺
    editMall(mall) {
      this.initProject(JSON.parse(mall.richText));
      this.$router.push({ name: "mall" });
    },

    // 动态背景样式
    getBgStyle() {
      let bgList = ["#ada6b5", "#dec2ad", "#E5C6C4", "#DDBAB4", "#d6b2b4"];
      // 获取0-4随机数
      let random = Math.floor(Math.random() * 10);
      random = random >= 5 ? random - 5 : random;
      return {
        background: bgList[random],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.managet {
  width: 800px;
  margin: 100px auto auto auto;
  border-radius: 10px;
  box-shadow: 1px 0 12px rgba(0, 0, 0, 0.1);

  .managet-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
  }

  .managet-body {
    height: 630px;
    padding: 20px;
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .managet-body-content {
      display: flex;
      flex-wrap: wrap;

      .managet-body-item {
        width: 220px;
        padding: 15px;
        margin: 10px 15px;
        border-radius: 5px;
        font-size: 13px;
        color: #fff;
        box-shadow: 1px 0 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;

        .managet-body-item-tab {
          display: inline-block;
          border: solid 1px #fff;
          font-size: 12px;
          padding: 3px;
        }
      }
    }
  }
}
</style>