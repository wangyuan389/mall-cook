<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-12 17:31:40
-->
<template>
  <view class="content">
    <template v-for="item in list">
      <McTitle
        :id="'widget' + item.id"
        v-if="item.component == 'McTitle'"
        :key="item.id"
        :styles="item.styles"
        :attrs="item.attrs"
        :value="item.value"
      ></McTitle>

      <McImg
        :id="'widget' + item.id"
        v-if="item.component == 'McImg'"
        :key="item.id"
        :imageStyle="item.imageStyle"
        :imageValue="item.imageValue"
      ></McImg>

      <McSearch
        :id="'widget' + item.id"
        v-if="item.component == 'McSearch'"
        :key="item.id"
        :styles="item.styles"
        :value="item.value"
      ></McSearch>

      <McTab
        :id="'widget' + item.id"
        v-if="item.component == 'McTab'"
        :key="item.id"
        :styles="item.styles"
        :tabList="item.tabList"
        :attrs="item.attrs"
      ></McTab>

      <McCapCube
        :id="'widget' + item.id"
        v-if="item.component == 'McCapCube'"
        :key="item.id"
        :styles="item.styles"
        :cube="item.cube"
      ></McCapCube>

      <McCountdown
        :id="'widget' + item.id"
        v-if="item.component == 'McCountdown'"
        :key="item.id"
        :styles="item.styles"
        :value="item.value"
      ></McCountdown>

      <McEmpty
        :id="'widget' + item.id"
        v-if="item.component == 'McEmpty'"
        :key="item.id"
        :styles="item.styles"
      ></McEmpty>

      <McGoods
        :id="'widget' + item.id"
        v-if="item.component == 'McGoods'"
        :key="item.id"
        :styles="item.styles"
        :attrs="item.attrs"
        :goodsData="item.goodsData"
      ></McGoods>

      <McSwiper
        :id="'widget' + item.id"
        v-if="item.component == 'McSwiper'"
        :key="item.id"
        :styles="item.styles"
        :attrs="item.attrs"
        :list="item.list"
      ></McSwiper>

      <McNotice
        :id="'widget' + item.id"
        v-if="item.component == 'McNotice'"
        :key="item.id"
        :noticeStyles="item.noticeStyles"
        :noticeContent="item.noticeContent"
      ></McNotice>
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

  created() {
    this.listeningDom();
  },

  watch: {
    list: {
      deep: true,
      handler() {
        setTimeout(() => {
          this.messageHeight();
        }, 200);
      },
    },
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

    messageHeight() {
      let arr = [];

      this.list.map((item) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#widget${item.id}`)
          .boundingClientRect((data) => {
            console.log(data.height);

            arr.push(data);
          })
          .exec();
      });
      let iframeHeight = arr.reduce((a, b) => a + b.height, 0);
      console.log("page高度:" + iframeHeight);

      window.parent.postMessage(iframeHeight, "*");
    },

    listeningDom() {
      // Firefox和Chrome早期版本中带有前缀
      let MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      new MutationObserver(this.debounce(this.messageHeight)).observe(
        document.body,
        {
          attributes: true,
          childList: true,
          subtree: true,
        }
      );
    },

    // 防抖
    debounce(fn) {
      let timer = null;

      if (timer) {
        return;
      }

      return function () {
        timer = setTimeout(() => {
          fn();
        }, 10);
      };
    },
  },
};
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>
