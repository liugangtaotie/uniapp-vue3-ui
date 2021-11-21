<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-slider
          :step="step"
          :height="height"
          :block-width="blockWidth"
          :active-color="activeColor"
          :value="30"
          :use-slot="useSlot"
          v-model="value"
          :min="min"
          :max="max"
          @end="end"
          @moving="moving"
        >
          <!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
          <view class="" v-if="useSlot">
            <view class="badge-button">
              {{ value }}
            </view>
          </view>
          <!-- #endif -->
        </u-slider>
        <view class="u-demo-result-line"> 滑块值：{{ value }} </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">自定义颜色</view>
        <u-subsection
          :list="['primary', 'warning', 'error', 'success']"
          @change="typeChange"
        ></u-subsection>
      </view>
      <!-- #ifndef MP-WEIXIN -->
      <view class="u-config-item">
        <view class="u-item-title">自定义传入内容</view>
        <u-subsection current="1" :list="['是', '否']" @change="slotChange"></u-subsection>
      </view>
      <!-- #endif -->
      <view class="u-config-item">
        <view class="u-item-title">自定义尺寸</view>
        <u-subsection current="1" :list="['是', '否']" @change="sizeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">步进值</view>
        <u-subsection :list="['1', '10', '20']" @change="stepChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">最大最小值</view>
        <u-subsection :list="['0-100', '40-80']" @change="minMaxchange"></u-subsection>
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
  setup(props: any) {
    let state = reactive({
      value: 30,
      useSlot: false,
      setp: 1,
      activeColor: "#2979ff",
      height: 6,
      blockWidth: 30,
      step: "1",
      min: 0,
      max: 100,
    });
    onMounted(() => {});
    // 是否禁用，如果父组件u-checkbox-group禁用的话，将会忽略子组件的配置
    const current = computed(() => {
      return props.show ? 0 : 1;
    });

    function typeChange(index) {
      let type = ["primary", "warning", "error", "success"];
      state.activeColor = color[type[index]];
    }
    function sizeChange(index) {
      if (index == 0) {
        state.height = 4;
        state.blockWidth = 30;
      } else {
        state.height = 6;
        state.blockWidth = 20;
      }
    }
    function stepChange(index) {
      let arr = ["1", "10", "20"];
      state.step = arr[index];
    }
    function slotChange(index) {
      state.useSlot = !index;
    }
    function minMaxchange(index) {
      if (index == 0) {
        state.min = 0;
        state.max = 100;
      } else {
        state.min = 40;
        state.max = 80;
      }
    }
    function end() {}
    function moving() {}

    return {
      ...toRefs(state),
      current,
      typeChange,
      sizeChange,
      stepChange,
      slotChange,
      minMaxchange,
      end,
      moving,
    };
  },
});
</script>

 

<style scoped lang="scss">
.badge-button {
  padding: 4rpx 6rpx;
  font-size: 22rpx;
  line-height: 1;
  color: #fff;
  background-color: $u-type-error;
  border-radius: 10rpx;
}
</style>
