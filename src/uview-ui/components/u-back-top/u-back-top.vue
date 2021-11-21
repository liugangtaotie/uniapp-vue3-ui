<template>
  <view
    @tap="backToTop"
    class="u-back-top"
    :class="['u-back-top--mode--' + mode]"
    :style="customStyleStr"
  >
    <view class="u-back-top__content" v-if="!$slots.default && !$slots.$default">
      <u-icon @click="backToTop" :name="icon" :custom-style="iconStyle"></u-icon>
      <view class="u-back-top__content__tips">
        {{ tips }}
      </view>
    </view>
    <slot v-else />
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs, watch } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";

export default defineComponent({
  name: "u-back-top",

  props: {
    // 返回顶部的形状，circle-圆形，square-方形
    mode: {
      type: String,
      default: "circle",
    },
    // 自定义图标
    icon: {
      type: String,
      default: "arrow-upward",
    },
    // 提示文字
    tips: {
      type: String,
      default: "",
    },
    // 返回顶部滚动时间
    duration: {
      type: [Number, String],
      default: 100,
    },
    // 滚动距离
    scrollTop: {
      type: [Number, String],
      default: 0,
    },
    // 距离顶部多少距离显示，单位rpx
    top: {
      type: [Number, String],
      default: 400,
    },
    // 返回顶部按钮到底部的距离，单位rpx
    bottom: {
      type: [Number, String],
      default: 200,
    },
    // 返回顶部按钮到右边的距离，单位rpx
    right: {
      type: [Number, String],
      default: 40,
    },
    // 层级
    zIndex: {
      type: [Number, String],
      default: "9",
    },
    // 图标的样式，对象形式
    iconStyle: {
      type: Object,
      default() {
        return {
          color: "#909399",
          fontSize: "38rpx",
        };
      },
    },
    // 整个组件的样式
    customStyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  setup(props: any) {
    let state = reactive({
      // 不透明度，为了让组件有一个显示和隐藏的过渡动画
      opacity: 0,
      // 组件的z-index值，隐藏时设置为-1，就会看不到
      uZIndex: -1,
    });

    watch(
      () => showBackTop,
      (newVal, oldVal) => {
        // 当组件的显示与隐藏状态发生跳变时，修改组件的层级和不透明度
        // 让组件有显示和消失的动画效果，如果用v-if控制组件状态，将无设置动画效果
        if (newVal) {
          state.uZIndex = props.zIndex;
          state.opacity = 1;
        } else {
          state.uZIndex = -1;
          state.opacity = 0;
        }
      }
    );

    const showBackTop = computed(() => {
      // 由于scrollTop为页面的滚动距离，默认为px单位，这里将用于传入的top(rpx)值
      // 转为px用于比较，如果滚动条到顶的距离大于设定的距离，就显示返回顶部的按钮
      return props.scrollTop > uni.upx2px(props.top);
    });

    const customStyleStr = styleObjToString(
      Object.assign(
        {
          bottom: props.bottom + "rpx",
          right: props.right + "rpx",
          borderRadius: props.mode == "circle" ? "10000rpx" : "8rpx",
          zIndex: state.uZIndex,
          opacity: state.opacity,
        },
        props.customStyle
      )
    );

    function backToTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: props.duration,
      });
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      backToTop,
      showBackTop,
      customStyleStr,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-back-top {
  position: fixed;
  z-index: 9;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  color: $u-content-color;
  background-color: #e1e1e1;
  transition: opacity 0.4s;
  @include vue-flex;

  &__content {
    @include vue-flex;

    flex-direction: column;
    align-items: center;

    &__tips {
      font-size: 24rpx;
      line-height: 1;
      transform: scale(0.8);
    }
  }
}
</style>
