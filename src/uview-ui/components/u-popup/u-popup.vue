<template>
  <view v-if="visibleSync" :style="customStyleString" class="u-drawer" hover-stop-propagation>
    <u-mask
      :duration="duration"
      :custom-style="maskCustomStyle"
      :maskClickAble="maskCloseAble"
      :z-index="uZindex - 2"
      :show="showDrawer && mask"
      @click="maskClick"
    ></u-mask>
    <view
      class="u-drawer-content"
      @tap="modeCenterClose(mode)"
      :class="[
        safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
        'u-drawer-' + mode,
        showDrawer ? 'u-drawer-content-visible' : '',
        zoom && mode == 'center' ? 'u-animation-zoom' : '',
      ]"
      @touchmove.stop.prevent
      @tap.stop.prevent
      :style="style"
    >
      <view
        class="u-mode-center-box"
        @tap.stop.prevent
        @touchmove.stop.prevent
        v-if="mode == 'center'"
        :style="centerStyle"
      >
        <u-icon
          @click="iconClose"
          v-if="closeable"
          class="u-close"
          :class="['u-close--' + closeIconPos]"
          :name="closeIcon"
          :color="closeIconColor"
          :size="closeIconSize"
        ></u-icon>
        <scroll-view class="u-drawer__scroll-view" scroll-y="true">
          <slot />
        </scroll-view>
      </view>
      <scroll-view class="u-drawer__scroll-view" scroll-y="true" v-else>
        <slot />
      </scroll-view>
      <view @tap="iconClose" class="u-close" :class="['u-close--' + closeIconPos]">
        <u-icon
          v-if="mode != 'center' && closeable"
          :name="closeIcon"
          :color="closeIconColor"
          :size="closeIconSize"
        ></u-icon>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
/**
 * popup 弹窗
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
 * @tutorial https://www.uviewui.com/components/popup.html
 * @property {String} mode 弹出方向（默认left）
 * @property {Boolean} mask 是否显示遮罩（默认true）
 * @property {Stringr | Number} length mode=left | 见官网说明（默认auto）
 * @property {Boolean} zoom 是否开启缩放动画，只在mode为center时有效（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭弹出层（默认true）
 * @property {Object} custom-style 用户自定义样式
 * @property {Stringr | Number} negative-top 中部弹出时，往上偏移的值
 * @property {Numberr | String} border-radius 弹窗圆角值（默认0）
 * @property {Numberr | String} z-index 弹出内容的z-index值（默认1075）
 * @property {Boolean} closeable 是否显示关闭图标（默认false）
 * @property {String} close-icon 关闭图标的名称，只能uView的内置图标
 * @property {String} close-icon-pos 自定义关闭图标位置（默认top-right）
 * @property {String} close-icon-color 关闭图标的颜色（默认#909399）
 * @property {Number | String} close-icon-size 关闭图标的大小，单位rpx（默认30）
 * @event {Function} open 弹出层打开
 * @event {Function} close 弹出层收起
 * @example <u-popup v-model="show"><view>出淤泥而不染，濯清涟而不妖</view></u-popup>
 */
import { styleObjToString } from "@/uview-ui/libs/function/styleObjToString";
import { defineComponent, onMounted, reactive, toRefs, watch, computed } from "vue";
import { zIndex } from "../../libs/config/zIndex";
import { addUnit } from "../../libs/function/addUnit";

