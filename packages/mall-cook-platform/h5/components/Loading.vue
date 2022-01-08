<!--
 * @Description: loading动画组件
 * @Autor: WangYuan
 * @Date: 2021-09-16 18:32:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:45:43
-->
<template>
  <div
    v-if="loading"
    class="bg-white w-100 h-100"
  >
    <div class='loader loader1'>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>

<style lang="scss" scoped>
$grey: rgba(0, 0, 0, 0.5);
$blue: rgba(0, 0, 255, 0.5);

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: rotate(0deg);
    border-top-color: $grey;
  }
  50% {
    transform: rotate(180deg);
    border-top-color: $blue;
  }
  100% {
    transform: rotate(360deg);
    border-top-color: $grey;
  }
}

* {
  box-sizing: border-box;
}

body {
  background: #f9f9f9;
  padding-bottom: 100px;
}

h1,
h3 {
  display: block;
  margin: 0px auto;
  text-align: center;
  font-family: "Tahoma";
  font-weight: lighter;
  color: $grey;
  letter-spacing: 1.5px;
}

h1 {
  margin: 50px auto;
}

@mixin loaderDivMixin {
  border-radius: 50%;
  padding: 3px;
  border: 1px solid transparent;
  animation: rotate linear 3.5s infinite;
}

.loader {
  position: absolute;
  top: 40%;
  left: 40%;
  width: 60px;
  height: 60px;
  display: block;
  overflow: hidden;
  div {
    height: 100%;
  }
}

/* loader 1 */
.loader1,
.loader1 div {
  @include loaderDivMixin;
  border-top-color: $grey;
  border-bottom-color: $blue;
}

div:hover {
  animation-play-state: paused;
}

.loader,
.loader * {
  will-change: transform;
}
</style>