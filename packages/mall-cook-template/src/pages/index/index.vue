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
    </template>
  </view>
</template>

<script>
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
    getMall() {
      uni.request({
        url: "http://110.42.184.128:3000/project/getById",
        method: "POST",
        data: {
          id: "61b9997d03c79373691b874d",
        },
        success: (res) => {
          console.log("....");
          console.log(res.data.data.pages[0].componentList);
          this.list = res.data.data.pages[0].componentList;
        },
      });
    },
  },
};
</script>

<style>
.content {
  background-color: #f5f5f5;
  height: 100vh;
}
</style>