export default defineComponent({
  name: "u-popup",

  props: {
    /**
     * 显示状态
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * 弹出方向，left|right|top|bottom|center
     */
    mode: {
      type: String,
      default: "left",
    },
    /**
     * 是否显示遮罩
     */
    mask: {
      type: Boolean,
      default: true,
    },
    // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度
    length: {
      type: [Number, String],
      default: "auto",
    },
    // 是否开启缩放动画，只在mode=center时有效
    zoom: {
      type: Boolean,
      default: true,
    },
    // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
    safeAreaInsetBottom: {
      type: Boolean,
      default: false,
    },
    // 是否可以通过点击遮罩进行关闭
    maskCloseAble: {
      type: Boolean,
      default: true,
    },
    // 用户自定义样式
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Boolean,
      default: false,
    },
    // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
    // 对v-model双向绑定多层调用造成报错不能修改props值的问题
    popup: {
      type: Boolean,
      default: true,
    },
    // 显示显示弹窗的圆角，单位rpx
    borderRadius: {
      type: [Number, String],
      default: 0,
    },
    zIndex: {
      type: [Number, String],
      default: "",
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false,
    },
    // 关闭图标的名称，只能uView的内置图标
    closeIcon: {
      type: String,
      default: "close",
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: "top-right",
    },
    // 关闭图标的颜色
    closeIconColor: {
      type: String,
      default: "#909399",
    },
    // 关闭图标的大小，单位rpx
    closeIconSize: {
      type: [String, Number],
      default: "30",
    },
    // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    width: {
      type: String,
      default: "",
    },
    // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    height: {
      type: String,
      default: "",
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
    negativeTop: {
      type: [String, Number],
      default: 0,
    },
    // 遮罩的样式，一般用于修改遮罩的透明度
    maskCustomStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    // 遮罩打开或收起的动画过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 250,
    },
  },

  emits: ["open", "close", "input"],

  setup(props: any, { emit }) {
    let state: any = reactive({
      visibleSync: false,
      showDrawer: true,
      timer: null,
      closeFromInner: false, // value的值改变，是发生在内部还是外部
    });

    onMounted(() => {
      // 组件渲染完成时，检查value是否为true，如果是，弹出popup
      props.value && open();
    });

    watch(
      () => props.value,
      (Val) => {
        values(Val);
        state.closeFromInner = false;
      }
    );

    // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
    const style: any = computed(() => {
      let style: any = {};
      // 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
      if (props.mode == "left" || props.mode == "right") {
        style = {
          width: props.width ? getUnitValue(props.width) : getUnitValue(props.length),
          height: "100%",
          transform: `translate3D(${props.mode == "left" ? "-100%" : "100%"},0px,0px)`,
        };
      } else if (props.mode == "top" || props.mode == "bottom") {
        style = {
          width: "100%",
          height: props.height ? getUnitValue(props.height) : getUnitValue(props.length),
          transform: `translate3D(0px,${props.mode == "top" ? "-100%" : "100%"},0px)`,
        };
      }
      style.zIndex = uZindex;
      // 如果用户设置了borderRadius值，添加弹窗的圆角
      if (props.borderRadius) {
        switch (props.mode) {
          case "left":
            style.borderRadius = `0 ${props.borderRadius}rpx ${props.borderRadius}rpx 0`;
            break;
          case "top":
            style.borderRadius = `0 0 ${props.borderRadius}rpx ${props.borderRadius}rpx`;
            break;
          case "right":
            style.borderRadius = `${props.borderRadius}rpx 0 0 ${props.borderRadius}rpx`;
            break;
          case "bottom":
            style.borderRadius = `${props.borderRadius}rpx ${props.borderRadius}rpx 0 0`;
            break;
          default:
        }
        // 不加可能圆角无效
        style.overflow = "hidden";
      }
      if (props.duration) style.transition = `all ${props.duration / 1000}s linear`;
      return styleObjToString(style);
    });

    // 中部弹窗的特有样式
    const centerStyle: any = computed(() => {
      let style: any = {};
      style.width = props.width ? getUnitValue(props.width) : getUnitValue(props.length);
      // 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开高度
      style.height = props.height ? getUnitValue(props.height) : "auto";
      style.zIndex = uZindex;
      style.marginTop = `-${addUnit(props.negativeTop)}`;
      if (props.borderRadius) {
        style.borderRadius = `${props.borderRadius}rpx`;
        // 不加可能圆角无效
        style.overflow = "hidden";
      }
      return styleObjToString(style);
    });

    // 自定义样式
    const customStyleString: any = computed(() => {
      let style = Object.assign({
        "z-index": props.zIndex,
      });
      return styleObjToString(style);
    });

    // 计算整理后的z-index值
    const uZindex: any = computed(() => {
      return props.zIndex ? props.zIndex : zIndex.mask;
    });

    // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
    function getUnitValue(val) {
      if (/(%|px|rpx|auto)$/.test(val)) return val;
      else return val + "rpx";
    }
    // 遮罩被点击
    function maskClick() {
      console.log("close:1");
      close();
    }
    // 点击关闭icon
    function iconClose() {
      console.log("close:3");
      close();
    }
    function close() {
      console.log("close:2");
      // 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
      // 造成@close事件触发两次
      state.closeFromInner = true;
      change("showDrawer", "visibleSync", false);
    }
    // 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
    // 让其只在mode=center时起作用
    function modeCenterClose(mode) {
      if (mode != "center" || !props.maskCloseAble) return;
      close();
    }
    function open() {
      change("visibleSync", "showDrawer", true);
    }
    // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
    // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
    function change(param1: any, param2: any, status) {
      // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
      if (props.popup == true) {
        emit("input", status);
      }
      state[param1] = status;
      if (status) {
        // #ifdef H5 || MP
        state.timer = setTimeout(() => {
          state[param2] = status;
          emit(status ? "open" : "close");
        }, 50);
        // #endif
        // #ifndef H5 || MP
        // this.$nextTick(() => {
        //   this[param2] = status;
        //   emit(status ? "open" : "close");
        // });
        // #endif
      } else {
        state.timer = setTimeout(() => {
          state[param2] = status;
          emit(status ? "open" : "close");
        }, props.duration);
      }
    }
    function values(val) {
      console.log("val:", val);
      if (val) {
        open();
      } else if (!state.closeFromInner) {
        close();
      }
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      style,
      centerStyle,
      customStyleString,
      uZindex,
      getUnitValue,
      maskClick,
      iconClose,
      close,
      modeCenterClose,
      open,
      change,
      values,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-drawer {
  /* #endif */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* #ifndef APP-NVUE */
  display: block;
  overflow: hidden;
}

.u-drawer-content {
  /* #endif */
  position: absolute;
  z-index: 1003;

  /* #ifndef APP-NVUE */
  display: block;
  transition: all 0.25s linear;
}

.u-drawer__scroll-view {
  width: 100%;
  height: 100%;
}

.u-drawer-left {
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
}

.u-drawer-right {
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}

.u-drawer-top {
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
}

.u-drawer-bottom {
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
}

.u-drawer-center {
  @include vue-flex;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.u-mode-center-box {
  /* #endif */
  position: relative;

  /* #ifndef APP-NVUE */
  display: block;
  min-width: 100rpx;
  min-height: 100rpx;
  background-color: #fff;
}

.u-drawer-content-visible.u-drawer-center {
  opacity: 1;
  transform: scale(1);
}

.u-animation-zoom {
  transform: scale(1.15);
}

.u-drawer-content-visible {
  transform: translate3d(0, 0, 0) !important;
}

.u-close {
  position: absolute;
  z-index: 3;
}

.u-close--top-left {
  top: 30rpx;
  left: 30rpx;
}

.u-close--top-right {
  top: 30rpx;
  right: 30rpx;
}

.u-close--bottom-left {
  bottom: 30rpx;
  left: 30rpx;
}

.u-close--bottom-right {
  right: 30rpx;
  bottom: 30rpx;
}
</style>
