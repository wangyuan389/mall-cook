<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 20:06:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-14 15:38:14
-->
<template>
  <div class="panel">
    <phone-ctn>
      <div class="page">
        <iframe
          ref="iframe"
          class="page-iframe"
          frameborder="no"
          :style="{ height: iframeHeight + 'px' }"
          :src="src"
          @load="messageList"
        ></iframe>

        <!-- 拖拽与iframe交互蒙层 -->
        <ul
          v-if="control.dragstatus"
          class="page-layer"
          type="page"
          :style="{ height: iframeHeight + 'px' }"
          @dragover="move"
          @drop="drop"
        >
          <li
            ref="layerWidget"
            class="page-layer-widget"
            :type="item.component"
            v-for="item in widgetInfoList"
            :key="item.id"
            :style="{ height: item.height + 'px' }"
            @dragover="layerMoveFun($event, item.id)"
          >
            {{ item.id }}
          </li>
        </ul>
      </div>
    </phone-ctn>
  </div>
</template>

<script>
import PhoneCtn from "@/components/Container/PhoneCtn";
export default {
  components: { PhoneCtn },

  inject: ["control"],

  mounted() {
    this.getMessage();
  },

  data() {
    return {
      src: "http://192.168.10.70:8081/#/",
      widgetInfoList: [],
      iframeHeight: 667,
      moveInfo: {},
    };
  },

  watch: {
    "control.curPage.componentList": {
      handler() {
        console.log("触发修改");
        this.messageList();
      },
      deep: true,
    },

    "moveInfo.isTop": {
      handler() {
        this.$refs.iframe.contentWindow.postMessage(
          {
            even: "move",
            params: this.moveInfo,
          },
          "*"
        );
      },
    },
  },

  methods: {
    getMessage() {
      let self = this;
      window.addEventListener("message", function (e) {
        self.setHeight(e);
      });
    },

    setHeight(e) {
      this.widgetInfoList = e.data;
      this.iframeHeight = this.widgetInfoList.reduce((a, b) => a + b.height, 0);
      // console.log(`当前高度：${this.iframeHeight}`);
    },

    // 阻止dragover默认事件
    move(e) {
      e.preventDefault();
      e.stopPropagation();
    },

    drop(e) {
      e.preventDefault();
      e.stopPropagation();
      let widget = JSON.parse(e.dataTransfer.getData("widget"));

      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "drop",
          params: widget,
        },
        "*"
      );

      this.control.dragstatus = false;
    },

    layerMove(e, index) {
      this.throttle(this.layerMoveFun, 10)(e, index);
    },

    layerMoveFun(e, id) {
      e.preventDefault();
      let index = this.widgetInfoList.findIndex((item) => item.id == id);

      this.moveInfo = {
        id,
        isTop: e.offsetY < this.widgetInfoList[index].height / 2,
      };
    },

    // 发送信息，同步iframe种物料数组
    messageList() {
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

  .page {
    position: relative;
    font-size: 0;

    .page-iframe {
      width: 100%;
    }

    .page-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;

      .page-layer-widget {
        width: 100%;
        z-index: 99999;
      }
    }
  }
}
</style>