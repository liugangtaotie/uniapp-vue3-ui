<template>
  <view class="u-time-axis">
    <slot />
  </view>
</template>

<script lang='ts'>
/**
 * timeLine 时间轴
 * @description 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。
 * @tutorial https://www.uviewui.com/components/timeLine.html
 * @example <u-time-line></u-time-line>
 */
import { defineComponent } from "vue";
export default defineComponent({
  name: "u-time-line",
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-time-axis {
  position: relative;
  padding-left: 40rpx;
}

.u-time-axis::before {
  position: absolute;
  top: 12rpx;
  bottom: 0;
  left: 0;
  width: 1px;
  content: " ";
  border-left: 1px solid #ddd;
  transform: scaleX(0.5);
  transform-origin: 0 0;
}
</style>
