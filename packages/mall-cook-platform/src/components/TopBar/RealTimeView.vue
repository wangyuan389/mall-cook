<!--
 * @Description: 实时预览弹窗
 * @Autor: WangYuan
 * @Date: 2021-07-05 17:05:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-28 13:53:02
-->
<template>
  <div class="RealTimeView">
    <el-dialog v-if="mShow" :visible.sync="mShow" width="22%" top="8vh">
      <phone-ctn>
        <iframe
          v-if="mShow"
          ref="iframe"
          class="screen"
          :scrolling="false"
          :src="iframeSrc"
          @load="load"
        ></iframe>
      </phone-ctn>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RealTimeView",

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      mShow: false,
    };
  },

  computed: {
    ...mapGetters(["project"]),

    iframeSrc() {
      return "http://192.168.10.70:8081/#/?operate=realTime";
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mShow = newValue;
      },
    },
    mShow: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("update:show", newValue);
      },
    },
  },

  methods: {
    load() {
      this.$nextTick(() => {
        this.$refs["iframe"] &&
          this.$refs["iframe"].contentWindow.postMessage(this.project, "*");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ctn{
  margin: 0;

  .ctn-height-tag{
    display: none;
  }
}

.screen {
  width: 375px /*no*/;
  height: 667px /*no*/;
  border: 0;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

::v-deep .PhoneCtn {
  width: 414px;
  margin: 0;

  .preview-height-tag {
    display: none;
  }

  .preview-body {
    height: 667px;
    // 隐藏滚动条
  }
}
</style>