<template>
  <div class="waiting">
    <div class="waiting-text">组件放置区域</div>
  </div>
</template>

<script>
export default {
  name: "waitingWidget",
};
</script>

<style lang='scss'>
.waiting {
  width: 100%;
  height: 60px /*no*/;
  background-image: url("./waiting.jpg");

  .waiting-text {
    padding: 8px 30px /*no*/;
    background: #5487df;
    color: #fff;
    font-size: 12px /*no*/;
    pointer-events: none;
  }
}
</style>