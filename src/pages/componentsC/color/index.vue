<template>
  <view class="wrap">
    <view class="item">
      <view class="title"> 主色调 </view>
      <view class="color-box">
        <view class="color-item" style="background: #2979ff">
          <view class="color-title"> Primary </view>
          <view class="color-value"> #2979ff </view>
        </view>
        <view class="color-item" style="background: #2b85e4">
          <view class="color-title"> Dark </view>
          <view class="color-value"> #2b85e4 </view>
        </view>
        <view class="color-item" style="background: #a0cfff">
          <view class="color-title"> Disabled </view>
          <view class="color-value"> #a0cfff </view>
        </view>
        <view class="color-item" style="color: #909399; background: #ecf5ff">
          <view class="color-title"> Light </view>
          <view class="color-value"> #ecf5ff </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> Error </view>
      <view class="color-box">
        <view class="color-item" style="background: #fa3534">
          <view class="color-title"> Error </view>
          <view class="color-value"> #fa3534 </view>
        </view>
        <view class="color-item" style="background: #dd6161">
          <view class="color-title"> Dark </view>
          <view class="color-value"> #dd6161 </view>
        </view>
        <view class="color-item" style="background: #fab6b6">
          <view class="color-title"> Disabled </view>
          <view class="color-value"> #fab6b6 </view>
        </view>
        <view class="color-item" style="color: #909399; background: #fef0f0">
          <view class="color-title"> Light </view>
          <view class="color-value"> #fef0f0 </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> Warning </view>
      <view class="color-box">
        <view class="color-item" style="background: #f90">
          <view class="color-title"> Warning </view>
          <view class="color-value"> #ff9900 </view>
        </view>
        <view class="color-item" style="background: #f29100">
          <view class="color-title"> Dark </view>
          <view class="color-value"> #f29100 </view>
        </view>
        <view class="color-item" style="background: #fcbd71">
          <view class="color-title"> Disabled </view>
          <view class="color-value"> #fcbd71 </view>
        </view>
        <view class="color-item" style="color: #909399; background: #fdf6ec">
          <view class="color-title"> Light </view>
          <view class="color-value"> #fdf6ec </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> Info </view>
      <view class="color-box">
        <view class="color-item" style="background: #909399">
          <view class="color-title"> Info </view>
          <view class="color-value"> #909399 </view>
        </view>
        <view class="color-item" style="background: #82848a">
          <view class="color-title"> Dark </view>
          <view class="color-value"> #82848a </view>
        </view>
        <view class="color-item" style="background: #c8c9cc">
          <view class="color-title"> Disabled </view>
          <view class="color-value"> #c8c9cc </view>
        </view>
        <view class="color-item" style="color: #909399; background: #f4f4f5">
          <view class="color-title"> Light </view>
          <view class="color-value"> #f4f4f5 </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> Success </view>
      <view class="color-box">
        <view class="color-item" style="background: #19be6b">
          <view class="color-title"> Success </view>
          <view class="color-value"> #19be6b </view>
        </view>
        <view class="color-item" style="background: #18b566">
          <view class="color-title"> Dark </view>
          <view class="color-value"> #18b566 </view>
        </view>
        <view class="color-item" style="background: #71d5a1">
          <view class="color-title"> Disabled </view>
          <view class="color-value"> #71d5a1 </view>
        </view>
        <view class="color-item" style="color: #909399; background: #dbf1e1">
          <view class="color-title"> Light </view>
          <view class="color-value"> #dbf1e1 </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> 文字颜色 </view>
      <view class="color-box">
        <view class="color-item" style="background: #303133">
          <view class="color-title"> 主要文字 </view>
          <view class="color-value"> #303133 </view>
        </view>
        <view class="color-item" style="background: #606266">
          <view class="color-title"> 常规文字 </view>
          <view class="color-value"> #606266 </view>
        </view>
        <view class="color-item" style="background: #909399">
          <view class="color-title"> 次要文字 </view>
          <view class="color-value"> #909399 </view>
        </view>
        <view class="color-item" style="background: #c0c4cc">
          <view class="color-title"> 占位文字 </view>
          <view class="color-value"> #c0c4cc </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> 边框颜色 </view>
      <view class="color-box">
        <view class="color-item" style="color: #909399; background: #dcdfe6">
          <view class="color-title"> 一级边框 </view>
          <view class="color-value"> #dcdfe6 </view>
        </view>
        <view class="color-item" style="color: #909399; background: #e4e7ed">
          <view class="color-title"> 二级边框 </view>
          <view class="color-value"> #e4e7ed </view>
        </view>
        <view class="color-item" style="color: #909399; background: #ebeef5">
          <view class="color-title"> 三级边框 </view>
          <view class="color-value"> #ebeef5 </view>
        </view>
        <view class="color-item" style="color: #909399; background: #f2f6fc">
          <view class="color-title"> 四级边框 </view>
          <view class="color-value"> #f2f6fc </view>
        </view>
      </view>
    </view>
    <view class="item">
      <view class="title"> 背景颜色 </view>
      <view class="color-box">
        <view class="color-item" style="color: #909399; background: #f3f4f6">
          <view class="color-title"> 背景颜色 </view>
          <view class="color-value"> #f3f4f6 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsColor",

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  padding: 18rpx;
}

.item {
  margin: 30rpx 0;
  margin-top: 44rpx;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .title {
    position: relative;
    padding-left: 22rpx;
    font-size: 30rpx;
    line-height: 1;

    &::before {
      position: absolute;
      top: 2rpx;
      left: 6rpx;
      width: 4px;
      height: 15px;
      content: "";
      background-color: $u-content-color;
      border-radius: 100rpx;
    }
  }

  .color-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
    color: #fff;
    text-align: center;

    .color-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 12rpx 0;
      margin: 0 8rpx;
      border-radius: 6rpx;
    }

    .color-title {
      font-size: 28rpx;
    }

    .color-value {
      font-size: 24rpx;
    }
  }
}
</style>
