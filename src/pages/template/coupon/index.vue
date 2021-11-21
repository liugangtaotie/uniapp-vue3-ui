<template>
  <view class="u-wrap">
    <view class="meituan">
      <view class="content">
        <view class="left">
          <view class="sum">
            ￥
            <text class="num">8</text>
          </view>
          <view class="type">抵用券</view>
        </view>
        <view class="centre">
          <view class="title">【洗牙】8元无门槛红包</view>
          <view class="valid-date">今日到期</view>
        </view>
        <view class="right">
          <view size="mini" class="immediate-use" :round="true">立即使用</view>
        </view>
      </view>
      <view class="tips">
        <view class="circle-left"></view>
        <view class="circle-right"></view>
        <view class="explain u-line-1">满8.1元可用、限最新版本客户端使用</view>
        <view class="rule u-line-1" @tap="xxx122">
          <text>使用规则</text>
          <u-icon name="arrow-right" color="" :size="20" @click=""></u-icon>
        </view>
      </view>
    </view>
    <view class="jingdong">
      <view class="left">
        <view class="sum">
          ￥
          <text class="num">100</text>
        </view>
        <view class="type">满149元可用</view>
      </view>
      <view class="right">
        <view class="top">
          <view class="title">
            <text class="tag">限品类东券</text>
            <text>仅可购买个人护理部分商品</text>
          </view>
          <view class="bottom">
            <view class="date u-line-1">2020.01.01-2020.01.31</view>
            <view class="immediate-use">立即使用</view>
          </view>
        </view>
        <view class="tips">
          <view class="explain">
            <u-icon name="zhuanfa" class="transpond" :size="24"></u-icon>
            <text>可赠送</text>
          </view>
        </view>
      </view>
    </view>
    <view class="taobao">
      <view class="title">
        <view class="left">
          <image
            class="buddha"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1975388697,1068670603&fm=26&gp=0.jpg"
            mode="aspectFill"
          ></image>
          <view class="store">袜子精保护协会</view>
        </view>
        <view class="entrance">进店</view>
      </view>
      <view class="ticket">
        <view class="left">
          <image
            class="picture"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578059523488&di=5f592ac19c1b983005d3e85add469756&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fg7%2FM00%2F2D%2FB9%2FwKhQs1QfUo6EdeM-AAAAALwk1hM072.jpg"
            mode="widthFix"
          ></image>
          <view class="introduce">
            <view class="top">
              ￥
              <text class="big">3</text>
              满88减3
            </view>
            <view class="type">店铺优惠券</view>
            <view class="date u-line-1">2019.11.28-2020.1.24</view>
          </view>
        </view>
        <view class="right">
          <view class="use immediate-use" :round="true">去使用</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: rgb(244, 244, 244);
}
.u-wrap {
  padding: 24rpx;
}

.meituan {
  width: 700rpx;
  margin: 30rpx auto;
  font-size: 28rpx;
  // border: 10rpx;
  color: $u-type-warning;
  background-color: #fff;
  .content {
    display: flex;
    align-items: center;
    padding: 80rpx 20rpx;
    background-color: #fff5f4;
    border: 10rpx;
    .left {
      .sum {
        font-size: 32rpx;
        .num {
          font-size: 60rpx;
          font-weight: bold;
        }
      }
    }
    .centre {
      margin-left: 40rpx;
      .title {
        margin-bottom: 20rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: $u-main-color;
      }
    }
    .right {
      margin-left: 30rpx;
      .immediate-use {
        height: 50rpx;
        padding: 0 20rpx;
        font-size: 24rpx;
        line-height: 50rpx;
        color: #fff !important;
        word-break: keep-all;
        background-color: $u-type-warning !important;
        border: none;
        border-radius: 25rpx;
      }
    }
  }
  .tips {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    font-size: 24rpx;
    line-height: 60rpx;
    color: $u-tips-color;
    background-color: $u-type-info-light;
    border: 10rpx;
    .circle-left,
    .circle-right {
      position: absolute;
      width: 18rpx;
      height: 36rpx;
      background-color: #f2f2f2;
    }

    .circle-right {
      top: -18rpx;
      right: 0;
      border-radius: 40rpx 0 0 40rpx;
    }

    .circle-left {
      top: -18rpx;
      left: 0;
      border-radius: 0 40rpx 40rpx 0;
    }
    .rule {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      text {
        flex: 1;
        margin-right: 10rpx;
      }
    }
  }
}

