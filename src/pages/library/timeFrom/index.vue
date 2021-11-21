<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <view class="u-no-demo-here" style="text-align: left">
          根据当前时间，返回类似"刚刚，5分钟前，8小时前，3天前"等字样
        </view>
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">时间</view>
        <u-subsection :list="timeArr1" @change="timeArr1Change"></u-subsection>
        <u-gap></u-gap>
        <u-subsection
          style="margin-top: 40rpx"
          :list="timeArr2"
          @change="timeArr2Change"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { timeFormat } from "@UVIEW/libs/function/timeFormat";
import { random } from "@UVIEW/libs/function/random";

export default defineComponent({
  name: "ComponentsTimeFrom",

  setup(props: any) {
    // 微信小程序无法动态修改u-subsection的list参数，导致onLoad中赋值timeArr1，timeArr2无效，故在data中直接赋值
    let nowTime = Number(+new Date());
    let threeDayAgo = nowTime - 2 * 86400000;
    let arr1: any = [0, 0],
      arr2: any = [0, 0];
    [0, 0].map((val, index) => {
      arr1[index] = timeFormat(random(threeDayAgo, nowTime), "yyyy/mm/dd hh:MM:ss");
      arr2[index] = timeFormat(random(threeDayAgo, nowTime), "yyyy/mm/dd hh:MM:ss");
    });
    let state = reactive({
      timeArr1: arr1,
      timeArr2: arr2,
      result: null,
    });

    timeArr1Change(0);

    function timeArr1Change(index) {
      // this.result = timeFrom(new Date(this.timeArr1[index]).getTime());
    }

    function timeArr2Change(index) {
      // this.result = timeFrom(new Date(this.timeArr2[index]).getTime());
    }

    return {
      ...toRefs(state),
      timeArr1Change,
      timeArr2Change,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
