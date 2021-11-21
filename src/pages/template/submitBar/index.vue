<template>
  <view class="navigation">
    <view class="left">
      <view class="item">
        <u-icon name="server-fill" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">客服</view>
      </view>
      <view class="item">
        <u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">店铺</view>
      </view>
      <view class="item car">
        <u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge>
        <u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
        <view class="text u-line-1">购物车</view>
      </view>
    </view>
    <view class="right">
      <view class="cart btn u-line-1">加入购物车</view>
      <view class="buy btn u-line-1">立即购买</view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "ComponentsSubmitBar",

  setup(props) {
    let state = reactive({});
  },
});
</script>


<style lang="scss" scoped>
.navigation {
  display: flex;
  padding: 16rpx 0;
  margin-top: 100rpx;
  background-color: #fff;
  border: solid 2rpx #f2f2f2;
  .left {
    display: flex;
    font-size: 20rpx;
    .item {
      margin: 0 30rpx;
      &.car {
        position: relative;
        text-align: center;
        .car-num {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .btn {
      padding: 0 30rpx;
      line-height: 66rpx;
      color: #fff;
      border-radius: 36rpx;
    }
    .cart {
      margin-right: 30rpx;
      background-color: #ed3f14;
    }
    .buy {
      background-color: #ff7900;
    }
  }
}
</style>
