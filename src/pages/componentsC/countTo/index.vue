<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <view class="u-no-demo-here"
          >如果使用text-align: center对齐，数字滚动期间可能会抖动，见文档说明</view
        >
        <view class="count-to-demo">
          <u-count-to
            class="count-to"
            :useEasing="useEasing"
            ref="uCountTo"
            :autoplay="autoplay"
            :startVal="startVal"
            :endVal="endVal"
            :duration="duration"
            :decimals="decimals"
            :bold="bold"
            @end="end"
          ></u-count-to>
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="current"
          :list="['启动', '暂停', '继续', '重置']"
          @change="statusChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">目标值</view>
        <u-subsection :list="[608, 5604, 45617]" @change="endValChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">滚动时间</view>
        <u-subsection
          current="1"
          :list="[1000, 2000, 3000]"
          @change="durationChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">显示小数</view>
        <u-subsection current="1" :list="['是', '否']" @change="decimalsChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">字体加粗</view>
        <u-subsection current="1" :list="['是', '否']" @change="boldChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsCountTo",

  setup() {
    let state = reactive({
      startVal: 0,
      endVal: 608,
      separator: ",",
      decimals: 0,
      duration: 2000,
      autoplay: false,
      useEasing: true,
      current: 3,
      isStop: false, // 如果开没启动前，不允许点击状态选项的"继续"按钮，否则会导致显示NaN
      bold: false,
    });

    function endValChange(index) {
      state.endVal = index == 0 ? 608 : index == 1 ? 5604 : 45617;
      reset();
      start();
    }

    function durationChange(index) {
      state.duration = index == 0 ? 1000 : index == 1 ? 2000 : 3000;
    }

    function boldChange(index) {
      state.bold = !!!index;
    }

    function decimalsChange(index) {
      state.decimals = index == 0 ? 2 : 0;
    }

    function statusChange(index) {
      state.current = index;
      if (index == 0) {
        start();
      } else if (index == 1) {
        stop();
      } else if (index == 2) {
        resume();
      } else {
        reset();
      }
    }

    function end() {
      state.current = 3;
      instanceProxy.$refs.uToast.show({
        type: "warning",
        title: "滚动结束",
      });
    }

    function start() {
      state.current = 0;
      state.isStop = true;

      instanceProxy.$refs.uCountTo.start();
    }

    function stop() {
      instanceProxy.$refs.uCountTo.stop();
    }

    function resume() {
      if (!state.isStop) {
        instanceProxy.$refs.uToast.show({
          type: "error",
          title: "请开始并暂停后才能继续",
        });
        instanceProxy.$nextTick(() => {
          state.current = 3;
        });
        return;
      }
      instanceProxy.$refs.uCountTo.resume();
    }

    function reset() {
      instanceProxy.$refs.uCountTo.reset();
    }

    return {
      ...toRefs(state),
      endValChange,
      durationChange,
      boldChange,
      decimalsChange,
      statusChange,
      start,
      end,
      stop,
      resume,
      reset,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.count-to-demo {
  text-align: center;
}
</style>
