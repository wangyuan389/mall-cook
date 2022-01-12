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

      <waitingWidget
        :id="'widget' + item.id"
        v-if="item.component == 'waiting'"
        :key="item.id"
      ></waitingWidget>
    </template>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
import waitingWidget from "@/components/waitingWidget";
export default {
  components: {
    waitingWidget,
  },
  data() {
    return {
      list: [],
      waiting: {
        id: "-1",
        component: "waiting",
      },
    };
  },

  onLoad() {
    this.getMessage();
    this.getMall();
  },

  created() {
    this.listeningDom();
  },

  methods: {
    ...mapMutations(["setProject"]),

    // 获取商城数据
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

    // 监听dom变化，传输页面高度给平台
    listeningDom() {
      let MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      new MutationObserver(this.debounce(this.messageHeight, 100)).observe(
        document.body,
        {
          attributes: true,
          childList: true,
          subtree: true,
        }
      );
    },

    // 获取页面高度
    messageHeight() {
      let hightArr = [];

      this.list.map((item) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#widget${item.id}`)
          .boundingClientRect((data) => {
            // console.log(data.height);

            hightArr.push(data.height);
          })
          .exec();
      });

      window.parent.postMessage(hightArr, "*");
    },

    // 防抖
    debounce(fn, wait) {
      let timer;
      return function () {
        const context = this;
        const args = [...arguments];
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      };
    },

    // iframe通信，接收平台信息
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        if (e.source != window.parent) return;
        if (e.data) {
          let { even, params } = e.data;

          if (even == "move") {
            let index = params.isTop ? params.index : params.index++;

            let waitingIndex = self.list.reduce((cur, item, i) => {
              return item.component == "waiting" ? i : cur;
            }, -1);

            console.log("插入位置");
            console.log(waitingIndex);

            if (waitingIndex == index) return;

            if (waitingIndex != -1) {
              console.log("位置");
              console.log(waitingIndex);
              // waitingIndex < index && index--;
              self.list.splice(waitingIndex, 1);
            }

            console.log("插入位置");
            console.log(index);

            self.list.splice(index, 0, self.waiting);
            console.log(self.list);
          }
        }
      });
    },

    changeLocation(start, end) {},
  },
};
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>
