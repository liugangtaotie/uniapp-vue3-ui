<template>
  <view
    class="u-slider"
    @tap="onClick"
    :class="[disabled ? 'u-slider--disabled' : '']"
    :style="sliderStyle"
  >
    <view class="u-slider__gap" :class="barStyle" :style="sliderGapStyle">
      <view
        class="u-slider__button-wrap"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <slot v-if="$slots.default || $slots.$default" />
        <view v-else class="u-slider__button" :style="sliderButtonStyle"></view>
      </view>
    </view>
  </view>
</template>


<script lang='ts'>
/**
 * slider 滑块选择器
 * @tutorial https://uviewui.com/components/slider.html
 * @property {Number | String} value 滑块默认值（默认0）
 * @property {Number | String} min 最小值（默认0）
 * @property {Number | String} max 最大值（默认100）
 * @property {Number | String} step 步长（默认1）
 * @property {Number | String} blockWidth 滑块宽度，高等于宽（30）
 * @property {Number | String} height 滑块条高度，单位rpx（默认6）
 * @property {String} inactiveColor 底部条背景颜色（默认#c0c4cc）
 * @property {String} activeColor 底部选择部分的背景颜色（默认#2abc6d）
 * @property {String} blockColor 滑块颜色（默认#ffffff）
 * @property {Object} blockStyle 给滑块自定义样式，对象形式
 * @property {Boolean} disabled 是否禁用滑块(默认为false)
 * @event {Function} start 滑动触发
 * @event {Function} moving 正在滑动中
 * @event {Function} end 滑动结束
 * @example <u-slider v-model="value" />
 */
import {
  defineComponent,
  onMounted,
  computed,
  toRefs,
  getCurrentInstance,
  reactive,
  watch,
} from "vue";
import { addUnit } from "../../libs/function/addUnit.js"; // 添加单位
import { toast } from "../../libs/function/toast.js";
import { $parent } from "../../libs/function/$parent"; // 获取整个父组件
import { styleObjToString } from "../../libs/function/styleObjToString";

let instanceProxy: any;

let sliderRect: any;

