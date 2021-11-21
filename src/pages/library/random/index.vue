<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">操作</view>
        <u-subsection
          :list="['min=0, max=5', 'min=541, max=8164']"
          @change="paramsChange"
        ></u-subsection>
        <view class="u-btn-wrap">
          <u-button @click="getResult">执行</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { random } from "@UVIEW/libs/function/random";

export default defineComponent({
  name: "ComponentsRandom",

  setup() {
    let state = reactive({
      min: 0,
      max: 5,
      result: "" as any,
    });

    getResult();

    function paramsChange(index) {
      if (index == 0) {
        state.min = 0;
        state.max = 5;
      } else {
        state.min = 541;
        state.max = 8164;
      }
      getResult();
    }

    function getResult() {
      state.result = random(state.min, state.max);
    }

    return {
      ...toRefs(state),
      paramsChange,
      getResult,
    };
  },
});
</script>

<style lang="scss" scoped>
.u-btn-wrap {
  margin-top: 50rpx;
}
</style>