.jingdong {
  display: flex;
  width: 700rpx;
  height: auto;
  margin-top: 40rpx;
  background-color: #fff;
  .left {
    padding: 0 30rpx;
    font-size: 28rpx;
    color: #fff;
    text-align: center;
    background-color: rgb(95, 148, 224); //rgb(94, 152, 225);
    .sum {
      margin-top: 50rpx;
      font-size: 32rpx;
      font-weight: bold;
      .num {
        font-size: 80rpx;
      }
    }
    .type {
      margin-bottom: 50rpx;
      font-size: 24rpx;
    }
  }
  .right {
    padding: 20rpx 20rpx 0;
    font-size: 28rpx;
    .top {
      border-bottom: 2rpx dashed $u-border-color;
      .title {
        margin-right: 60rpx;
        line-height: 40rpx;
        .tag {
          padding: 4rpx 20rpx;
          margin-right: 10rpx;
          font-size: 24rpx;
          font-weight: bold;
          color: #fff;
          background-color: rgb(73, 154, 201);
          border-radius: 20rpx;
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20rpx;
        margin-bottom: 10rpx;
        .date {
          flex: 1;
          font-size: 20rpx;
        }
        .immediate-use {
          height: auto;
          padding: 0 20rpx;
          font-size: 24rpx;
          line-height: 40rpx;
          color: rgb(117, 142, 165);
          border: 2rpx solid rgb(117, 142, 165);
          border-radius: 40rpx;
        }
      }
    }
    .tips {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 24rpx;
      line-height: 50rpx;
      .transpond {
        margin-right: 10rpx;
      }
      .explain {
        display: flex;
        align-items: center;
      }
      .particulars {
        box-sizing: border-box;
        width: 30rpx;
        height: 30rpx;
        padding-top: 8rpx;
        text-align: center;
        background-color: $u-type-info-disabled;
        border-radius: 50%;
      }
    }
  }
}

.taobao {
  width: 700rpx;
  padding: 30rpx 20rpx 20rpx;
  margin-top: 40rpx;
  background-color: white;
  border-radius: 20rpx;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    font-size: 30rpx;
    .left {
      display: flex;
      align-items: center;
    }
    .store {
      font-weight: 500;
    }
    .buddha {
      width: 70rpx;
      height: 70rpx;
      margin-right: 10rpx;
      border-radius: 10rpx;
    }
    .entrance {
      padding: 0 30rpx;
      line-height: 48rpx;
      color: $u-type-info;
      background: none;
      border: solid 2rpx $u-type-info;
      border-radius: 15px;
    }
  }
  .ticket {
    display: flex;
    .left {
      display: flex;
      width: 70%;
      padding: 30rpx 20rpx;
      background-color: rgb(255, 245, 244);
      border-right: dashed 2rpx rgb(224, 215, 211);
      border-radius: 20rpx;
      .picture {
        width: 172rpx;
        border-radius: 20rpx;
      }
      .introduce {
        margin-left: 10rpx;
        .top {
          font-size: 28rpx;
          color: $u-type-warning;
          .big {
            margin-right: 10rpx;
            font-size: 60rpx;
            font-weight: bold;
          }
        }
        .type {
          font-size: 28rpx;
          color: $u-type-info-dark;
        }
        .date {
          margin-top: 10rpx;
          font-size: 20rpx;
          color: $u-type-info-dark;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      width: 30%;
      padding: 40rpx 20rpx;
      background-color: rgb(255, 245, 244);
      border-radius: 20rpx;
      .use {
        height: auto;
        padding: 0 20rpx;
        margin-left: 20rpx;
        font-size: 24rpx;
        line-height: 40rpx;
        color: #fff !important;
        color: rgb(117, 142, 165);
        background-color: $u-type-warning !important;
        border-radius: 40rpx;
      }
    }
  }
}
</style>
