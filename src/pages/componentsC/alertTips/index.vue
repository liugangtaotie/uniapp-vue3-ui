<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-alert-tips
          @close="close"
          :closeAble="closeAble"
          :show="show"
          @click="click"
          :type="type"
          :title="title"
          :description="description"
          :showIcon="showIcon"
        ></u-alert-tips>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">左侧图标</view>
        <u-subsection current="1" :list="['是', '否']" @change="showIconChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">关闭图标</view>
        <u-subsection current="1" :list="['显示', '隐藏']" @change="closeAbleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">主题</view>
        <u-subsection
          current="3"
          :list="['primary', 'success', 'error', 'warning', 'info']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="current"
          :list="['开启', '关闭']"
          @change="showChange"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, computed } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsAlertTips",

  setup() {
    let state = reactive({
      title: "大漠孤烟直，长河落日圆",
      description:
        "月落乌啼霜满天，江枫渔火对愁眠。姑苏城外寒山寺，夜半钟声到客船。飞流直下三千尺，疑是银河落九天！",
      show: true,
      closeAble: false,
      showIcon: false,
      type: "warning",
    });

    const current = computed(() => {
      return state.show ? 0 : 1;
    });

    function showIconChange(index) {
      state.showIcon = index == 0 ? true : false;
    }

    function showChange(index) {
      state.show = index == 0 ? true : false;
    }

    function closeAbleChange(index) {
      state.closeAble = index == 0 ? true : false;
    }

    function typeChange(index) {
      state.type =
        index == 0
          ? "primary"
          : index == 1
          ? "success"
          : index == 2
          ? "error"
          : index == 3
          ? "warning"
          : "info";
    }

    function close() {
      state.show = false;
      instanceProxy.$refs.uToast.show({
        type: "warning",
        title: "点击关闭按钮",
      });
    }

    function click() {
      instanceProxy.$refs.uToast.show({
        type: "warning",
        title: "点击内容",
      });
    }

    return {
      ...toRefs(state),
      current,
      showIconChange,
      showChange,
      closeAbleChange,
      typeChange,
      close,
      click,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  padding: 24rpx;
}

.item {
  margin: 30rpx 0;
}
</style>
