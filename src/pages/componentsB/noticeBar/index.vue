<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-notice-bar
          :autoplay="autoplay"
          :playState="playState"
          :speed="speed"
          @getMore="getMore"
          :mode="mode"
          @end="end"
          @close="close"
          @click="click"
          :show="show"
          :type="type"
          :list="list"
          :moreIcon="moreIcon"
          :volumeIcon="volumeIcon"
          :duration="duration"
          :isCircular="isCircular"
        ></u-notice-bar>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">主题</view>
        <u-subsection
          :current="3"
          :list="['primary', 'success', 'error', 'warning', 'none']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">滚动模式</view>
        <u-subsection
          :current="current"
          :list="['水平', '垂直']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">是否衔接(水平模式有效)</view>
        <u-subsection :list="['是', '否']" @change="isCircularChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection :list="['播放', '暂停']" @change="playStateChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">速度</view>
        <u-subsection
          :current="1"
          :list="['慢', '正常', '快']"
          @change="speedChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">图标</view>
        <u-subsection :list="['显示', '隐藏']" @change="iconChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { toast } from "@UVIEW/libs/function/toast";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsNoticeBar",

  setup(props: any) {
    let state = reactive({
      show: true,
      autoplay: false,
      type: "warning",
      list: [
        "锦瑟无端五十弦，一弦一柱思华年",
        "庄生晓梦迷蝴蝶，望帝春心托杜鹃",
        "沧海月明珠有泪，蓝田日暖玉生烟",
      ],
      mode: "horizontal",
      playState: "play",
      speed: 160,
      duration: 2000,
      moreIcon: true,
      volumeIcon: true,
      isCircular: true,
      current: 0,
    });

    function typeChange(index) {
      let type = ["primary", "success", "error", "warning", "none"];
      state.type = type[index];
    }

    function modeChange(index) {
      state.current = index;
      state.mode = index == 0 ? "horizontal" : "vertical";
    }

    function playStateChange(index) {
      state.playState = index == 0 ? "play" : "paused";
    }

    function speedChange(index) {
      if (index == 0) {
        instanceProxy.$nextTick(() => {
          state.speed = 50;
          state.duration = 6000;
        });
      } else if (index == 1) {
        instanceProxy.$nextTick(() => {
          state.speed = 160;
          state.duration = 2000;
        });
      } else {
        instanceProxy.$nextTick(() => {
          state.speed = 350;
          state.duration = 400;
        });
      }
    }

    function iconChange(index) {
      if (index == 0) {
        state.moreIcon = true;
        state.volumeIcon = true;
      } else {
        state.moreIcon = false;
        state.volumeIcon = false;
      }
    }

    function isCircularChange(index) {
      state.isCircular = index == 0 ? true : false;
      state.current = 0;
      state.mode = "horizontal";
    }

    function close() {
      toast(`点击了关闭图标`);
    }

    function click(index) {
      if (state.mode == "horizontal" && state.isCircular) {
        toast("此模式无法获取Index值");
      } else {
        toast(`点击了第${index + 1}条消息`);
      }
    }

    function getMore() {
      toast(`点击了更多图标`);
    }

    function toast(title) {
      toast(title);
    }

    function end() {
      // console.log('end');
    }

    return {
      ...toRefs(state),
      typeChange,
      modeChange,
      playStateChange,
      speedChange,
      iconChange,
      isCircularChange,
      close,
      click,
      getMore,
      toast,
      end,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.item {
  margin-top: 30px;
}
</style>
