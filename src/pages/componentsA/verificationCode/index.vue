<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-verification-code
          :keep-running="true"
          :seconds="seconds"
          @end="end"
          @start="start"
          ref="uCode"
          @change="codeChange"
          :startText="startText"
          :changeText="changeText"
          :endText="endText"
        ></u-verification-code>
        <u-button @click="getCode">{{ tips }}</u-button>
        <u-button :custom-style="{ 'margin-top': '30rpx' }" @tap="reset" style="margin-top: 30rpx"
          >重置</u-button
        >
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">倒计时间</view>
        <u-subsection
          :current="0"
          :list="['60s', '10s', '5s']"
          @change="secondsChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义提示语</view>
        <u-subsection :current="1" :list="['是', '否']" @change="textChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { toast } from "@UVIEW/libs/function/toast";
let instanceProxy: any;

export default defineComponent({
  name: "ComponentsVerificationCode",

  setup() {
    let state = reactive({
      tips: "获取验证码",
      seconds: 60,
      refCode: null,
      startText: "获取验证码",
      changeText: "X秒重新获取",
      endText: "重新获取",
    });

    function codeChange(text) {
      // console.log(text);
      state.tips = text;
    }

    function getCode() {
      if (instanceProxy.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        setTimeout(() => {
          uni.hideLoading();
          // 这里此提示会被state.start()方法中的提示覆盖
          toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          instanceProxy.$refs.uCode.start();
        }, 2000);
      } else {
        toast("倒计时结束后再发送");
      }
    }

    function secondsChange(index) {
      state.seconds = index == 0 ? 60 : index == 1 ? 10 : 5;
    }

    function textChange(index) {
      if (index == 0) {
        (state.startText = "点一下获取"),
          (state.changeText = "重新获取Xs"),
          (state.endText = "再次获取");
      } else {
        (state.startText = "获取验证码"),
          (state.changeText = "X秒重新获取"),
          (state.endText = "重新获取");
      }
    }

    function end() {
      toast("倒计时结束");
    }

    function start() {
      toast("倒计时开始");
    }

    function reset() {
      instanceProxy.$refs.uCode.reset();
    }

    return {
      ...toRefs(state),
      codeChange,
      getCode,
      secondsChange,
      textChange,
      end,
      start,
      reset,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
</style>
