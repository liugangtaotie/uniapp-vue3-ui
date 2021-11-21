<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area u-flex u-row-center">
        <!-- 头条小程序因为兼容性，必须要给组件写上u-line类 -->
        <u-line
          class="u-line"
          :border-style="borderStyle"
          color="red"
          :color="color"
          :length="length"
          :direction="direction"
          :hair-line="hairLine"
        ></u-line>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">颜色</view>
        <u-subsection
          :list="['primary', 'success', 'warning', 'error', 'info']"
          @change="colorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">线条类型</view>
        <u-subsection
          :list="['实线', '方形虚线', '圆点虚线']"
          @change="borderStyleChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">细边</view>
        <u-subsection :list="['是', '否']" @change="hairLineChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">方向</view>
        <u-subsection :list="['水平', '垂直']" @change="directionChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

import { color } from "../../../uview-ui/libs/function/color";

export default defineComponent({
  name: "ComponentsLine",

  setup() {
    let state = reactive({
      direction: "row",
      hairLine: true,
      length: "100%",
      color: color["primary"],
      borderStyle: "solid",
    });

    function colorChange(index) {
      state.color = color[["primary", "success", "warning", "error", "info"][index]];
    }

    function hairLineChange(index) {
      state.hairLine = !index;
    }

    function directionChange(index) {
      state.direction = index == 0 ? "row" : "col";
      if (index == 0) state.length = "100%";
      else state.length = "50rpx";
    }

    function borderStyleChange(index) {
      state.borderStyle = ["solid", "dashed", "dotted"][index];
    }

    return {
      ...toRefs(state),
      colorChange,
      hairLineChange,
      directionChange,
      borderStyleChange,
    };
  },
});
</script>

<style scoped lang="scss">
</style>
