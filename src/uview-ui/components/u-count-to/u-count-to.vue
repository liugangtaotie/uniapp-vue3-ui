<template>
  <view class="u-count-num" :style="fontStyle">
    {{ displayValue }}
  </view>
</template>

<script lang='ts'>
/**
 * countTo 数字滚动
 * @description 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。
 * @tutorial https://www.uviewui.com/components/countTo.html
 * @property {String Number} start-val 开始值
 * @property {String Number} end-val 结束值
 * @property {String Number} duration 滚动过程所需的时间，单位ms（默认2000）
 * @property {Boolean} autoplay 是否自动开始滚动（默认true）
 * @property {String Number} decimals 要显示的小数位数，见官网说明（默认0）
 * @property {Boolean} use-easing 滚动结束时，是否缓动结尾，见官网说明（默认true）
 * @property {String} separator 千位分隔符，见官网说明
 * @property {String} color 字体颜色（默认#303133）
 * @property {String Number} font-size 字体大小，单位rpx（默认50）
 * @property {Boolean} bold 字体是否加粗（默认false）
 * @event {Function} end 数值滚动到目标值时触发
 * @example <u-count-to ref="uCountTo" :end-val="endVal" :autoplay="autoplay"></u-count-to>
 */
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";
let instanceProxy: any;

export default defineComponent({
  name: "u-count-to",

  props: {
    // 开始的数值，默认从0增长到某一个数
    startVal: {
      type: [Number, String],
      default: 0,
    },
    // 要滚动的目标数值，必须
    endVal: {
      type: [Number, String],
      default: 0,
      required: true,
    },
    // 滚动到目标数值的动画持续时间，单位为毫秒（ms）
    duration: {
      type: [Number, String],
      default: 2000,
    },
    // 设置数值后是否自动开始滚动
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 要显示的小数位数
    decimals: {
      type: [Number, String],
      default: 0,
    },
    // 是否在即将到达目标数值的时候，使用缓慢滚动的效果
    useEasing: {
      type: Boolean,
      default: true,
    },
    // 十进制分割
    decimal: {
      type: [Number, String],
      default: ".",
    },
    // 字体颜色
    color: {
      type: String,
      default: "#303133",
    },
    // 字体大小
    fontSize: {
      type: [Number, String],
      default: 50,
    },
    // 是否加粗字体
    bold: {
      type: Boolean,
      default: false,
    },
    // 千位分隔符，类似金额的分割(￥23,321.05中的",")
    separator: {
      type: String,
      default: "",
    },
  },

  emits: ["end"],

  setup(props: any, { emit }) {
    let state: any = reactive({
      localStartVal: props.startVal,
      displayValue: formatNumber(props.startVal),
      printVal: null,
      paused: false, // 是否暂停
      localDuration: Number(props.duration),
      startTime: null, // 开始的时间
      timestamp: null, // 时间戳
      remaining: null, // 停留的时间
      rAF: null,
      lastTime: 0, // 上一次的时间
    });

    watch(
      () => props.startVal,
      (newVal, oldVal) => {
        instanceProxy.autoplay && start();
      }
    );

    watch(
      () => props.endVal,
      (newVal, oldVal) => {
        instanceProxy.autoplay && start();
      }
    );

    const countDown = computed(() => {
      return props.startVal > props.endVal;
    });

    const fontStyle = computed(() => {
      let style: any = {};
      style["font-size"] = props.fontSize + "rpx";
      style["font-weight"] = props.bold ? "bold" : "normal";
      style.color = props.color;
      return styleObjToString(style);
    });

    function easingFn(t, b, c, d) {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    }

    function requestAnimationFrame(callback) {
      const currTime = new Date().getTime();
      // 为了使setTimteout的尽可能的接近每秒60帧的效果
      const timeToCall = Math.max(0, 16 - (currTime - state.lastTime));
      const id = setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      state.lastTime = currTime + timeToCall;
      return id;
    }

    function cancelAnimationFrame(id) {
      clearTimeout(id);
    }

    // 开始滚动数字
    function start() {
      state.localStartVal = props.startVal;
      state.startTime = null;
      state.localDuration = props.duration;
      state.paused = false;
      state.rAF = requestAnimationFrame(instanceProxy.count);
    }

    // 暂定状态，重新再开始滚动；或者滚动状态下，暂停
    function reStart() {
      if (state.paused) {
        resume();
        state.paused = false;
      } else {
        stop();
        state.paused = true;
      }
    }

    // 暂停
    function stop() {
      cancelAnimationFrame(state.rAF);
    }

    // 重新开始(暂停的情况下)
    function resume() {
      state.startTime = null;
      state.localDuration = state.remaining;
      state.localStartVal = state.printVal;
      requestAnimationFrame(instanceProxy.count);
    }

    // 重置
    function reset() {
      state.startTime = null;
      cancelAnimationFrame(state.rAF);

      state.displayValue = formatNumber(props.startVal);
    }

    function count(timestamp) {
      console.log("instanceProxy:", countDown.value);

      if (!state.startTime) state.startTime = timestamp;
      state.timestamp = timestamp;
      const progress = timestamp - state.startTime;
      state.remaining = state.localDuration - progress;
      if (props.useEasing) {
        if (countDown.value) {
          state.printVal =
            state.localStartVal -
            easingFn(progress, 0, state.localStartVal - props.endVal, state.localDuration);
        } else {
          state.printVal = easingFn(
            progress,
            state.localStartVal,
            props.endVal - state.localStartVal,
            state.localDuration
          );
        }
      } else {
        if (countDown.value) {
          state.printVal =
            state.localStartVal -
            (state.localStartVal - props.endVal) * (progress / state.localDuration);
        } else {
          state.printVal =
            state.localStartVal +
            (props.endVal - state.localStartVal) * (progress / state.localDuration);
        }
      }
      if (countDown.value) {
        state.printVal = state.printVal < props.endVal ? props.endVal : state.printVal;
      } else {
        state.printVal = state.printVal > props.endVal ? props.endVal : state.printVal;
      }
      console.log("val:", state.printVa);

      state.displayValue = formatNumber(state.printVal);
      if (progress < state.localDuration) {
        state.rAF = requestAnimationFrame(instanceProxy.count);
      } else {
        emit("end");
      }
    }

    // 判断是否数字
    function isNumber(val) {
      return !isNaN(parseFloat(val));
    }

    function formatNumber(num) {
      // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
      num = Number(num);
      num = num.toFixed(Number(props.decimals));
      num += "";
      const x = num.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? props.decimal + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + props.separator + "$2");
        }
      }
      return x1 + x2;
    }

    function destroyed() {
      cancelAnimationFrame(state.rAF);
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      countDown,
      fontStyle,
      easingFn,
      requestAnimationFrame,
      cancelAnimationFrame,
      start,
      reStart,
      stop,
      resume,
      reset,
      count,
      isNumber,
      formatNumber,
      destroyed,
    };
  },
  mounted() {
    instanceProxy = this;
    instanceProxy.autoplay && instanceProxy.start();
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-count-num {
  /* #ifndef APP-NVUE */
  display: inline-flex;

  /* #endif */
  text-align: center;
}
</style>
