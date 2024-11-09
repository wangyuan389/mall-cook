<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-08 11:04:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-25 15:19:47
-->
<template>
  <view id="content" class="content">
    <draggable v-model="list" @end="setList">
      <view v-for="item in list" :key="item.id">
        <widget-shape v-if="item" :widget="item">
          <render-widget :item="item"></render-widget>
        </widget-shape>
      </view>
    </draggable>
  </view>
</template>

<script>
import draggable from "@/utils/vuedraggable.umd.min.js";
import WidgetShape from "@/components/widget-shape";
import RenderWidget from "@/components/render-widget";
import { mapMutations } from "vuex";
import domtoimage from "dom-to-image";

export default {
  components: {
    WidgetShape,
    RenderWidget,
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

    // 统一接收平台信息，调用对应方法处理
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        if (e.source != window.parent) return;

        if (e.data) {
          let { even, params } = e.data;

          if (even == "init") self.init(params);

          if (even == "move") self.moveWaiting(self, params);

          if (even == "drop") self.addWidget(self, params);

          if (even == "list") self.list = params;

          if (even == "cover") self.createCover();

          if (even == "changeCurrWidget") self.setCurWidgetId(params.id);
        }
      });
    },

    // 初始化,同步平台商城配置数据
    init(params){
      this.setProject(params.project)
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
      this.list.map((item) => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#widget${item.id}`)
          .boundingClientRect((data) => {
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

    // 移动mating
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
      
      if(watingIndex != -1) {
        self.list.splice(watingIndex, 1, params);
      } else {
        self.list.push(params);
      }

      this.setList();
    },

    // 物料列表变更，通知父容器同步更新
    setList() {
      window.parent.postMessage(
        { type: "setList", params: { list: this.list } },
        "*"
      );
    },

    // 设置选中物料
    setCurWidgetId(id) {
      this.curWidgetId = id;
      window.parent.postMessage({ type: "setCurrWidget", params: { id } }, "*");
    },

    // 创建封面base64,并通知父容器
    async createCover() {
      let node = document.getElementById("content");
      let base64 = await domtoimage.toPng(node);

      window.parent.postMessage(
        { type: "getCoverBase64", params: { base64 } },
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
