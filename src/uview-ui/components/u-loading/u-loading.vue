<template>
  <view
    v-if="show"
    class="u-loading"
    :class="mode == 'circle' ? 'u-loading-circle' : 'u-loading-flower'"
    :style="cricleStyle"
  >
  </view>
</template>

<script lang='ts'>
/**
 * loading 加载动画
 * @description 警此组件为一个小动画，目前用在uView的loadmore加载更多和switch开关等组件的正在加载状态场景。
 * @tutorial https://www.uviewui.com/components/loading.html
 * @property {String} mode 模式选择，见官网说明（默认circle）
 * @property {String} color 动画活动区域的颜色，只对 mode = flower 模式有效（默认#c7c7c7）
 * @property {String Number} size 加载图标的大小，单位rpx（默认34）
 * @property {Boolean} show 是否显示动画（默认true）
 * @example <u-loading mode="circle"></u-loading>
 */
import { defineComponent, computed, reactive, toRefs } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";

export default defineComponent({
  name: "u-loading",

  props: {
    // 动画的类型
    mode: {
      type: String,
      default: "circle",
    },
    // 动画的颜色
    color: {
      type: String,
      default: "#c7c7c7",
    },
    // 加载图标的大小，单位rpx
    size: {
      type: [String, Number],
      default: "34",
    },
    // 是否显示动画
    show: {
      type: Boolean,
      default: true,
    },
  },

  setup(props: any) {
    // 加载中圆圈动画的样式

    const cricleStyle = computed(() => {
      let style: any = {};
      style.width = props.size + "rpx";
      style.height = props.size + "rpx";
      if (props.mode == "circle")
        style.borderColor = `#e4e4e4 #e4e4e4 #e4e4e4 ${props.color ? props.color : "#c7c7c7"}`;
      return styleObjToString(style);
    });

    return {
      ...toRefs(props),
      cricleStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-loading-circle {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  width: 28rpx;
  height: 28rpx;

  /* #endif */
  vertical-align: middle;
  background: 0 0;
  border: 2px solid;
  border-color: #e5e5e5 #e5e5e5 #e5e5e5 #8f8d8e;
  border-radius: 50%;
  animation: u-circle 1s linear infinite;
}

.u-loading-flower {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
  background:
    transparent
    url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=)
    no-repeat;
  background-size: 100%;
  -webkit-animation: a 1s steps(12) infinite;
  animation: u-flower 1s steps(12) infinite;
}

@keyframes u-flower {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1 turn);
    transform: rotate(1 turn);
  }
}

@-webkit-keyframes u-circle {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
