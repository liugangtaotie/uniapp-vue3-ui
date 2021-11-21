<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="input-wrap">
          <input
            class="input"
            disabled
            type="text"
            :value="input"
            placeholder="来自键盘的输入内容"
          />
          <u-button
            :custom-style="{ height: '32px' }"
            :hairLine="false"
            class="clear-btn"
            @click="input = ''"
            >清空</u-button
          >
        </view>
        <u-keyboard
          :mask="mask"
          ref="uKeyboard"
          safe-area-inset-bottom
          @confirm="confirm"
          :random="random"
          :dotEnable="false"
          :mode="mode"
          :confirmBtn="true"
          :cancelBtn="true"
          :tooltip="tooltip"
          v-model="show"
          @change="change"
          @backspace="backspace"
        ></u-keyboard>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">键盘开关</view>
        <u-subsection
          :current="show == true ? 0 : 1"
          :list="['开', '关']"
          @change="statusChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">键盘类型</view>
        <u-subsection
          :list="['数字键盘', '身份证键盘', '车牌号键盘']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">打乱顺序</view>
        <u-subsection :current="1" :list="['是', '否']" @change="randomChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">上方工具条</view>
        <u-subsection :list="['显示', '隐藏']" @change="tooltipChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">是否显示遮罩</view>
        <u-subsection :list="['显示', '隐藏']" @change="maskChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsKeyBoard",

  setup(props: any) {
    let state = reactive({
      show: false,
      input: "",
      mode: "number",
      random: false,
      tooltip: true,
      mask: true,
    });

    function statusChange(index) {
      state.show = index == 0 ? true : false;
    }

    function modeChange(index) {
      if (index == 0) state.mode = "number";
      if (index == 1) state.mode = "card";
      if (index == 2) state.mode = "car";
      state.show = true;
    }

    function randomChange(index) {
      state.random = index == 0 ? true : false;
      state.show = true;
    }

    function tooltipChange(index) {
      state.tooltip = index == 0 ? true : false;
      state.show = true;
    }

    function maskChange(index) {
      state.show = true;
      state.mask = !index;
    }

    // 点击退格键
    function backspace() {
      if (state.input.length) state.input = state.input.substr(0, state.input.length - 1);
    }

    // 键盘按键发生变化
    function change(detail) {
      state.input += detail;
    }

    function confirm(e) {}

    return {
      ...toRefs(state),
      ...toRefs(props),
      statusChange,
      modeChange,
      randomChange,
      tooltipChange,
      maskChange,
      backspace,
      change,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.input {
  box-sizing: border-box;
  flex: 1;
  height: 32px;
  margin-bottom: 20px;
  font-size: 26rpx;
  border: 1px solid $u-light-color;
  border-radius: 4px;
}

.input-wrap {
  display: flex;
}

.clear-btn {
  margin-left: 10px;
  font-size: 28rpx;
}
</style>
