<template>
  <view class="u-circle-progress" :style="circleSuperColor">
    <!-- 支付宝小程序不支持canvas-id属性，必须用id属性 -->
    <canvas
      class="u-canvas-bg"
      canvas-id="uCircleProgressBgId"
      id="uCircleProgressBgId"
      :style="canvasStyle"
    ></canvas>
    <canvas
      class="u-canvas"
      canvas-id="uCircleProgressElId"
      id="uCircleProgressElId"
      :style="canvasStyle"
    ></canvas>
    <slot></slot>
  </view>
</template>

<script lang='ts'>
/**
 * circleProgress 环形进度条
 * @description 展示操作或任务的当前进度，比如上传文件，是一个圆形的进度条。注意：此组件的percent值只能动态增加，不能动态减少。
 * @tutorial https://www.uviewui.com/components/circleProgress.html
 * @property {String Number} percent 圆环进度百分比值，为数值类型，0-100
 * @property {String} inactive-color 圆环的底色，默认为灰色(该值无法动态变更)（默认#ececec）
 * @property {String} active-color 圆环激活部分的颜色(该值无法动态变更)（默认#19be6b）
 * @property {String Number} width 整个圆环组件的宽度，高度默认等于宽度值，单位rpx（默认200）
 * @property {String Number} border-width 圆环的边框宽度，单位rpx（默认14）
 * @property {String Number} duration 整个圆环执行一圈的时间，单位ms（默认呢1500）
 * @property {String} type 如设置，active-color值将会失效
 * @property {String} bg-color 整个组件背景颜色，默认为白色
 * @example <u-circle-progress active-color="#2abc6d" :percent="80"></u-circle-progress>
 */

import { defineComponent, onMounted, reactive, toRefs, computed, watch, nextTick } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";
import { color } from "../../libs/function/color";
import { guid } from "../../libs/function/guid";

let instanceProxy: any;

