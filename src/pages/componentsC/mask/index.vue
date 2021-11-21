<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <view class="u-no-demo-here"> 请点击弹出遮罩查看效果 </view>
        <u-mask
          :show="show"
          @click="show = false"
          :z-index="uZIndex"
          :zoom="zoom"
          :duration="duration"
        >
          <view class="warp" v-if="content">
            <view class="rect" @tap.stop></view>
          </view>
        </u-mask>
      </view>
    </view>

    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection
          :current="current"
          :list="['显示', '隐藏']"
          @change="showChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">缩放效果</view>
        <u-subsection :list="['是', '否']" @change="zoomChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">内容填充</view>
        <u-subsection current="1" :list="['是', '否']" @change="contentChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">动画时长(ms)</view>
        <u-subsection
          current="1"
          :list="['100', '300', '800']"
          @change="durationChange"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, computed } from "vue";
import { zIndex } from "@UVIEW/libs/config/zIndex";

export default defineComponent({
  name: "ComponentsMask",

  setup() {
    let state: any = reactive({
      show: false,
      zoom: true,
      duration: 300,
      content: false,
      zIndex: "",
    });

    const uZIndex = computed(() => {
      return state.zIndex ? state.zIndex : zIndex.mask;
    });

    const current = computed(() => {
      return state.show ? 0 : 1;
    });

    function showChange(index) {
      state.show = index == 0 ? true : false;
    }

    function zoomChange(index) {
      state.zoom = index == 0 ? true : false;
      state.show = true;
    }

    function durationChange(index) {
      state.duration = index == 0 ? 100 : index == 1 ? 300 : 800;
      state.show = true;
    }

    function contentChange(index) {
      state.content = index == 0 ? true : false;
      state.show = true;
    }

    return {
      ...toRefs(state),
      uZIndex,
      current,
      showChange,
      zoomChange,
      durationChange,
      contentChange,
    };
  },
});
</script>


<style scoped lang="scss">
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.rect {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
