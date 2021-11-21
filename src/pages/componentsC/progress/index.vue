<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-line-progress
          v-if="mode == 'line'"
          :percent="percent"
          :active-color="activeColor"
          :striped="striped"
          :stripedActive="stripedActive"
        ></u-line-progress>
        <u-circle-progress
          v-else
          :percent="percent"
          :active-color="activeColor"
          bg-color="rgb(250, 250, 250)"
        >
          <view class="u-progress-content">
            <view class="u-progress-dot"></view>
            <text class="u-progress-info">查找中</text>
          </view>
        </u-circle-progress>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection
          :current="current"
          :list="['线型', '圆型']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">增减</view>
        <u-subsection :list="['减少30%', '增加30%']" @change="calcChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义样式(线型时有效)</view>
        <u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">动态条纹(线型时有效)</view>
        <u-subsection current="1" :list="['是', '否']" @change="stripedChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

import { color } from "../../../uview-ui/libs/function/color";

export default defineComponent({
  name: "ComponentsProgress",

  setup(props) {
    let state = reactive({
      percent: 50,
      mode: "line",
      activeColor: "#19be6b",
      striped: false,
      stripedActive: false,
      current: 0,
    });

    function modeChange(index) {
      state.current = index;
      state.mode = index == 0 ? "line" : "circle";
    }

    function calcChange(index) {
      state.percent = index == 0 ? state.percent - 30 : state.percent + 30;
      if (state.percent > 100) state.percent = 100;
      if (state.percent < 0) state.percent = 0;
    }

    function styleChange(index) {
      state.activeColor = index == 0 ? color["error"] : "#19be6b";
      if (index == 0) {
        state.mode = "line";
        state.current = 0;
      }
    }

    function stripedChange(index) {
      state.striped = index == 0 ? true : false;
      state.stripedActive = state.striped;
      if (index == 0) {
        state.mode = "line";
        state.current = 0;
      }
    }

    return {
      ...toRefs(state),
      modeChange,
      calcChange,
      styleChange,
      stripedChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.u-progress-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.u-progress-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #fb9126;
  border-radius: 50%;
}

.u-progress-info {
  padding-left: 16rpx;
  font-size: 28rpx;
  letter-spacing: 2rpx;
}
</style>
