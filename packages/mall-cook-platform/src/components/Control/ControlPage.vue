<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 20:06:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-12 16:54:01
-->
<template>
  <div class="page">
    <iframe
      class="page-iframe"
      frameborder="no"
      :style="{ height: iframeHeight + 'px' }"
      :src="src"
    ></iframe>
    <div class="page-layer" :style="{ height: iframeHeight + 'px' }" />
  </div>
</template>

<script>
export default {
  created() {
    let self = this;
    window.addEventListener("message", function (e) {
      self.setHeight(e);
    });
  },
  data() {
    return {
      src: "http://192.168.10.70:8080/#/",
      iframeHeight: 667,
    };
  },
  methods: {
    setHeight(e) {
      this.iframeHeight = e.data;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  }
}
</style>