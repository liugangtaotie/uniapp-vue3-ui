<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <view
          class=""
          :style="{
            display: !top ? 'block' : 'none',
          }"
        >
          <view class="rect-block-1">第一个节点</view>
          <view class="rect-block-2">第2个节点</view>
          <view class="u-no-demo-here">节点信息为</view>
          <view class="u-demo-result-line">{{ JSON.stringify(result) }}</view>
        </view>
        <view class="jump-to-top">
          <u-button
            @click="scrollToTop"
            :style="{
              display: top ? 'block' : 'none',
            }"
          >
            点我自动滚动到顶部
          </u-button>
        </view>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom">参数配置</view>
      <view class="u-config-item">
        <view class="u-item-title">元素</view>
        <u-subsection :list="['第一个节点', '第2个节点']" @change="elChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">指定元素置顶</view>
        <u-subsection current="1" :list="['是', '否']" @change="topChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, Static } from "vue";
import mixin from "@UVIEW/libs/mixin/mixin";
let instanceProxy: any;

export default defineComponent({
  name: "ComponentsGetRect",

  mixins: [mixin],

  setup(props: any) {
    let state = reactive({
      result: "",
      scrollTop: 0,
      top: false,
    });

    async function elChange(index: any) {
      let el = index == 0 ? ".rect-block-1" : ".rect-block-2";
      state.result = (await instanceProxy) && instanceProxy.$uGetRect(el);
    }

    function scrollToTop() {
      instanceProxy &&
        instanceProxy.$uGetRect(".jump-to-top").then((res) => {
          uni.pageScrollTo({
            scrollTop: state.scrollTop + res.top,
            duration: 0,
          });
        });
    }

    function topChange(index) {
      state.top = index == 0 ? true : false;
      if (index == 1) {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 0,
        });
      }
    }

    return {
      ...toRefs(state),
      elChange,
      scrollToTop,
      topChange,
    };
  },

  mounted() {
    instanceProxy = this;
    this.elChange(0);
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
});
</script>

<style lang="scss" scoped>
.u-demo {
  min-height: 200vh;
}

.rect-block-1 {
  display: inline-flex;
  padding: 26rpx 60rpx;
  margin: auto;
  color: #fff;
  background-color: #a0cfff;
}

.rect-block-2 {
  width: 60%;
  padding: 12rpx 8rpx;
  margin: 30rpx auto;
  color: #fff;
  background-color: #fcbd71;
}
</style>
