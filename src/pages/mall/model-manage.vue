<!--
 * @Description: 模板商城
 * @Autor: WangYuan
 * @Date: 2021-09-28 17:23:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-29 09:17:29
-->
<template>
  <div class="manage">
    <div class="manage-body">

      <!-- 行业分类 -->
      <ul class="manage-body-head">
        <li
          v-for="(item,index) in industryList"
          :key="index"
          class="manage-body-head-item"
          :class="[item.value==industry?'manage-body-head-active':'']"
        >{{item.label}}</li>
      </ul>

      <!-- 模板列表 -->
      <ul class="manage-body-list">
        <li
          v-for="model in list"
          :key="model.id"
          class="model"
        >
          <img :src="model.cover">
          <div class="model-desc">
            <h3 class="model-desc-name">{{model.name}}</h3>
            <el-tag
              effect='plain'
              size='mini'
              class="mt10"
            >{{getlIndustryName(model.industry)}}</el-tag>
          </div>
          <div class="model-qr">
            <img
              class="w90 m10"
              src="https://img2.baidu.com/it/u=337881232,2354970350&fm=26&fmt=auto"
            >
            <span>扫码预览</span>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { getModelList } from "@/api/project";
import { mallIndustryList } from "@/config/mall";

export default {
  created() {
    this.getModelList();
    this.getlIndustryName();
  },

  data() {
    return {
      mallIndustryList,
      list: [],
      industry: "",
    };
  },

  computed: {
    industryList() {
      this.mallIndustryList.unshift({ label: "全部", value: "" });
      return this.mallIndustryList;
    },
  },

  methods: {
    async getModelList() {
      let { list } = await getModelList();
      this.list = list;
    },

    getlIndustryName(target) {
      let industryMap = mallIndustryList.reduce((pre, cur) => {
        pre.set(cur.value, cur.label);
        return pre;
      }, new Map());

      return industryMap.get(target);
    },
  },
};
</script>

<style lang="scss" scoped>
.manage {
  padding: 15px;

  .manage-body {
    padding: 20px;
    background: #fff;
    min-height: 700px;

    .manage-body-head {
      display: flex;
      margin-bottom: 50px;

      .manage-body-head-item {
        padding: 8px 12px;
        margin: 0 8px 8px 0;
        background: #f2f2f6;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
      }

      .manage-body-head-active {
        color: #2589ff;
        background: rgba(37, 137, 255, 0.1);
      }
    }

    .manage-body-list {
      .model {
        position: relative;
        display: inline-block;
        width: 250px;
        max-height: 420px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
        }

        .model-desc {
          position: absolute;
          left: 0;
          bottom: -20px;
          width: 100%;
          height: 80px;
          padding: 10px;
          background: hsla(0, 0%, 100%, 0.85);
          font-size: 12px;
          color: #595959;
          transition: all 0.3s;
          z-index: 10;
        }

        .model-qr {
          display: none;
          position: absolute;
          top: 20%;
          left: 50%;
          width: 120px;
          height: 130px;
          border-radius: 10px;
          transform: translateX(-50%);
          background: #fff;
          font-size: 12px;
          text-align: center;
          color: #595961;
          z-index: 10;
        }

        &:hover {
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #68656530;
            z-index: 1;
            transition: all 0.3s;
          }

          .model-desc {
            bottom: 0px;
          }

          .model-qr {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>