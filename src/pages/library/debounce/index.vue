<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="no-mode-here">
          选择节流或者防抖模式，点击按钮，将会执行回调并显示在下方：
        </view>
        <view class="u-demo-result-line" v-if="result.length">
          <view v-for="(item, index) in result" :key="index">{{ index >= 1 ? "-" : "" }}回调</view>
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-button" hover-class="u-button--hover" hover-stay-time="150" @tap="btnClick">
        点击触发
      </view>
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式</view>
        <u-subsection :list="['节流', '防抖']" @change="modeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">时间间隔</view>
        <u-subsection
          current="1"
          :list="['500ms', '1000ms', '2000ms']"
          @change="timeoutChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">执行时机</view>
        <u-subsection :list="['开始处', '结束处']" @change="immediateChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { throttle } from "@UVIEW/libs/function/throttle";
import { debounce } from "@UVIEW/libs/function/debounce";

export default defineComponent({
  name: "ComponentsDebounce",

  setup() {
    let state = reactive({
      result: [] as any,
      timeout: 1000,
      immediate: true,
      mode: "throttle",
    });

    function modeChange(index) {
      state.mode = index ? "debouncd" : "throttle";
    }

    function timeoutChange(index) {
      state.timeout = [500, 1000, 2000][index];
    }

    function immediateChange(index) {
      state.immediate = !index;
    }

    function getResult() {
      if (state.result.length >= 6) state.result = [];
      state.result.push(0);
    }

    function btnClick() {
      if (state.mode == "throttle") {
        throttle(getResult, state.timeout, state.immediate);
      } else {
        debounce(getResult, state.timeout, state.immediate);
      }
    }

    return {
      ...toRefs(state),
      modeChange,
      timeoutChange,
      immediateChange,
      getResult,
      btnClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.u-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  margin-top: 50rpx;
  margin-bottom: 50rpx;
  color: $u-type-primary;
  border: 1px solid $u-type-primary;
  border-radius: 6rpx;
}

.u-button--hover {
  color: #fff;
  background-color: $u-type-primary;
}

.u-demo-result-line {
  display: flex;
  justify-content: center;
}
</style>
