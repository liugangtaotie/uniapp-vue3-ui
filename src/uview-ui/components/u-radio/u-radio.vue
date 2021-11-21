<template>
  <view class="u-radio" :style="radioStyle">
    <view class="u-radio__icon-wrap" @tap="toggle" :class="iconClass" :style="iconStyle">
      <u-icon
        class="u-radio__icon-wrap__icon"
        name="checkbox-mark"
        :size="elIconSize"
        :color="iconColor"
      />
    </view>
    <view class="u-radio__label" @tap="onClickLabel" :style="labelStyle">
      <slot />
    </view>
  </view>
</template>


<script lang='ts'>
/**
 * radio 单选框
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio-group使用
 * @tutorial https://www.uviewui.com/components/radio.html
 * @property {String Number} icon-size 图标大小，单位rpx（默认24）
 * @property {String Number} label-size label字体大小，单位rpx（默认28）
 * @property {String Number} name radio组件的标示符
 * @property {String} shape 形状，见上方说明（默认circle）
 * @property {Boolean} disabled 是否禁用（默认false）
 * @property {Boolean} label-disabled 点击文本是否可以操作radio（默认true）
 * @property {String} active-color 选中时的颜色，如设置parent的active-color将失效
 * @event {Function} change 某个radio状态发生变化时触发(选中状态)
 * @example <u-radio :label-disabled="false">门掩黄昏，无计留春住</u-radio>
 */
