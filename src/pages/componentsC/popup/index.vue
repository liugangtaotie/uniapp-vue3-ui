<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-button @click="btnClick">唤起弹窗</u-button>
        <u-popup
          border-radius="10"
          v-model="show"
          @close="close"
          @open="open"
          :mode="mode"
          length="50%"
          :mask="mask"
          :closeable="closeable"
          :close-icon-pos="closeIconPos"
          :z-index="uZIndex"
        >
          <view v-if="mode == 'center'" style="height: 400rpx">
            <view class="close-btn">
              <u-button @click="show = false" size="medium">关闭弹窗</u-button>
            </view>
          </view>
          <view class="close-btn" v-if="mode != 'center'">
            <u-button size="medium" @click="show = false">关闭弹窗</u-button>
          </view>
        </u-popup>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="show == false ? 1 : 0"
          :list="['打开', '关闭']"
          @change="showChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">弹出方向</view>
        <u-subsection
          :current="2"
          :list="['上', '下', '左', '右', '中']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">关闭按钮</view>
        <u-subsection :list="['显示', '隐藏']" @change="closeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">关闭按钮位置</view>
        <u-subsection
          :current="1"
          :list="['左上角', '右上角', '左下角', '右下角']"
          @change="closePosChange"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import { zIndex } from "@UVIEW/libs/config/zIndex";

export default defineComponent({
  name: "ComponentsPopup",

  setup() {
    let state: any = reactive({
      show: false,
      mode: "left",
      mask: true, // 是否显示遮罩
      closeable: true,
      closeIconPos: "top-right",
      zIndex: "",
    });

    const uZIndex = computed(() => {
      return state.zIndex ? state.zIndex : zIndex.popup;
    });

    watch(
      () => state.show,
      (val) => {
        // show(val);
      }
    );

    function modeChange(index) {
      state.mode =
        index == 0
          ? "top"
          : index == 1
          ? "bottom"
          : index == 2
          ? "left"
          : index == 3
          ? "right"
          : "center";
      state.show = true;
    }

    function showChange(index) {
      state.show = index == 0 ? true : false;
    }

    function closeChange(index) {
      state.closeable = !index;
    }

    function closePosChange(index) {
      state.closeIconPos = ["top-left", "top-right", "bottom-left", "bottom-right"][index];
    }

    function close() {
      // console.log('close');
    }

    function open() {
      // console.log('open');
    }

    function btnClick() {
      state.show = true;
    }

    return {
      ...toRefs(state),
      uZIndex,
      modeChange,
      showChange,
      closeChange,
      closePosChange,
      close,
      open,
      btnClick,
    };
  },
});
</script>

<style lang="scss" scoped>
// .wrap {
//   padding: 24rpx;
// }

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
