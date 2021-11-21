<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-row :justify="justify" @click="rowClick">
          <u-col :span="span" :offset="offset" @click="click" stop>
            <view class="demo-layout bg-purple-dark"> </view>
          </u-col>
          <u-col :span="span" :offset="offset">
            <view class="demo-layout bg-purple-dark"> </view>
          </u-col>
          <u-col :span="span" :offset="offset">
            <view class="demo-layout bg-purple-dark"> </view>
          </u-col>
        </u-row>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">每个栅格占用栏数(演示共3个栅格)</view>
        <u-subsection :current="2" :list="[1, 2, 3, 4]" @change="spanChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">分栏偏移</view>
        <u-subsection :list="[0, 1, 2, 3]" @change="offsetChange"></u-subsection>
      </view>
      <!-- #ifndef MP -->
      <view class="u-config-item">
        <view class="u-item-title">水平排列方式(微信小程序无效)</view>
        <u-subsection
          :list="['start', 'end', 'around', 'between']"
          @change="justifyChange"
        ></u-subsection>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsLayout",

  setup() {
    let state = reactive({ span: 3, offset: 0, justify: "start" });

    function click() {
      console.log("col click");
    }

    function rowClick() {
      console.log("row click");
    }

    // 点击参数配置
    function spanChange(e) {
      switch (e) {
        case 0:
          state.span = 1;
          break;
        case 1:
          state.span = 2;
          break;
        case 2:
          state.span = 3;
          break;
        case 3:
          state.span = 4;
          break;
        case 4:
          state.span = 5;
          break;
      }
    }

    // 点击分栏偏移
    function offsetChange(e) {
      switch (e) {
        case 0:
          state.offset = 0;
          break;
        case 1:
          state.offset = 1;
          break;
        case 2:
          state.offset = 2;
          break;
        case 3:
          state.offset = 3;
          break;
      }
    }

    // 点击水平排列方式
    function justifyChange(e) {
      switch (e) {
        case 0:
          state.justify = "start";
          break;
        case 1:
          state.justify = "end";
          break;
        case 2:
          state.justify = "around";
          break;
        case 3:
          state.justify = "between";
          break;
      }
    }

    return {
      ...toRefs(state),
      click,
      rowClick,
      spanChange,
      offsetChange,
      justifyChange,
    };
  },
});
</script>

<style scoped lang="scss">
.demo-layout {
  height: 70rpx;
  margin: 20rpx 0;
  border-radius: 8rpx;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.bg-purple-dark {
  background: #99a9bf;
}

// H5中，电脑端文档演示时，可能会导致演示块挤出边界，特别处理。
// 真实使用环境不会产生此问题

/* #ifdef H5 */
.u-demo-area /deep/ .u-row {
  display: flex;
  flex-wrap: wrap;
}

/* #endif */
</style>
