<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <u-swiper
          @change="change"
          :height="250"
          :list="list"
          :title="title"
          :effect3d="effect3d"
          :indicator-pos="indicatorPos"
          :mode="mode"
          :interval="3000"
          @click="click"
        ></u-swiper>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">指示器模式</view>
        <u-subsection
          :list="['round', 'rect', 'number', 'none']"
          @change="modeChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">标题</view>
        <u-subsection current="1" :list="['显示', '隐藏']" @change="titleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">指示器位置</view>
        <u-subsection
          current="3"
          :list="['上左', '上右', '下左', '下中', '下右']"
          @change="indicatorPosChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">3D效果</view>
        <u-subsection current="1" :list="['开启', '关闭']" @change="effect3dChange"></u-subsection>
      </view>
    </view>
  </view>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "Components",

  setup() {
    let state: any = reactive({
      list: [
        {
          image: "https://cdn.uviewui.com/uview/swiper/1.jpg",
          title: "昨夜星辰昨夜风，画楼西畔桂堂东",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/2.jpg",
          title: "身无彩凤双飞翼，心有灵犀一点通",
        },
        {
          image: "https://cdn.uviewui.com/uview/swiper/3.jpg",
          title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
        },
      ],
      title: false,
      mode: "round",
      indicatorPos: "bottomCenter",
      effect3d: false,
    });

    function titleChange(index) {
      state.title = index == 0 ? true : false;
    }

    function modeChange(index) {
      state.mode = index == 0 ? "round" : index == 1 ? "rect" : index == 2 ? "number" : "none";
    }

    function indicatorPosChange(index) {
      state.indicatorPos =
        index == 0
          ? "topLeft"
          : index == 1
          ? "topRight"
          : index == 2
          ? "bottomLeft"
          : index == 3
          ? "bottomCenter"
          : "bottomRight";
    }

    function effect3dChange(index) {
      state.effect3d = index == 0 ? true : false;
    }

    function click(index) {
      instanceProxy.$refs.uToast.show({
        title: `点击了第${index + 1}张图片`,
        type: "success",
      });
    }

    function change(index) {
      // console.log(index);
    }

    return {
      ...toRefs(state),
      titleChange,
      modeChange,
      indicatorPosChange,
      effect3dChange,
      click,
      change,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>


<style lang="scss" scoped>
.item {
  margin: 30rpx 0;
}
</style>
