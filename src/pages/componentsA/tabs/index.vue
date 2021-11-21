<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-tabs
          v-if="control"
          bg-color="#fafafa"
          :bold="bold"
          :active-color="activeColor"
          :list="list"
          @change="change"
          :current="current"
          :is-scroll="isScroll"
          :offset="offset"
        ></u-tabs>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection
          :current="sectionCurrent"
          :list="['滚动', '非滚动']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">标签个数(非滚动模式)</view>
        <u-subsection :list="['2', '3', '4']" @change="countChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">活动选项字颜色</view>
        <u-subsection
          mode="button"
          :list="['primary', 'success', 'error', 'warning']"
          @change="colorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">字体加粗</view>
        <u-subsection mode="button" :list="['是', '否']" @change="boldChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { color } from "@UVIEW/libs/function/color";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsTabs",

  setup() {
    let state: any = reactive({
      list: [],
      data: [
        {
          name: "关注",
          count: 100,
        },
        {
          name: "推荐",
          count: 7,
        },
        {
          name: "电影",
        },
        {
          name: "电视剧",
        },
        {
          name: "小视频",
        },
        {
          name: "游戏",
        },
        {
          name: "校园",
        },
        {
          name: "影视",
        },
        {
          name: "音乐",
        },
      ],
      current: 0,
      sectionCurrent: 0,
      isScroll: true,
      tabCountIndex: 0,
      activeColor: color["primary"],
      bold: true,
      control: true,
      offset: [5, -5],
    });

    // onLoad(() => {
    //   state.list = state.data;
    // });
    function countChange(index) {
      state.sectionCurrent = 1;
      if (index == 0) {
        state.list = [];
        state.list.push(state.data[0]);
        state.list.push(state.data[1]);
        state.offset = [5, 60];
      } else if (index == 1) {
        state.list = [];
        state.list.push(state.data[0]);
        state.list.push(state.data[1]);
        state.list.push(state.data[2]);
        state.offset = [5, 20];
      } else {
        state.list = [];
        state.list.push(state.data[0]);
        state.list.push(state.data[1]);
        state.list.push(state.data[2]);
        state.list.push(state.data[3]);
        state.offset = [5, 5];
      }
      state.tabCountIndex = index;
      state.isScroll = false;
    }

    function change(index) {
      state.current = index;
    }

    function modeChange(index) {
      state.control = false;
      state.current = 0;
      if (index == 0) {
        state.isScroll = true;
        state.list = state.data;
        state.offset = [5, -5];
      } else {
        state.isScroll = false;
        countChange(state.tabCountIndex);
      }
      instanceProxy.$nextTick(() => {
        state.control = true;
      });
    }

    function colorChange(e) {
      let color = "primary";
      switch (e) {
        case 0:
          color = "primary";
          break;
        case 1:
          color = "success";
          break;
        case 2:
          color = "error";
          break;
        case 3:
          color = "warning";
          break;
      }
      state.activeColor = state.$u.color[color];
    }

    function boldChange(e) {
      switch (e) {
        case 0:
          state.bold = true;
          break;
        case 1:
          state.bold = false;
          break;
      }
    }

    return {
      ...toRefs(state),
      countChange,
      change,
      modeChange,
      colorChange,
      boldChange,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
</style>
