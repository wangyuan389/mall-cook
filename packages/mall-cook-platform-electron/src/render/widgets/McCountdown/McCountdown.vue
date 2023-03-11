<!--
 * @Description: 倒计时组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 15:58:12
-->
<template>
  <div>
    <div class="flex col-center p10" :style="[getWrapStyle()]">
      <!-- 标题 -->
      <div class="mr3 f13 f-bold" :style="[getLabelStyle()]">
        <span v-if="status == 'unStart'">距{{ value.text }}开始</span>
        <span v-if="status == 'ongoing'">距{{ value.text }}结束</span>
        <span v-if="status == 'end'">{{ value.text }}已经结束</span>
      </div>

      <!-- 倒计时 -->
      <template v-if="status != 'end'">
        <!-- 样式1 -->
        <div v-if="['one', 'two'].includes(styles.model)" class="flex f12">
          <span>
            <p class="block-time" :style="[getItemStyle()]">
              {{ hour | timeFormat }}
            </p>
            :
          </span>
          <span>
            <p class="block-time" :style="[getItemStyle()]">
              {{ minutes | timeFormat }}
            </p>
            :
          </span>
          <span>
            <p class="block-time" :style="[getItemStyle()]">
              {{ seconds | timeFormat }}
            </p>
          </span>
        </div>

        <!-- 样式2 -->
        <div v-if="styles.model == 'three'" class="f13">
          <span class="ml3 mr3">
            <span
              class="mr3 f18 f-bold"
              :style="{ color: this.styles.timeColor }"
              >{{ hour | timeFormat }}</span
            >时
          </span>
          <span class="mr3">
            <span
              class="mr3 f18 f-bold"
              :style="{ color: this.styles.timeColor }"
              >{{ minutes | timeFormat }}</span
            >分
          </span>
          <span class="">
            <span
              class="mr3 f18 f-bold"
              :style="{ color: this.styles.timeColor }"
              >{{ seconds | timeFormat }}</span
            >秒
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'McCountdown',

  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      status: 'unStart', // unStart:未开始  ongoing:进行中  end:已结束
      over: true,
      diff: 0,
      timer: null
    }
  },

  computed: {
    hour () {
      return Math.floor(this.diff / 1000 / 3600)
    },
    minutes () {
      return Math.floor(this.diff / 1000 / 60) % 60
    },
    seconds () {
      return Math.floor(this.diff / 1000) % 60
    }
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler () {
        let startUni = moment(this.value.startTime).unix()
        let endUni = moment(this.value.endTime).unix()
        let nowUni = moment().unix()
        // console.log("触发");

        // 活动还未到开始时间
        if (nowUni < startUni) {
          console.log('活动还未到开始时间')

          this.status = 'unStart'
          this.countdownHandle()
          // 活动正在进行重
        } else if (startUni <= nowUni && nowUni < endUni) {
          console.log('活动正在进行重')

          this.status = 'ongoing'
          this.countdownHandle()
          // 活动已结束
        } else {
          // console.log("活动已结束");

          this.status = 'end'
          clearTimeout(this.timer)
        }
      }
    },
    'styles.model': {
      handler (newValue, oldValue) {
        if (newValue == 'one') {
          this.styles.timeColor = '#000'
          this.styles.location = 'left'
        } else if (newValue == 'two') {
          this.styles.timeColor = '#db2b13'
          this.styles.location = 'mid'
        } else {
          this.styles.timeColor = '#db2b13'
          this.styles.location = 'mid'
        }
      },
      immediate: true
    }
  },

  filters: {
    // 时间补零格式化
    timeFormat (value) {
      let str = value + ''
      if (str.length == 1) {
        return `0${str}`
      }
      return str
    }
  },

  methods: {
    // 倒计时
    countdownHandle () {
      // 立即执行一次
      this.diffTimeHandle()
      // 定时循环执行
      this.timer = setInterval(() => this.diffTimeHandle(), 1000)
    },

    diffTimeHandle () {
      let now = moment() //当前时间
      //结束时间
      let end =
        this.status == 'unStart'
          ? moment(this.value.startTime)
          : moment(this.value.endTime)
      this.diff = end.diff(now) //时间差

      if (this.diff <= 0) {
        clearTimeout(this.timer)
      }
    },

    getWrapStyle () {
      let location = this.styles.location
      return {
        ...this.$cmpStyle(this.styles),
        // ...this.$getMultiBackground(this.styles.backgroundConfig),
        justifyContent:
          location == 'left'
            ? 'flex-start'
            : location == 'right'
            ? 'flex-end'
            : 'center'
      }
    },

    getLabelStyle () {
      return {
        color: this.styles.titleColor
      }
    },

    // 时间块样式
    getItemStyle () {
      let styleObj = {
        background: this.styles.timeColor
      }

      if (this.styles.model == 'two') {
        styleObj.padding = '5px 5px'
      }

      return styleObj
    }
  }
}
</script>

<style lang="scss" scoped>
.block-time {
  display: inline-block;
  margin: 0 5px;
  padding: 3px 2px;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
}
</style>
