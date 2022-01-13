<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 20:06:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-13 17:31:17
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
          >{{item.id}}</li>
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
      src: "http://192.168.0.104:8081/#/",
      widgetInfoList: [],
      iframeHeight: 667,
      moveInfo: {},
    };
  },

  watch: {
    'moveInfo.isTop': {
      handler() {
        console.log('触发....');
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

      // console.log("触发move");
    },

    drop(e) {
      e.preventDefault();
      e.stopPropagation();
      // let widget = e.dataTransfer.getData("widget");

      // this.$refs.iframe.contentWindow.postMessage(
      //   {
      //     even: "drop",
      //     widget,
      //   },
      //   "*"
      // );

      // this.control.dragstatus = false;
    },

    layerMove(e, index) {
      this.throttle(this.layerMoveFun, 100)(e, index);
    },

    layerMoveFun(e, id) {
      e.preventDefault();
      let index = this.widgetInfoList.findIndex((item) => item.id == id);
      let rect = this.$refs.layerWidget[index].getBoundingClientRect();

      this.moveInfo = {
        id,
        isTop: e.offsetY < this.widgetInfoList[index].height / 2,
        // isTop:true
      };
      // console.log(`e.y:${e.offsetY}`);
      // console.log(`height:${this.widgetInfoList[index].height}`);

      // console.log(JSON.stringify(this.moveInfo));

      // this.$refs.iframe.contentWindow.postMessage(
      //   {
      //     even: "move",
      //     params: this.moveInfo,
      //   },
      //   "*"
      // );
    },

    // 拖拽移动组件中
    // layerMoveFun(e) {
    //   e.preventDefault();
    //   e.stopPropagation();

    //   console.log(`y:${e.offsetY}`);
    // },
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
      // background: cornflowerblue;

      .page-layer-widget {
        width: 100%;
        z-index: 99999;
        border: solid 1px;
        // background: #fff;
        // color: #000;
        // font-size: 12px;
      }
    }
  }
}
</style>