<template>
  <view class="wrap">
    <swiper
      class="swiper"
      :style="{ height: swiperHeight + 'px' }"
      :interval="interval"
      :duration="duration"
      :circular="loop"
      @change="change"
      :previous-margin="previousMargin + 'rpx'"
      :next-margin="nextMargin + 'rpx'"
    >
      <swiper-item
        v-for="(item, index) in list"
        :key="index"
        @click="$emit('clickItem', item)"
      >
        <view
          v-if="list && list.length > 0"
          class="item"
          :class="[!crown ? '' : current == index ? 'crown-active' : 'crown']"
        >
          <div :id="'swiper-item' + index">
            <image
              v-if="!slots"
              ref="swiper-item"
              class="item-img"
              :class="[imgShadow ? 'imgShadow' : '']"
              :src="item[imgKey]"
              :style="{ borderRadius: imgRadius + 'px', width: imgWidth + '%' }"
              mode="widthFix"
              @load="load(index)"
            ></image>
            <slot v-else :data="item"></slot>
          </div>
        </view>
      </swiper-item>
    </swiper>
    <view class="dots flex" :style="{ bottom: bottom * 2 + 'rpx' }" v-if="dots">
      <view
        class="dot"
        :class="[current == i ? 'curr-dot' : '']"
        v-for="(d, i) in list"
        :key="i"
      >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    // 轮播图片key
    imgKey: {
      type: String,
      default: "image",
    },
    // 图片圆角
    imgRadius: {
      type: Number,
      default: 0,
    },
    // 图片阴影
    imgShadow: {
      type: Boolean,
      default: false,
    },
    // 前边距
    previousMargin: {
      type: Number,
      default: 0,
    },
    // 后边距
    nextMargin: {
      type: Number,
      default: 0,
    },
    // 图片宽度
    imgWidth: {
      type: Number,
      default: 100,
    },
    // 是否循环
    loop: {
      type: Boolean,
      default: false,
    },
    // 自动播放
    autoplay: {
      type: Boolean,
      default: false,
    },
    // 播放时间间隔
    interval: {
      type: Number,
      default: 2000,
    },
    // 滑动速度
    duration: {
      type: Number,
      default: 1200,
    },
    // 显示指示点
    dots: {
      type: Boolean,
      default: false,
    },
    // 轮播点下边距
    bottom: {
      type: Number,
      default: 10,
    },
    // 卡片特效
    crown: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      swiperHeight: 0,
      current: 0,
      slots: false,
    };
  },

  watch: {
    // 判断异步数据源，是否使用插槽自定义样式
    list: {
      handler(val) {
        if (val.length > 0 && this.$slots.default) {
          this.slots = true;
        }
      },
      immediate: true,
    },
  },

  methods: {
    load(index) {
      console.log("图片加载完成");
      if (index == 0) {
        setTimeout(() => {
          this.setSwiperHeight();
        });
      }
    },
    // 切换
    change(event) {
      this.current = event.detail.current;
      this.$emit("change", this.list[this.current]);
    },

    // 动态设置swiper的高度
    setSwiperHeight() {
      let name = `#swiper-item${this.current}`;
      let query = uni.createSelectorQuery().in(this);
      query.select(name).boundingClientRect();
      query.exec((res) => {
        if (res && res[0]) {
          // console.log("动态设置swiper的高度");
          // console.log(res);
          // console.log(name);
          // console.log(this.swiperHeight);
          this.swiperHeight = res[0].height;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;

  .crown {
    transform: scale(0.93, 0.85);
  }

  .item {
    height: 100%;
    transition: 1.2s;
  }

  .item-img {
    width: 100%;
    height: 100%;
  }

  .imgShadow {
    height: calc(100% - 10px);
    margin-bottom: 10px;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.15);
  }

  .crown-active {
    transform: scale(1);
  }

  .dots {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .dot {
      width: 3px;
      height:3px;
      border-radius: 50%;
      background-color: #d6d6d6;
      margin-right: 4px;
    }

    .curr-dot {
      height: 3px;
      width: 11px;
      border-radius: 3px;
      background-color: #fff;
    }
  }
}
</style>
