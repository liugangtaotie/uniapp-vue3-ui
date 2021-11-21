<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-switch
          v-model="checked"
          :loading="loading"
          :size="size"
          @change="change"
          :active-color="activeColor"
          :disabled="disabled"
          :activeValue="100"
          :inactiveValue="1"
        ></u-switch>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">状态</view>
        <u-subsection :list="['关闭', '打开']" @change="modelChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">颜色</view>
        <u-subsection
          :list="['primary', 'error', 'warning', 'success']"
          @change="colorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">尺寸(单位rpx)</view>
        <u-subsection current="1" :list="['40', '60', '80']" @change="sizeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">加载中</view>
        <u-subsection :list="['否', '是']" @change="loadingChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">禁用</view>
        <u-subsection current="1" :list="['是', '否']" @change="disabledChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">异步控制</view>
        <u-subsection :list="['关闭', '打开']" @change="asyncChange"></u-subsection>
      </view>
    </view>
  </view>
</template>


<script lang='ts'>
import { defineComponent, reactive, toRefs, computed, onMounted } from "vue";
import { color } from "../../../uview-ui/libs/function/color";
import { toast } from "@UVIEW/libs/function/toast";

export default defineComponent({
  name: "Components",
  components: {},
  setup(props) {
    let state = reactive({
      checked: false,
      activeColor: "#2979ff",
      size: "50",
      loading: false,
      disabled: false,
    });
    onMounted(() => {});

    function modelChange(index) {
      // 两个!!可以把0变成false，1变成true
      state.checked = !!index;
    }

    function colorChange(index) {
      let colors =
        index == 0 ? "primary" : index == 1 ? "error" : index == 2 ? "warning" : "success";
      state.activeColor = color[colors];
    }

    function sizeChange(index) {
      state.size = index == 0 ? "40" : index == 1 ? "60" : "80";
    }
    function loadingChange(index) {
      state.loading = !!index;
    }
    function disabledChange(index) {
      state.disabled = index == 0 ? true : false;
    }
    function asyncChange(index) {
      if (state.checked && index == 1) {
        toast("请先关闭选择器");
        return;
      }
      if (!state.checked && index == 0) {
        toast("请先打开选择器");
        return;
      }
      let str = index == 0 ? "是否要关闭？" : "是否要打开？";
      state.loading = true;
      let oldStatus = state.checked;
      state.checked = true;
      uni.showModal({
        title: "提示",
        content: str,
        complete: (res) => {
          state.loading = false;
          if (res.confirm) {
            if (oldStatus) state.checked = false;
            else state.checked = true;
          } else {
            if (!oldStatus) state.checked = false;
            else state.checked = true;
          }
        },
      });
    }
    function change(value) {}

    return {
      ...toRefs(state),
      modelChange,
      colorChange,
      sizeChange,
      loadingChange,
      disabledChange,
      asyncChange,
      change,
    };
  },
});
</script>


<style scoped lang="scss">
</style>