import { defineComponent, onMounted, computed, toRefs, getCurrentInstance, reactive } from "vue";
import { addUnit } from "../../libs/function/addUnit.js"; // 添加单位
import { toast } from "../../libs/function/toast.js";
import { $parent } from "../../libs/function/$parent"; // 获取整个父组件
import { styleObjToString } from "../../libs/function/styleObjToString";
let instanceProxy: any;
let parent: any;
export default defineComponent({
  name: "u-radio",

  props: {
    // radio的名称
    name: {
      type: [String, Number],
      default: "",
    },
    // 形状，square为方形，circle为原型
    shape: {
      type: String,
      default: "",
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: "",
    },
    // 是否禁止点击提示语选中复选框
    labelDisabled: {
      type: [String, Boolean],
      default: "",
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: "",
    },
    // 图标的大小，单位rpx
    iconSize: {
      type: [String, Number],
      default: "",
    },
    // label的字体大小，rpx单位
    labelSize: {
      type: [String, Number],
      default: "",
    },
  },

  mounted() {
    instanceProxy = this;
    parent = $parent.call(instanceProxy, "u-radio-group");
    // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
    parent.$children.push(instanceProxy);
    // instanceProxy.updateParentData();
  },

  emits: ["change"],

  setup(props: any, { emit }) {
    let state = reactive({
      // 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
      // 故只能使用如此方法
      parentData: {
        iconSize: null,
        labelDisabled: null,
        disabled: null,
        shape: null,
        activeColor: null,
        size: null,
        width: "",
        height: null,
        value: null,
        wrap: null,
      },
    });

    onMounted(() => {});

    // 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
    const elDisabled = computed(() => {
      return props.disabled !== ""
        ? props.disabled
        : state.parentData.disabled !== null
        ? state.parentData.disabled
        : false;
    });

    // 是否禁用label点击
    const elLabelDisabled = computed(() => {
      return props.labelDisabled !== ""
        ? props.labelDisabled
        : state.parentData.labelDisabled !== null
        ? state.parentData.labelDisabled
        : false;
    });

    // 组件尺寸，对应size的值，默认值为34rpx
    const elSize = computed(() => {
      return props.size ? props.size : state.parentData.size ? state.parentData.size : 34;
    });

    // 组件的勾选图标的尺寸，默认20
    const elIconSize = computed(() => {
      return props.iconSize
        ? props.iconSize
        : state.parentData.iconSize
        ? state.parentData.iconSize
        : 20;
    });

    // 组件选中激活时的颜色
    const elActiveColor = computed(() => {
      console.log("props.activeColor", props.activeColor);
      const temp = props.activeColor
        ? props.activeColor
        : props.parentData.activeColor
        ? props.parentData.activeColor
        : "primary";
      return temp;
    });

    // 组件的形状
    const elShape = computed(() => {
      return props.shape ? props.shape : state.parentData.shape ? state.parentData.shape : "circle";
    });

    // 设置radio的状态，要求radio的name等于parent的value时才为选中状态
    const iconStyle = computed(() => {
      let style: any = {};
      if (elActiveColor.value && state.parentData.value == props.name && !elDisabled.value) {
        style.borderColor = elActiveColor.value;
        style.background = elActiveColor.value;

        console.log("elActiveColor.value", elActiveColor.value);
      }

      style.width = addUnit(elSize.value);
      style.height = addUnit(elSize.value);
      return styleObjToString(style);
    });

    //
    const iconColor = computed(() => {
      const temp = props.name == state.parentData.value ? "#ffffff" : "transparent";
      console.log(temp);
      return temp;
    });

    //
    const iconClass = computed(() => {
      let classes: any = [];
      classes.push("u-radio__icon-wrap--" + elShape.value);
      if (props.name == state.parentData.value) classes.push("u-radio__icon-wrap--checked");
      if (elDisabled.value) classes.push("u-radio__icon-wrap--disabled");
      if (props.name == state.parentData.value && elDisabled.value)
        classes.push("u-radio__icon-wrap--disabled--checked");
      // 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      return classes.join(" ");
    });

    //
    const radioStyle = computed(() => {
      let style: any = {};
      if (state.parentData.width) {
        style.width = addUnit(state.parentData.width);
        // #ifdef MP
        // 各家小程序因为它们特殊的编译结构，使用float布局
        style.float = "left";
        // #endif
        // #ifndef MP
        // H5和APP使用flex布局
        style.flex = `0 0 ${addUnit(state.parentData.width)}`;
        // #endif
      }
      if (state.parentData.wrap) {
        style.width = "100%";
        // #ifndef MP
        // H5和APP使用flex布局，将宽度设置100%，即可自动换行
        style.flex = "0 0 100%";
        // #endif
      }
      return styleObjToString(style);
    });

    function updateParentData() {
      instanceProxy.getParentData("u-radio-group");
    }

    function onClickLabel() {
      if (!elLabelDisabled.value && !elDisabled.value) {
        setRadioCheckedStatus();
      }
    }

    function toggle() {
      if (!elDisabled.value) {
        setRadioCheckedStatus();
      }
    }

    function emitEvent() {
      console.log("state.parentData.value", state.parentData.value);
      console.log("props.name", props.name);

      // u-radio的name不等于父组件的v-model的值时(意味着未选中)，才发出事件，避免多次点击触发事件
      if (state.parentData.value != props.name) emit("change", props.name);
    }

    // 改变组件选中状态
    // 这里的改变的依据是，更改本组件的parentData.value值为本组件的name值，同时通过父组件遍历所有u-radio实例
    // 将本组件外的其他u-radio的parentData.value都设置为空(由computed计算后，都被取消选中状态)，因而只剩下一个为选中状态
    function setRadioCheckedStatus() {
      emitEvent();
      console.log("instanceProxy.parent", parent);

      if (parent) {
        parent.setValue(props.name);
        state.parentData.value = props.name;
      }
    }

    //
    const labelStyle = computed(() => {
      let style: any = {};
      style.fontSize = addUnit(props.labelSize);
      return styleObjToString(style);
    });

    return {
      ...toRefs(state),
      ...toRefs(props),
      elDisabled,
      elLabelDisabled,
      elSize,
      elIconSize,
      elActiveColor,
      elShape,
      iconStyle,
      iconColor,
      iconClass,
      radioStyle,
      updateParentData,
      onClickLabel,
      toggle,
      emitEvent,
      setRadioCheckedStatus,
      labelStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-radio {
  /* #ifndef APP-NVUE */
  display: inline-flex;

  /* #endif */
  align-items: center;
  overflow: hidden;
  line-height: 1.8;
  user-select: none;

  &__icon-wrap {
    box-sizing: border-box;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 42rpx;
    height: 42rpx;
    font-size: 20px;
    color: $u-content-color;
    color: transparent;
    text-align: center;
    border: 1px solid #c8c9cc;
    transition-duration: 0.2s;
    transition-property: color, border-color, background-color;
    @include vue-flex;

    /* #ifdef MP-TOUTIAO */
    // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
    &__icon {
      line-height: 0;
    }

    /* #endif */

    &--circle {
      border-radius: 100%;
    }

    &--square {
      border-radius: 3px;
    }

    &--checked {
      color: #fff;
      background-color: #2abc6d;
      border-color: #2abc6d;
    }

    &--disabled {
      background-color: #ebedf0;
      border-color: #c8c9cc;
    }

    &--disabled--checked {
      color: #c8c9cc !important;
    }
  }

  &__label {
    margin-right: 24rpx;
    margin-left: 10rpx;
    font-size: 30rpx;
    color: $u-content-color;
    word-wrap: break-word;

    &--disabled {
      color: #c8c9cc;
    }
  }
}
</style>
