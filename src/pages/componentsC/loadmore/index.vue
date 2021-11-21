<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast" />
        <u-loadmore
          :status="status"
          :loadText="loadText"
          :icon-type="iconType"
          :is-dot="isDot"
          @loadmore="loadmore"
        />
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection
          :current="current"
          :list="['加载前', '加载中', '加载后', '没有更多']"
          @change="statusChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义提示语</view>
        <u-subsection current="1" :list="['是', '否']" @change="loadTextChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">加载中图标样式</view>
        <u-subsection :list="['circle', 'flower']" @change="styleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">没有更多时用点替代</view>
        <u-subsection current="1" :list="['是', '否']" @change="isDotChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
let instanceProxy: any;

export default defineComponent({
  name: "ComponentsLoadmore",

  setup() {
    let state = reactive({
      status: "loadmore",
      iconType: "circle",
      isDot: false,
      loadText: {
        loadmore: "点击或上拉加载更多",
        loading: "正在加载...",
        nomore: "没有更多了",
      },
      current: 0,
    });

    function statusChange(index) {
      state.current = index;
      state.status =
        index == 0 ? "loadmore" : index == 1 ? "loading" : index == 2 ? "loadmore" : "nomore";
    }

    function loadTextChange(index) {
      if (index == 0) {
        state.loadText = {
          loadmore: "用力往上拉",
          loading: "正在加载，请喝杯茶...",
          nomore: "我也是有底线的",
        };
      } else {
        state.loadText = {
          loadmore: "点击或上拉加载更多",
          loading: "正在加载...",
          nomore: "没有更多了",
        };
      }
    }

    function styleChange(index) {
      state.current = 1;
      statusChange(1);
      state.iconType = index == 0 ? "circle" : "flower";
    }

    function isDotChange(index) {
      state.current = 3;
      statusChange(3);
      state.isDot = index == 0 ? true : false;
    }

    // 点击组件，触发加载更多事件(status为'loadmore'状态下才触发)
    function loadmore() {
      instanceProxy.$refs.uToast.show({
        title: "点击触发加载更多",
        type: "success",
      });
    }

    return {
      ...toRefs(state),
      statusChange,
      loadTextChange,
      styleChange,
      isDotChange,
      loadmore,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
</style>
