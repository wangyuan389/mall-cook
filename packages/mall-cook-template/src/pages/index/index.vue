<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-18 11:43:29
-->
<template>
  <view class="content">
    <draggable v-model="list">
      <view v-for="item in list" :key="item.id">
        <WidgetShape v-if="item" :widget="item">
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

          <waitingWidget
            v-if="item.component == 'waiting'"
            :id="'widget' + item.id"
            :key="item.id"
          ></waitingWidget>
        </WidgetShape>
      </view>
    </draggable>
  </view>
</template>

<script>
import draggable from "vuedraggable";
import { mapMutations } from "vuex";
import waitingWidget from "@/components/waitingWidget";
import WidgetShape from "@/components/WidgetShape";

export default {
  components: {
    WidgetShape,
    waitingWidget,
    draggable,
  },

  provide() {
    return {
      page: this,
    };
  },

  data() {
    return {
      curWidgetId: undefined,
      insertIndex: -1,
      watingIndex: 0,
      list: [],
      waiting: {
        id: "-1",
        component: "waiting",
      },
    };
  },

  onLoad() {
    this.getMessage();
  },

  created() {
    this.listeningDom();
  },

  methods: {
    ...mapMutations(["setProject"]),

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
      // console.log("获取页面高度");
      // console.log(JSON.stringify(this.list));

      this.list.map((item) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#widget${item.id}`)
          .boundingClientRect((data) => {
            // console.log(data.height);
            item.height = data.height;
          })
          .exec();
      });

      window.parent.postMessage({ type: "setHeight", params: this.list }, "*");
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

    // iframe通信，接收平台发送信息
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        if (e.source != window.parent) return;

        if (e.data) {
          let { even, params } = e.data;

          if (even == "move") self.moveWaiting(self, params);

          if (even == "drop") self.addWidget(self, params);

          if (even == "list") {
            self.list = params;
          }
        }
      });
    },

    moveWaiting(self, params) {
      let haveWaiting = self.list.find((item) => item.component == "waiting");

      if (params.type == "widget") {
        let index = self.list.findIndex((item) => item.id == params.id);
        let watingIndex = self.list.findIndex(
          (item) => item.component == "waiting"
        );

        if (!haveWaiting) {
          // 没有waiting模块,创建waiting
          self.list.splice(
            params.direction ? index : index + 1,
            0,
            self.waiting
          );
        } else {
          // 已有waiting模块，移动waiting
          let isWaiting = self.list[index].component == "waiting";

          // console.log(`index:${index}`);
          // console.log(`isWaiting:${isWaiting}`);

          if (isWaiting) return;

          const temp = self.list.splice(watingIndex, 1);
          let cuurIndex = self.list.findIndex((item) => item.id == params.id);
          this.insertIndex = params.direction ? cuurIndex : cuurIndex + 1;
          self.list.splice(this.insertIndex, 0, temp[0]);
        }
      } else {
        if (!haveWaiting) {
          this.list.push(self.waiting);
        }
      }
    },

    // 新增物料
    addWidget(self, params) {
      let watingIndex = self.list.findIndex(
        (item) => item.component == "waiting"
      );
      self.list.splice(watingIndex, 1, params);
    },

    // 设置选中物料
    setCurWidgetId(id) {
      this.curWidgetId = id;
      window.parent.postMessage(id, "*");
      window.parent.postMessage(
        { type: "setCurWidget", params: {id} },
        "*"
      );
    },
  },
};
</script>

<style lang='scss'>
page {
  background-color: #f5f5f5;
}
</style>
