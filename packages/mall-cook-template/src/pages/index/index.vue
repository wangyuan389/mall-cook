<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 16:02:04
-->
<template>
  <view class="content">
    <template v-for="item in list">
      <McTitle
        v-if="item.component == 'McTitle'"
        :key="item.id"
        :styles="item.styles"
        :attrs="item.attrs"
        :value="item.value"
      ></McTitle>

      <McImg
        v-if="item.component == 'McImg'"
        :key="item.id"
        :imageStyle="item.imageStyle"
        :imageValue="item.imageValue"
      ></McImg>

      <McSearch
        v-if="item.component == 'McSearch'"
        :key="item.id"
        :styles="item.styles"
        :value="item.value"
      ></McSearch>

      <McTab
        v-if="item.component == 'McTab'"
        :key="item.id"
        :styles="item.styles"
        :tabList="item.tabList"
        :attrs="item.attrs"
      ></McTab>

      <McCapCube
        v-if="item.component == 'McCapCube'"
        :key="item.id"
        :styles="item.styles"
        :cube="item.cube"
      ></McCapCube>

      <McCountdown
        v-if="item.component == 'McCountdown'"
        :key="item.id"
        :styles="item.styles"
        :value="item.value"
      ></McCountdown>

      <McEmpty
        v-if="item.component == 'McEmpty'"
        :key="item.id"
        :styles="item.styles"
      ></McEmpty>

      <McGoods
        v-if="item.component == 'McGoods'"
        :key="item.id"
        :styles="item.styles"
        :attrs="item.attrs"
        :goodsData="item.goodsData"
      ></McGoods>
    </template>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad() {
    this.getMall();
  },
  methods: {
    ...mapMutations(["setProject"]),

    getMall() {
      uni.request({
        url: "http://110.42.184.128:3000/project/getById",
        method: "POST",
        data: {
          id: "61b9997d03c79373691b874d",
        },
        success: ({ data }) => {
          let project = data.data;
          this.setProject(project);
          this.list = project.pages[0].componentList;
        },
      });
    },
  },
};
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>
