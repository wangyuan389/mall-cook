<!--
 * @Description: 面板
 * @Autor: WangYuan
 * @Date: 2022-01-11 20:06:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-21 16:00:58
-->
<template>
  <div class="panel">
    <phone-ctn>
      <div class="page">
        <iframe
          v-if="initIframe"
          ref="iframe"
          class="page-iframe"
          frameborder="no"
          :style="{
            height: iframeHeight + 'px',
            pointerEvents: control.dragstatus ? 'none' : 'auto',
          }"
          :src="iframeUrl"
          @load="init"
        ></iframe>

        <!-- 拖拽与iframe交互蒙层 -->
        <div
          class="page-layer"
          type="page"
          :style="{
            height: iframeHeight + 'px',
            zIndex: control.dragstatus ? '20' : '1',
          }"
          @dragover="layerMove"
        >
          <control-widget-shape
            v-for="item in widgetInfoList"
            :key="item.id"
            :data="item"
            @changeCurrWidget="changeCurrWidget"
          >
            <div
              ref="layerWidget"
              class="page-layer-widget"
              type="widget"
              :id="item.id"
              :style="{ height: item.height + 'px' }"
            ></div>
          </control-widget-shape>
        </div>
      </div>

      <!-- 页面设置 -->
      <el-tooltip effect="light" content="页面设置" placement="bottom">
        <div
          class="panel-set flex-center"
          @click="control.curWidget = undefined"
        >
          <i class="el-icon-setting"></i>
        </div>
      </el-tooltip>
    </phone-ctn>
  </div>
</template>

<script>
import ControlWidgetShape from "./ControlWidgetShape.vue";
import global from "@/config/global";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { ControlWidgetShape },

  inject: ["control"],

  created() {
    console.log("创建页面");

    this.initIframe = true;
  },

  mounted() {
    this.control.h5Iframe = this.$refs.iframe;
    this.getMessage();
  },

  destroyed() {
    console.log("注销页面");

    this.initIframe = false;
    window.removeEventListener("message",this.getMessageHandle);
  },

  data() {
    return {
      widgetInfoList: [],
      iframeHeight: 667,
      initIframe: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    iframeUrl() {
      return `${global.viewUrl}pages/build/build?operate=build`;
    },
  },

  // 监听物料列表发生变化，通知iframe同步更新
  watch: {
    "control.curPage.componentList": {
      handler() {
        this.messageList();
      },
      deep: true,
    },
  },

  methods: {
    // 发送信息，同步初始化iframe
    init() {
      console.log("初始化...");

      this.messageInit();
      this.messageList();
    },

    // 接收iframe信息
    getMessage() {
      window.addEventListener("message", this.getMessageHandle);
    },

    getMessageHandle(e) {
      let self = this;
      let { type, params } = e.data;
      switch (type) {
        case "setList":
          self.setList(params);
          break;
        case "setHeight":
          self.setHeight(params);
          break;
        case "setCurrWidget":
          self.setCurrWidget(params);
          break;
      }
    },

    // 设置页面高度
    setHeight(params) {
      this.widgetInfoList = params;
      this.iframeHeight = this.widgetInfoList.reduce((a, b) => a + b.height, 0);
      // console.log(`当前高度：${this.iframeHeight}`);
    },

    // iframe内物料列表发生变化，同步更新
    setList(params) {
      console.log(" iframe内物料列表发生变化，同步更新");
      console.log(params);
      console.log(this.control.curPage.name);

      let { list } = params;
      this.control.curPage.componentList = list;
      console.log(this.project);
    },

    // 设置选中物料
    setCurrWidget(params) {
      let { id } = params;
      this.control.curWidget = this.control.curPage.componentList.find(
        (item) => id == item.id
      );
    },

    // 修改选中物料，并通知iframe，同步更新
    changeCurrWidget(widget) {
      this.setCurrWidget(widget);
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "changeCurrWidget",
          params: { id: widget.id },
        },
        "*"
      );
    },

    // 调用物料拖拽移动(节流)
    layerMove(e, index) {
      this.throttle(this.layerMoveFun, 1)(e, index);
    },

    // 物料拖拽移动,控制waiting移动
    layerMoveFun(e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("物料拖拽移动,控制waiting移动");

      if (!this.control.dragstatus) return;

      let type = e.target.getAttribute("type");
      let params = {
        type: "page",
      };

      if (type == "widget") {
        let [y, h] = [e.offsetY, e.target.offsetHeight];
        params = {
          id: e.target.getAttribute("id"),
          type: "widget",
          direction: y < h / 2,
        };
      }

      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "move",
          params,
        },
        "*"
      );
    },

    // 发送信息，当前商城配置数据
    messageInit() {
      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "init",
          params: { project: this.project },
        },
        "*"
      );
    },

    // 发送信息，同步iframe种物料数组
    messageList() {
      console.log("发送信息，同步iframe种物料数组");
      console.log(this.control.curPage);

      console.log(this.control.curPage.componentList);

      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "list",
          params: this.control.curPage.componentList,
        },
        "*"
      );
    },

    // 节流
    throttle(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  left: 176px; /*no*/
  right: 360px; /*no*/
  height: calc(100% - 56px); /*no*/
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .panel-set {
    position: absolute;
    top: 10px;
    left: -70px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    i {
      font-size: 22px;
      color: #b0afb2;
    }
  }

  .page {
    position: relative;
    font-size: 0;

    .page-iframe {
      position: relative;
      width: 100%;
      z-index: 10;
    }

    .page-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 667px;
      // background: cornflowerblue;

      .page-layer-widget {
        width: 100%;
        z-index: 99999;
      }
    }
  }
}
</style>