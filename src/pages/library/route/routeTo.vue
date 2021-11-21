<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view class="u-no-demo-here"> 收到的参数为：{{ paramsStr }} </view>
        <view class="u-btn-wrap">
          <u-button @click="back">返回</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsRouteTo",

  setup() {
    let state = reactive({
      params: {},
    });

    const paramsStr = computed(() => {
      return JSON.stringify(state.params);
    });

    function back() {
      instanceProxy.$u.route({
        type: "back",
        animationType: "slide-in-top",
      });
    }

    return {
      ...toRefs(state),
      paramsStr,
      back,
    };
  },

  onLoad(option) {
    this.params = option;
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

.u-btn-wrap {
  margin-top: 50rpx;
}
</style>
