<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-subsection
          v-if="change"
          :bold="bold"
          :active-color="activeColor"
          :current="current"
          :mode="mode"
          :list="['代付款', '待收货', '待评价']"
        ></u-subsection>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择(为满足演示需要，切换会有抖动，非性能问题)</view>
        <u-subsection
          mode="button"
          :list="['button', 'subsection']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">Current值</view>
        <u-subsection mode="button" :list="[0, 1, 2]" @change="currentChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">活动选项字颜色</view>
        <u-subsection
          mode="button"
          :list="['primary', 'success', 'error', 'warning']"
          @change="colorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">字体加粗</view>
        <u-subsection mode="button" :list="['是', '否']" @change="boldChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, nextTick } from "vue";
import { color } from "@UVIEW/libs/function/color";

export default defineComponent({
  name: "ComponentsSubsection",

  setup() {
    let state = reactive({
      mode: "button",
      current: 0,
      activeColor: color["warning"],
      bold: true,
      change: true,
    });

    function modeChange(e) {
      switch (e) {
        case 0:
          state.mode = "button";
          break;
        case 1:
          state.mode = "subsection";
          break;
      }
      state.change = false;
      nextTick(() => {
        state.change = true;
      });
    }

    function currentChange(e) {
      state.current = e;
    }

    function colorChange(e) {
      let color = "primary";
      switch (e) {
        case 0:
          color = "primary";
          break;
        case 1:
          color = "success";
          break;
        case 2:
          color = "error";
          break;
        case 3:
          color = "warning";
          break;
      }
      state.activeColor = color[color];
    }

    function boldChange(e) {
      switch (e) {
        case 0:
          state.bold = true;
          break;
        case 1:
          state.bold = false;
          break;
      }
    }

    return {
      ...toRefs(state),
      modeChange,
      currentChange,
      colorChange,
      boldChange,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