export default defineComponent({
  name: "u-circle-progress",

  props: {
    // 圆环进度百分比值
    percent: {
      type: Number,
      default: 0,
      // 限制值在0到100之间
      validator: (val: any) => {
        return val >= 0 && val <= 100;
      },
    },
    // 底部圆环的颜色（灰色的圆环）
    inactiveColor: {
      type: String,
      default: "#ececec",
    },
    // 圆环激活部分的颜色
    activeColor: {
      type: String,
      default: "#19be6b",
    },
    // 圆环线条的宽度，单位rpx
    borderWidth: {
      type: [Number, String],
      default: 14,
    },
    // 整个圆形的宽度，单位rpx
    width: {
      type: [Number, String],
      default: 200,
    },
    // 整个圆环执行一圈的时间，单位ms
    duration: {
      type: [Number, String],
      default: 1500,
    },
    // 主题类型
    type: {
      type: String,
      default: "",
    },
    // 整个圆环进度区域的背景色
    bgColor: {
      type: String,
      default: "#ffffff",
    },
  },

  setup(props: any) {
    let state: any = reactive({
      // #ifdef MP-WEIXIN
      elBgId: "uCircleProgressBgId", // 微信小程序中不能使用this.$u.guid()形式动态生成id值，否则会报错
      elId: "uCircleProgressElId",
      // #endif
      // #ifndef MP-WEIXIN
      // elBgId: guid(), // 非微信端的时候，需用动态的id，否则一个页面多个圆形进度条组件数据会混乱
      // elId: guid(),
      // #endif
      widthPx: uni.upx2px(props.width), // 转成px后的整个组件的背景宽度
      borderWidthPx: uni.upx2px(props.borderWidth), // 转成px后的圆环的宽度
      startAngle: -Math.PI / 2, // canvas画圆的起始角度，默认为3点钟方向，定位到12点钟方向
      progressContext: null, // 活动圆的canvas上下文
      newPercent: 0, // 当动态修改进度值的时候，保存进度值的变化前后值，用于比较用
      oldPercent: 0, // 当动态修改进度值的时候，保存进度值的变化前后值，用于比较用
    });

    onMounted(() => {
      // 在h5端，必须要做一点延时才起作用，this.$nextTick()无效(HX2.4.7)
      setTimeout(() => {
        // 赋值，用于加载后第一个画圆使用
        state.newPercent = props.percent;
        state.oldPercent = 0;
        drawProgressBg();
        drawCircleByProgress(state.oldPercent);
      }, 50);
    });

    const circleColor = computed(() => {
      if (["success", "error", "info", "primary", "warning"].indexOf(props.type) >= 0)
        return color[props.type];
      else return props.activeColor;
    });

    const circleSuperColor = computed(() => {
      let style: any = {};
      style.width = state.widthPx + "px";
      style.height = state.widthPx + "px";
      style.background = props.bgColor;
      return styleObjToString(style);
    });

    const canvasStyle = computed(() => {
      let style: any = {};
      style.width = state.widthPx + "px";
      style.height = state.widthPx + "px";
      return styleObjToString(style);
    });

    watch(
      () => props.percent,
      (nVal, oVal = 0) => {
        if (nVal > 100) nVal = 100;
        if (nVal < 0) oVal = 0;
        // 此值其实等于this.percent，命名一个新
        state.newPercent = nVal;
        state.oldPercent = oVal;
        setTimeout(() => {
          // 无论是百分比值增加还是减少，需要操作还是原来的旧的百分比值
          // 将此值减少或者新增到新的百分比值
          drawCircleByProgress(oVal);
        }, 50);
      }
    );

    function drawProgressBg() {
      let ctx = uni.createCanvasContext("uCircleProgressBgId", instanceProxy);
      ctx.setLineWidth(state.borderWidthPx); // 设置圆环宽度
      ctx.setStrokeStyle(props.inactiveColor); // 线条颜色

      ctx.beginPath(); // 开始描绘路径
      // 设置一个原点(110,110)，半径为100的圆的路径到当前路径
      let radius = state.widthPx / 2;
      ctx.arc(radius, radius, radius - state.borderWidthPx, 0, 2 * Math.PI, false);
      ctx.stroke(); // 对路径进行描绘
      ctx.draw();
    }

    function drawCircleByProgress(progress) {
      // 第一次操作进度环时将上下文保存到了this.data中，直接使用即可
      let ctx = props.progressContext;
      if (!ctx) {
        ctx = uni.createCanvasContext("uCircleProgressElId", instanceProxy);
        state.progressContext = ctx;
      }

      // 表示进度的两端为圆形
      ctx.setLineCap("round");
      // 设置线条的宽度和颜色
      ctx.setLineWidth(state.borderWidthPx);
      ctx.setStrokeStyle(props.activeColor);
      console.log("color::", props.activeColor);

      // 将总过渡时间除以100，得出每修改百分之一进度所需的时间
      let time = Math.floor(props.duration / 100);
      // 结束角的计算依据为：将2π分为100份，乘以当前的进度值，得出终止点的弧度值，加起始角，为整个圆从默认的
      // 3点钟方向开始画图，转为更好理解的12点钟方向开始作图，这需要起始角和终止角同时加上this.startAngle值
      let endAngle = ((2 * Math.PI) / 100) * progress + state.startAngle;
      ctx.beginPath();
      // 半径为整个canvas宽度的一半
      let radius = state.widthPx / 2;

      ctx.arc(radius, radius, radius - state.borderWidthPx, state.startAngle, endAngle, false);
      ctx.stroke();
      ctx.draw();
      // 如果变更后新值大于旧值，意味着增大了百分比
      if (state.newPercent > state.oldPercent) {
        // 每次递增百分之一
        progress++;

        // 如果新增后的值，大于需要设置的值百分比值，停止继续增加
        if (progress > state.newPercent) return;
      } else {
        // 同理于上面
        progress--;
        if (progress < state.newPercent) return;
      }
      setTimeout(() => {
        // 定时器，每次操作间隔为time值，为了让进度条有动画效果
        drawCircleByProgress(progress);
      }, time);
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      circleColor,
      circleSuperColor,
      drawProgressBg,
      drawCircleByProgress,
      canvasStyle,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";
.u-circle-progress {
  position: relative;

  /* #ifndef APP-NVUE */
  display: inline-flex;

  /* #endif */
  align-items: center;
  justify-content: center;
}

.u-canvas-bg {
  position: absolute;
}

.u-canvas {
  position: absolute;
}
</style>
