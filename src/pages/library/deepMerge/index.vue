<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here">
          源对象1为："{info: {name: 'mary'}}"
          <view class=""> </view>
          源对象2为："{info: {age: '22'}}"
        </view>
        <view class="u-demo-result-line">
          {{ result }}
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式</view>
        <u-subsection :list="['浅拷贝', '深拷贝']" @change="modeChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { deepClone } from "@UVIEW/libs/function/deepClone";
import { deepMerge } from "@UVIEW/libs/function/deepMerge";

export default defineComponent({
  name: "ComponentsDeepMerge",

  setup() {
    let state = reactive({
      obj1: {
        info: {
          name: "mary",
        },
      },
      obj2: {
        info: {
          age: "22",
        },
      },
      // obj1和obj3一样，原因是Object.assign(state.obj1, state.obj2)会修改obj1的值
      obj3: {
        info: {
          name: "mary",
        },
      },
      result: "" as any,
    });

    state.result = Object.assign(state.obj1, state.obj2);
    // 重新修改obj1为原来的值
    state.obj1 = deepClone(state.obj3);

    function modeChange(index) {
      if (!index) {
        state.result = Object.assign(state.obj1, state.obj2);
        // 重新修改obj1为原来的值
        state.obj1 = deepClone(state.obj3);
      } else {
        state.result = deepMerge(state.obj1, state.obj2);
      }
    }

    return {
      ...toRefs(state),
      modeChange,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
