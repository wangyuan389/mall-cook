<template>
  <view v-show="show" class="full" :style="{ background: bgColor }">
    <view class="loading" :style="{ top: top + '%' }">
      <div class="loader loader1">
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
    </view>
  </view>
</template>

<script>
export default {
  name: "full-loading",
  data() {
    return {};
  },
  props: {
    top: {
      type: [String, Number],
      default: 40,
    },
    show: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: "transparent",
    },
  },
};
</script>

<style lang="scss">
.full {
  position: fixed;
  top: 0;
  width: 750rpx;
  height: 100vh;
  z-index: 100000;
}

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
