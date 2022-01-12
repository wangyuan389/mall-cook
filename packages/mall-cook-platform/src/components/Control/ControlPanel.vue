<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 20:06:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-12 16:54:01
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
          :style="{ height: iframeHeight + 'px' }"
          @dragover="move"
          @drop="drop"
        >
          <li
            ref="layerWidget"
            class="page-layer-widget"
            v-for="(item, index) in hightArr"
            :key="index"
            :style="{ height: item + 'px' }"
            @dragover="layerMove($event, index)"
          ></li>
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
      hightArr: [],
      iframeHeight: 667,
      moveInfo: {},
    };
  },

  watch: {
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
      this.hightArr = e.data;
      this.iframeHeight = this.hightArr.reduce((a, b) => a + b, 0);
      console.log(`当前高度：${this.iframeHeight}`);
    },

    // 阻止dragover默认事件
    move(e) {
      e.preventDefault();
    },

    drop(e) {
      e.preventDefault();
      let widget = e.dataTransfer.getData("widget");

      this.$refs.iframe.contentWindow.postMessage(
        {
          even: "drop",
          widget,
          test: "test1",
        },
        "*"
      );

      this.control.dragstatus = false;
    },

    layerMove(e, index) {
      e.preventDefault();
      let rect = this.$refs.layerWidget[index].getBoundingClientRect();
      let top = e.y - rect.top;
      this.moveInfo = {
        index,
        isTop: top > rect.height / 2,
      };
      console.log(JSON.stringify(this.moveInfo));
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
      // background: cornflowerblue;

      .page-layer-widget {
        width: 100%;
        z-index: 99999;
      }
    }
  }
}
</style>