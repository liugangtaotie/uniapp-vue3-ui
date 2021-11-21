<template>
  <view class="u-time-axis-item">
    <slot name="content" />
    <view class="u-time-axis-node" :style="nodeStyle">
      <slot name="node">
        <view class="u-dot"> </view>
      </slot>
    </view>
  </view>
</template>

<script lang='ts'>
/**
 * timeLineItem 时间轴Item
 * @description 时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。(搭配u-time-line使用)
 * @tutorial https://www.uviewui.com/components/timeLine.html
 * @property {String} bg-color 左边节点的背景颜色，一般通过slot内容自定义背景颜色即可（默认#ffffff）
 * @property {String Number} node-top 节点左边图标绝对定位的top值，单位rpx
 * @example <u-time-line-item node-top="2">...</u-time-line-item>
 */
import { defineComponent, computed, reactive, toRefs } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";

export default defineComponent({
  name: "u-time-line-item",

  props: {
    // 节点的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    // 节点左边图标绝对定位的top值
    nodeTop: {
      type: [String, Number],
      default: "",
    },
  },

  setup(props: any) {
    const nodeStyle = computed(() => {
      let style: any = {
        backgroundColor: props.bgColor,
      };
      if (props.nodeTop != "") style.top = props.nodeTop + "rpx";
      return styleObjToString(style);
    });

    return {
      ...toRefs(props),
      nodeStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-time-axis-item {
  @include vue-flex;

  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: 32rpx;
}

.u-time-axis-node {
  position: absolute;
  top: 12rpx;
  left: -40rpx;
  z-index: 1;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  transform: translateX(-50%);
  transform-origin: 0;
  @include vue-flex;
}

.u-dot {
  width: 16rpx;
  height: 16rpx;
  background: #ddd;
  border-radius: 100rpx;
}
</style>
