<template>
  <view class="wrap">
    <view class="top"></view>
    <view class="content">
      <view class="title">欢迎登录美团</view>
      <input class="u-border-bottom" type="number" v-model="tel" placeholder="请输入手机号" />
      <view class="tips">未注册的手机号验证后自动创建美团账号</view>
      <button @tap="submit" :style="inputStyle" class="getCaptcha">获取短信验证码</button>
      <view class="alternative">
        <view class="password">密码登录</view>
        <view class="issue">遇到问题</view>
      </view>
    </view>
    <view class="buttom">
      <view class="loginType">
        <view class="wechat item">
          <view class="icon"
            ><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon
          ></view>
          微信
        </view>
        <view class="QQ item">
          <view class="icon"
            ><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon
          ></view>
          QQ
        </view>
      </view>
      <view class="hint">
        登录代表同意
        <text class="link">美团点评用户协议、隐私政策，</text>
        并授权使用您的美团点评账号信息（如昵称、头像、收获地址）以便您统一管理
      </view>
    </view>
  </view>
</template>


<script lang='ts'>
import { defineComponent, computed, reactive, toRefs, onMounted } from "vue";
let instanceProxy: any;

export default defineComponent({
  name: "Components",
  components: {},
  setup(props) {
    let state = reactive({
      tel: "",
    });

    const inputStyle = computed(() => {
      let style: any = {};
      if (state.tel) {
        style.color = "#fff";
        style.background = instanceProxy.$u.color["warning"];
      }
      return style;
    });

    function submit() {
      if (instanceProxy.$u.test.mobile(state.tel)) {
        instanceProxy.$u.route({
          url: "pages/template/login/code",
        });
      }
    }
    onMounted(() => {});

    return {
      ...toRefs(state),
      inputStyle,
      submit,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>
 

<style lang="scss" scoped>
.wrap {
  font-size: 28rpx;
  .content {
    width: 600rpx;
    margin: 80rpx auto 0;

    .title {
      margin-bottom: 100rpx;
      font-size: 60rpx;
      font-weight: 500;
      text-align: left;
    }
    input {
      padding-bottom: 6rpx;
      margin-bottom: 10rpx;
      text-align: left;
    }
    .tips {
      margin-top: 8rpx;
      margin-bottom: 60rpx;
      color: $u-type-info;
    }
    .getCaptcha {
      padding: 12rpx 0;
      font-size: 30rpx;
      color: $u-tips-color;
      background-color: rgb(253, 243, 208);
      border: none;

      &::after {
        border: none;
      }
    }
    .alternative {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
      color: $u-tips-color;
    }
  }
  .buttom {
    .loginType {
      display: flex;
      justify-content: space-between;
      padding: 350rpx 150rpx 150rpx 150rpx;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 28rpx;
        color: $u-content-color;
      }
    }

    .hint {
      padding: 20rpx 40rpx;
      font-size: 20rpx;
      color: $u-tips-color;

      .link {
        color: $u-type-warning;
      }
    }
  }
}
</style>
