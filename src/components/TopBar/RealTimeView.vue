<!--
 * @Description: 实时预览弹窗
 * @Autor: WangYuan
 * @Date: 2021-07-05 17:05:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-27 17:04:32
-->
<template>
  <div class="RealTimeView">
    <el-dialog
      :visible.sync="mShow"
      width="24%"
      top='8vh'
    >
      <PreviewCtn>
        <iframe
          v-if="mShow"
          ref="iframe"
          class="screen"
          :scrolling='false'
          :src='getIframeSrc()'
          @load="load"
        ></iframe>
      </PreviewCtn>
    </el-dialog>
  </div>
</template>

<script>
import PreviewCtn from "@/components/Container/PreviewCtn";
import { mapGetters } from "vuex";

export default {
  name: "RealTimeView",

  components: {
    PreviewCtn,
  },

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
        if (newValue) this.load();
        this.$emit("update:show", newValue);
      },
    },
  },

  methods: {
    getIframeSrc() {
      return `http://10.81.180.142:8081/#/?mock=true`;
    },

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
.screen {
  width: 414px /*no*/;
  height: 667px /*no*/;
  border: 0;

  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}

::v-deep .PreviewCtn {
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