<template>
  <view class="wrap">
    <view class="key-input">
      <view class="title">输入验证码</view>
      <view class="tips">验证码已发送至 +150****9320</view>
      <u-message-input
        :focus="true"
        :value="value"
        @change="change"
        @finish="finish"
        mode="bottomLine"
        :maxlength="maxlength"
      ></u-message-input>
      <text :class="{ error: error }">验证码错误，请重新输入</text>
      <view class="captcha">
        <text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
        <text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      maxlength: 4,
      value: "",
      second: 3,
      show: false,
      error: false,
    };
  },
  computed: {},
  onLoad() {
    // this.getCaptcha()
    let interval = setInterval(() => {
      this.second--;
      if (this.second <= 0) {
        this.show = true;
        if (this.value.lenth != 4) {
          this.error = true;
        }
        clearInterval(interval);
      }
    }, 1000);
  },
  methods: {
    // 收不到验证码选择时的选择
    noCaptcha() {
      uni.showActionSheet({
        itemList: ["重新获取验证码", "接听语音验证码"],
        success: function (res) {},
        fail: function (res) {},
      });
    },
    // change事件侦听
    change(value) {
      // console.log('change', value);
    },
    // 输入完验证码最后一位执行
    finish(value) {
      // console.log('finish', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 80rpx;
}

.box {
  margin: 30rpx 0;
  font-size: 30rpx;
  color: 555;
}

.key-input {
  padding: 30rpx 0;
  text {
    display: none;
  }
  .error {
    display: block;
    margin: 20rpx 0;
    font-size: 30rpx;
    color: red;
  }
}

.title {
  font-size: 50rpx;
  color: #333;
}

.key-input .tips {
  margin-top: 20rpx;
  margin-bottom: 60rpx;
  font-size: 30rpx;
  color: #333;
}
.captcha {
  margin-top: 40rpx;
  font-size: 30rpx;
  color: $u-type-warning;
  .noCaptcha {
    display: block;
  }
  .regain {
    display: block;
  }
}
</style>
