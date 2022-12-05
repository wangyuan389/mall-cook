<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-09-28 17:23:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-02 09:55:39
-->
<template>
  <div class="manage">
    <div class="manage-body">
      <!-- 广告轮播 -->
      <!-- <el-carousel height="240px" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <div class="advertising" :style="{ background: item.theme }">
            <ul class="flex">
              <li>
                <h2 class="advertising-title">{{ item.title }}</h2>
                <h3 class="advertising-sub">{{ item.subTitle }}</h3>
                <span class="advertising-btn" :style="{ color: item.theme }"
                  >点击试用</span
                >
              </li>
              <li>
                <img class="advertising-image" :src="item.image" />
              </li>
            </ul>
          </div>
        </el-carousel-item>
      </el-carousel> -->

      <!-- 模板列表 -->
      <models-list></models-list>
    </div>
  </div>
</template>

<script>
import ModelsList from "@/components/ModelsList";

export default {
  name: "model-manage",

  components: {
    ModelsList,
  },

  data() {
    return {
      list: [
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.manage {
  padding: 20px;

  .manage-body {
    width: 100%;
    height: 800px;
    padding: 10px;
    background: #fff;

    .advertising {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;

      .advertising-title {
        margin-top: 40px;
        font-size: 29px;
        font-weight: 550;
        color: #fff;
        letter-spacing: 2px;
      }

      .advertising-sub {
        margin-top: 30px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        letter-spacing: 1px;
      }

      .advertising-btn {
        display: inline-block;
        margin-top: 30px;
        padding: 8px 24px;
        border-radius: 2px;
        font-size: 14px;
        background: #fff;
        letter-spacing: 1px;
      }

      .advertising-image {
        width: 120px;
        // height: 220px;
        margin-left: 40px;
      }
    }
  }
}
</style>