export default defineComponent({
  name: "u-slider",
  components: {},

  props: {
    // 当前进度百分比值，范围0-100
    value: {
      type: [Number, String],
      default: 0,
    },
    // 是否禁用滑块
    disabled: {
      type: Boolean,
      default: false,
    },
    // 滑块宽度，高等于宽，单位rpx
    blockWidth: {
      type: [Number, String],
      default: 30,
    },
    // 最小值
    min: {
      type: [Number, String],
      default: 0,
    },
    // 最大值
    max: {
      type: [Number, String],
      default: 100,
    },
    // 步进值
    step: {
      type: [Number, String],
      default: 1,
    },
    // 滑块条高度，单位rpx
    height: {
      type: [Number, String],
      default: 6,
    },
    // 进度条的激活部分颜色
    activeColor: {
      type: String,
      default: "#2abc6d",
    },
    // 进度条的背景颜色
    inactiveColor: {
      type: String,
      default: "#c0c4cc",
    },
    // 滑块的背景颜色
    blockColor: {
      type: String,
      default: "#ffffff",
    },
    // 用户对滑块的自定义颜色
    blockStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["start", "moving", "input", "end"],
  setup(props: any, { emit }) {
    let state = reactive({
      startX: 0,
      status: "end",
      newValue: 0,
      distanceX: 0,
      startValue: 0,
      barStyle: {},
      // sliderRect: {
      //   left: 0,
      //   width: 0,
      // },
    });

    watch(
      () => props.value,
      (Val) => {
        // 只有在非滑动状态时，才可以通过value更新滑块值，这里监听，是为了让用户触发
        if (state.status == "end") updateValue(props.value, false);
      }
    );

    onMounted(() => {});

    updateValue(props.value, false);

    function onTouchStart(event) {
      if (props.disabled) return;
      state.startX = 0;
      // 触摸点集
      let touches = event.touches[0];
      // 触摸点到屏幕左边的距离
      state.startX = touches.clientX;
      // 此处的this.value虽为props值，但是通过$emit('input')进行了修改
      state.startValue = format(props.value);
      // 标示当前的状态为开始触摸滑动
      state.status = "start";
    }
    function onTouchMove(event) {
      if (props.disabled) return;
      // 连续触摸的过程会一直触发本方法，但只有手指触发且移动了才被认为是拖动了，才发出事件
      // 触摸后第一次移动已经将status设置为moving状态，故触摸第二次移动不会触发本事件
      if (state.status == "start") emit("start");
      let touches = event.touches[0];
      // 滑块的左边不一定跟屏幕左边接壤，所以需要减去最外层父元素的左边值
      state.distanceX = touches.clientX - sliderRect.left;
      // 获得移动距离对整个滑块的百分比值，此为带有多位小数的值，不能用此更新视图
      // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
      state.newValue = (state.distanceX / sliderRect.width) * 100;
      state.status = "moving";
      // 发出moving事件
      emit("moving");
      updateValue(state.newValue, true);
    }
    function onTouchEnd() {
      if (props.disabled) return;
      if (state.status === "moving") {
        updateValue(state.newValue, false);
        emit("end");
      }
      state.status = "end";
    }
    function updateValue(value, drag) {
      console.log("value::::::", instanceProxy);

      // 去掉小数部分，同时也是对step步进的处理
      const width = format(value);
      // 不允许滑动的值超过max最大值，百分比也不能超过100
      if (width > props.max || width > 100) return;
      // 设置移动的百分比值
      let barStyleTemp: any = {
        width: width + "%",
      };
      // 移动期间无需过渡动画
      if (drag == true) {
        barStyleTemp.transition = "none";
      } else {
        // 非移动期间，删掉对过渡为空的声明，让css中的声明起效
        delete barStyleTemp.transition;
      }
      // 修改value值
      emit("input", width);
      console.log("barStyleTemp::::", barStyleTemp);

      state.barStyle = styleObjToString(barStyleTemp);
    }
    function format(value) {
      // 将小数变成整数，为了减少对视图的更新，造成视图层与逻辑层的阻塞
      return Math.round(Math.max(props.min, Math.min(value, props.max)) / props.step) * props.step;
    }
    function onClick(event) {
      if (props.disabled) return;
      // 直接点击滑块的情况，计算方式与onTouchMove方法相同
      const value = ((event.detail.x - sliderRect.left) / sliderRect.width) * 100;
      updateValue(value, false);
    }

    const sliderStyle = computed(() => {
      let style: any = {};
      style.background = props.inactiveColor;
      return styleObjToString(style);
    });

    const sliderGapStyle = computed(() => {
      let style: any = {};
      style.width = props.value + "%";
      style.height = props.height + "rpx";
      style.background = props.activeColor;
      console.log("act::::::", styleObjToString(style));

      return styleObjToString(style);
    });

    const sliderButtonStyle = computed(() => {
      let style: any = {};
      style.width = props.blockWidth + "rpx";
      style.height = props.blockWidth + "rpx";
      style.background = props.blockColor;
      return styleObjToString(style);
    });

    return {
      ...toRefs(state),
      ...toRefs(props),
      sliderStyle,
      sliderGapStyle,
      sliderButtonStyle,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      updateValue,
      format,
      onClick,
    };
  },
  mounted() {
    instanceProxy = this;
    // 获取滑块条的尺寸信息
    instanceProxy.$uGetRect(".u-slider").then((rect) => {
      sliderRect = rect;
    });
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-slider {
  position: relative;
  background-color: #ebedf0;
  border-radius: 999px;
  border-radius: 999px;
}

.u-slider::before {
  position: absolute;
  top: -8px;
  right: 0;
  bottom: -8px;
  left: 0;
  z-index: -1;
  content: "";
}

.u-slider__gap {
  position: relative;
  background-color: #1989fa;
  border-radius: inherit;
  transition: width 0.2s;
  transition: width 0.2s;
}

.u-slider__button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.u-slider__button-wrap {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(50%, -50%, 0);
}

.u-slider--disabled {
  opacity: 0.5;
}
</style>
