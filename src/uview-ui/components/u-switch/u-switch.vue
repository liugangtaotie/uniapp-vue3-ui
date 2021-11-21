<template>
  <view
    class="u-switch"
    :class="[value == true ? 'u-switch--on' : '', disabled ? 'u-switch--disabled' : '']"
    @tap="onClick"
    :style="switchStyle"
  >
    <view class="u-switch__node node-class" :style="fontStyle">
      <u-loading
        :show="loading"
        class="u-switch__loading"
        :size="size * 0.6"
        :color="loadingColor"
      />
    </view>
  </view>
</template>


<script lang='ts'>
/**
 * switch 开关选择器
 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
 * @tutorial https://www.uviewui.com/components/switch.html
 * @property {Boolean} loading 是否处于加载中（默认false）
 * @property {Boolean} disabled 是否禁用（默认false）
 * @property {String Number} size 开关尺寸，单位rpx（默认50）
 * @property {String} active-color 打开时的背景色（默认#2abc6d）
 * @property {Boolean} inactive-color 关闭时的背景色（默认#ffffff）
 * @property {Boolean | Number | String} active-value 打开选择器时通过change事件发出的值（默认true）
 * @property {Boolean | Number | String} inactive-value 关闭选择器时通过change事件发出的值（默认false）
 * @event {Function} change 在switch打开或关闭时触发
 * @example <u-switch v-model="checked" active-color="red" inactive-color="#eee"></u-switch>
 */
import { defineComponent, onMounted, computed, toRefs, getCurrentInstance, reactive } from "vue";
import indexVue from "@/pages/componentsA/avatar/index.vue";
import { addUnit } from "../../libs/function/addUnit.js"; // 添加单位
import { toast } from "../../libs/function/toast.js";
import { $parent } from "../../libs/function/$parent"; // 获取整个父组件
import { styleObjToString } from "../../libs/function/styleObjToString";

export default defineComponent({
  name: "u-switch",
  components: {},

  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: false,
    },
    // 开关尺寸，单位rpx
    size: {
      type: [Number, String],
      default: 50,
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: "#2abc6d",
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: "#ffffff",
    },
    // 通过v-model双向绑定的值
    value: {
      type: Boolean,
      default: false,
    },
    // 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
    vibrateShort: {
      type: Boolean,
      default: false,
    },
    // 打开选择器时的值
    activeValue: {
      type: [Number, String, Boolean],
      default: true,
    },
    // 关闭选择器时的值
    inactiveValue: {
      type: [Number, String, Boolean],
      default: false,
    },
  },

  setup(props: any, { emit }) {
    let state = reactive({});
    onMounted(() => {});

    const switchStyle = computed(() => {
      let style: any = {};
      style["font-size"] = props.size + "rpx";
      style["background"] = props.value ? props.activeColor : props.inactiveColor;
      console.log("style:", styleObjToString(style));

      return styleObjToString(style);
    });

    const fontStyle = computed(() => {
      let style: any = {};
      style.width = addUnit(props.size);
      style.height = addUnit(props.size);
      return styleObjToString(style);
    });

    const loadingColor = computed(() => {
      return props.value ? props.activeColor : null;
    });

    function onClick() {
      if (!props.disabled && !props.loading) {
        // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
        if (props.vibrateShort) {
          uni.vibrateShort({});
        }
        emit("input", !props.value);
        // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
        props.$nextTick(() => {
          emit("change", props.value ? props.activeValue : props.inactiveValue);
        });
      }
    }

    return {
      switchStyle,
      fontStyle,
      loadingColor,
      onClick,
    };
  },
});
</script>


<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-switch {
  position: relative;

  /* #endif */
  box-sizing: initial;

  /* #ifndef APP-NVUE */
  display: inline-block;
  width: 2em;
  height: 1em;
  font-size: 50rpx;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  transition: background-color 0.3s;
}

.u-switch__node {
  @include vue-flex;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-color: #fff;
  border-radius: 100%;
  box-shadow:
    0 3px 1px 0 rgba(0, 0, 0, 0.05),
    0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow:
    0 3px 1px 0 rgba(0, 0, 0, 0.05),
    0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition:
    transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05),
    -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
}

.u-switch__loading {
  @include vue-flex;

  align-items: center;
  justify-content: center;
}

.u-switch--on {
  background-color: #1989fa;
}

.u-switch--on .u-switch__node {
  transform: translateX(100%);
}

.u-switch--disabled {
  opacity: 0.4;
}
</style>
