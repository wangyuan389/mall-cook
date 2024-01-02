<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 10:18:09
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-08 20:50:34
-->
<template>
  <div class="m20 p20 bg-white">
    <el-form
      label-position="right"
      label-width="120px"
      :model="form"
      ref="form"
      size="small"
      class="mb50"
    >
      <el-form-item label="商品名：" prop="name" :verify="{ maxLen: 30 }">
        <el-input v-model="form.name" style="width: 500px"></el-input>
        <div class="f12 f-grey">商品名称，建议30字以内</div>
      </el-form-item>
      <el-form-item label="商品描述：" prop="describe" :verify="{ maxLen: 60 }">
        <el-input v-model="form.describe" style="width: 500px"></el-input>
        <div class="f12 f-grey">
          在商品详情页标题下面展示卖点信息，建议60字以内
        </div>
      </el-form-item>
      <el-form-item label="商品封面：" prop="cover" verify>
        <FaImageUpload v-model="form.cover" :maxCount="1" />
        <div class="f12 f-grey">建议尺寸：800*800像素</div>
      </el-form-item>
      <el-form-item label="商品图：" prop="imgList" verify>
        <FaImageUpload v-model="form.imgList" :maxCount="10" />
        <div class="f12 f-grey">
          建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传10张
        </div>
      </el-form-item>
      <el-form-item
        label="价格："
        prop="price"
        :verify="{ gte: 0, type: '数字' }"
      >
        <el-input v-model="form.price" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item
        label="划线价："
        prop="originalPrice"
        :verify="{ gte: 0, type: '数字' }"
      >
        <el-input v-model="form.originalPrice" style="width: 150px"></el-input>
      </el-form-item>
      <!-- <el-form-item
        label="库存："
        prop="inventory"
        :verify="{gte:1,lte:10000,type:'数字'}"
      >
        <el-input
          v-model="form.inventory"
          style="width:150px"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="商品详情：">
        <FaRichText style="width: 800px" v-model="form.richText" />
      </el-form-item>
    </el-form>

    <div class="operation">
      <el-button size="small" class="f-white bg-theme" @click="submit()"
        >保存商品</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addGoods, editGoods } from "@/api/goods";

export default {
  created() {
    let form = this.$route.params;
    // 价格改为元设置
    form.price = form.price ? form.price / 100 : 0;
    form.originalPrice = form.originalPrice ? form.originalPrice / 100 : 0;
    this.form = form;
  },
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters(["project"]),
  },
  methods: {
    // 提交
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.id ? this.edit() : this.add();
        }
      });
    },

    // 新增
    async add() {
      let data = this.formatParams({
        projectId: this.project.id,
        ...this.form,
      });

      let { status } = await addGoods(data);

      if (status == "10000") {
        this.$notify({
          title: "成功",
          message: "商品发布成功",
          type: "success",
        });
        this.$router.push({ name: "goods-manager" });
      }
    },

    // 编辑
    async edit() {
      let { status } = await editGoods(this.formatParams(this.form));

      if (status == "10000") {
        this.$notify({
          title: "成功",
          message: "商品修改成功",
          type: "success",
        });
        this.$router.push({ name: "goods-manager" });
      }
    },

    formatParams(target) {
      let data = this.$cloneDeep(target);
      // 价格为统一为分
      data.price = data.price * 100;
      data.originalPrice = data.originalPrice * 100;
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.operation {
  position: fixed;
  bottom: 0px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 1612px;
  box-shadow: 0 -3px 5px #eee;
  background: #fff;
}
</style>
