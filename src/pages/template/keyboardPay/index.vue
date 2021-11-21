<template>
  <view>
    <view class="u-padding-40">
      <u-button type="success" @click="showPop(true)">
        <u-icon name="red-packet"></u-icon>
        <text class="u-padding-left-10">发送1.00元红包</text>
      </u-button>
    </view>
    <u-keyboard
      default=""
      ref="uKeyboard"
      mode="number"
      :mask="true"
      :mask-close-able="false"
      :dot-enabled="false"
      v-model="show"
      :safe-area-inset-bottom="true"
      :tooltip="false"
      @change="onChange"
      @backspace="onBackspace"
    >
      <view>
        <view class="u-text-center u-padding-20 money">
          <text>1.00</text>
          <text class="u-font-20 u-padding-left-10">元</text>
          <view class="u-padding-10 close" data-flag="false" @tap="showPop(false)">
            <u-icon name="close" color="#333333" size="28"></u-icon>
          </view>
        </view>
        <view class="u-flex u-row-center">
          <u-message-input
            mode="box"
            :maxlength="6"
            :dot-fill="true"
            v-model="password"
            :disabled-keyboard="true"
            @finish="finish"
          ></u-message-input>
        </view>
        <view class="u-text-center u-padding-top-10 u-padding-bottom-20 tips">支付键盘</view>
      </view>
    </u-keyboard>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsKeyboardPay",

  setup() {
    let state: any = reactive({
      show: false,
      password: "",
    });

    function onChange(val) {
      if (state.password.length < 6) {
        state.password += val;
      }

      if (state.password.length >= 6) {
        pay();
      }
    }

    function onBackspace(e) {
      if (state.password.length > 0) {
        state.password = state.password.substring(0, state.password.length - 1);
      }
    }

    function pay() {
      uni.showLoading({
        title: "支付中",
      });

      setTimeout(() => {
        uni.hideLoading();
        state.show = false;
        uni.showToast({
          icon: "success",
          title: "支付成功",
        });
      }, 2000);
    }

    function showPop(flag = true) {
      state.password = "";
      state.show = flag;
    }

    function finish() {
      console.log(11111);
    }

    return {
      ...toRefs(state),
      onChange,
      onBackspace,
      pay,
      showPop,
      finish,
    };
  },
});
</script>


<style scoped lang="scss">
.money {
  position: relative;
  font-size: 80rpx;
  color: $u-type-warning;

  .close {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 28rpx;
    line-height: 28rpx;
  }
}
.tips {
  color: $u-tips-color;
}
</style>
