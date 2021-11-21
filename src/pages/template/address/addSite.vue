<template>
  <view class="wrap">
    <view class="top">
      <view class="item">
        <view class="left">收货人</view>
        <input type="text" placeholder-class="line" placeholder="请填写收货人姓名" />
      </view>
      <view class="item">
        <view class="left">手机号码</view>
        <input type="text" placeholder-class="line" placeholder="请填写收货人手机号" />
      </view>
      <view class="item" @tap="showRegionPicker">
        <view class="left">所在地区</view>
        <input disabled type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
      </view>
      <view class="item address">
        <view class="left">详细地址</view>
        <textarea type="text" placeholder-class="line" placeholder="街道、楼牌等" />
      </view>
      <!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
    </view>
    <view class="bottom">
      <view class="tag">
        <view class="left">标签</view>
        <view class="right">
          <text class="tags">家</text>
          <text class="tags">公司</text>
          <text class="tags">学校</text>
          <view class="tags plus"><u-icon size="22" name="plus"></u-icon></view>
        </view>
      </view>
      <view class="default">
        <view class="left">
          <view class="set">设置默认地址</view>
          <view class="tips">提醒：每次下单会默认推荐该地址</view>
        </view>
        <view class="right"><switch color="red" @change="setDefault" /></view>
      </view>
    </view>
    <u-picker mode="region" ref="uPicker" v-model="show" />
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsAddSite",

  setup() {
    let state = reactive({
      show: false,
    });

    function showRegionPicker() {
      state.show = true;
    }

    return {
      ...toRefs(state),
      showRegionPicker,
    };
  },
});
</script>

<style lang="scss" scoped>
/deep/ .line {
  font-size: 28rpx;
  color: $u-light-color;
}
.wrap {
  background-color: #f2f2f2;
  .top {
    padding: 22rpx;
    background-color: #fff;
    border-top: solid 2rpx $u-border-color;
    .item {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      line-height: 100rpx;
      border-bottom: solid 2rpx $u-border-color;
      .left {
        width: 180rpx;
      }
      input {
        text-align: left;
      }
    }

    .address {
      padding: 20rpx 0;
      textarea {
        // width: 100%;
        height: 150rpx;
        padding: 20rpx;
        margin: 40rpx auto;
        line-height: 60rpx;
        background-color: #f7f7f7;
      }
    }
    .site-clipboard {
      padding-right: 40rpx;
      textarea {
        // width: 100%;
        height: 150rpx;
        padding: 20rpx;
        margin: 40rpx auto;
        line-height: 60rpx;
        background-color: #f7f7f7;
      }
      .clipboard {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
        font-size: 26rpx;
        color: $u-tips-color;
        .icon {
          margin-top: 6rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
  .bottom {
    padding: 40rpx;
    padding-right: 0;
    margin-top: 20rpx;
    font-size: 28rpx;
    background-color: #fff;
    .tag {
      display: flex;
      .left {
        width: 160rpx;
      }
      .right {
        display: flex;
        flex-wrap: wrap;
        .tags {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140rpx;
          padding: 16rpx 8rpx;
          margin: 0 10rpx 20rpx;
          font-size: 28rpx;
          line-height: 1;
          color: $u-content-color;
          text-align: center;
          border: solid 2rpx $u-border-color;
          border-radius: 50rpx;
        }
        .plus {
          //padding: 10rpx 0;
        }
      }
    }
    .default {
      display: flex;
      justify-content: space-between;
      margin-top: 50rpx;
      line-height: 64rpx;
      border-bottom: solid 2rpx $u-border-color;
      .tips {
        font-size: 24rpx;
      }
    }
  }
}
</style>
