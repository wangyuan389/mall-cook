<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-19 14:41:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-07 09:21:30
-->
<template>
  <view class="render">
    <McTitle
      v-if="item.component == 'McTitle'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :attrs="item.attrs"
      :value="item.value"
    ></McTitle>

    <McImg
      v-if="item.component == 'McImg'"
      :id="'widget' + item.id"
      :key="item.id"
      :imageStyle="item.imageStyle"
      :imageValue="item.imageValue"
    ></McImg>

    <McSearch
      v-if="item.component == 'McSearch'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :value="item.value"
    ></McSearch>

    <McTab
      v-if="item.component == 'McTab'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :tabList="item.tabList"
      :attrs="item.attrs"
    ></McTab>

    <McCapCube
      v-if="item.component == 'McCapCube'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :cube="item.cube"
    ></McCapCube>

    <McCountdown
      v-if="item.component == 'McCountdown'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :value="item.value"
    ></McCountdown>

    <McEmpty
      v-if="item.component == 'McEmpty'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
    ></McEmpty>

    <McGoods
      v-if="item.component == 'McGoods'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :attrs="item.attrs"
      :goodsData="item.goodsData"
    ></McGoods>

    <McSwiper
      v-if="item.component == 'McSwiper'"
      :id="'widget' + item.id"
      :key="item.id"
      :styles="item.styles"
      :attrs="item.attrs"
      :list="item.list"
    ></McSwiper>

    <McNotice
      v-if="item.component == 'McNotice'"
      :id="'widget' + item.id"
      :key="item.id"
      :noticeStyles="item.noticeStyles"
      :noticeContent="item.noticeContent"
    ></McNotice>

    <waiting-cmp
      v-if="item.component == 'waiting'"
      :id="'widget' + item.id"
      :key="item.id"
    ></waiting-cmp>
  </view>
</template>

<script>
import WaitingCmp from "@/components/waiting-cmp";

export default {
  components: {
    WaitingCmp,
  },

  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.render {
}
</style>