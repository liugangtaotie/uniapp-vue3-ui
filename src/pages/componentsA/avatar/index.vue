<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-avatar
          :mode="mode"
          :size="size"
          :src="src"
          :text="text"
          :showLevel="showLevel"
          :showSex="showSex"
          :sexIcon="sexIcon"
          :bgColor="bgColor"
        ></u-avatar>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">模式选择</view>
        <u-subsection :list="['圆形', '圆角方形']" @change="modeChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">性别选择</view>
        <u-subsection :list="['男', '女', '不显示']" @change="sexChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">等级</view>
        <u-subsection :list="['显示', '不显示']" @change="levelChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义内容</view>
        <u-subsection current="0" :list="['图片', '文字']" @change="styleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">尺寸</view>
        <u-subsection
          current="1"
          :list="['large', 'default', 'mini', 160]"
          @change="sizeChange"
        ></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsAvatar",

  setup(props: any) {
    let state = reactive({
      mode: "circle",
      src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
      text: "", // 优先级比src高
      size: "90",
      showLevel: true,
      showSex: true,
      sexIcon: "man",
      bgColor: "#fcbd71",
    });

    // 点击模式选择
    function modeChange(index) {
      state.mode = index == 0 ? "circle" : "square";
    }

    // 点击自定义内容
    function styleChange(index) {
      if (index == 0) {
        state.text = "";
        state.src = "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg";
      } else {
        state.text = "无头像";
      }
    }

    // 点击尺寸
    function sizeChange(index) {
      state.size = (index == 0
        ? "large"
        : index == 1
        ? "default"
        : index == 2
        ? "mini"
        : 160) as any;
    }

    // 点击性别选择
    function sexChange(index) {
      state.showSex = true;
      if (index == 0) state.sexIcon = "man";
      if (index == 1) state.sexIcon = "woman";
      if (index == 2) state.showSex = false;
    }

    // 点击等级
    function levelChange(index) {
      state.showLevel = !index;
    }

    return {
      ...toRefs(state),
      modeChange,
      styleChange,
      sizeChange,
      sexChange,
      levelChange,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
