<template>
  <view class="u-checkbox" :style="checkboxStyle">
    <view class="u-checkbox__icon-wrap" @tap="toggle" :class="iconClass" :style="iconStyle">
      <u-icon
        class="u-checkbox__icon-wrap__icon"
        name="checkbox-mark"
        :size="checkboxIconSize"
        :color="iconColor"
      />
    </view>
    <view class="u-checkbox__label" @tap="onClickLabel" :style="labelStyle">
      <slot />
    </view>
  </view>
</template>


<script lang='ts'>
/**
 * checkbox 复选框
 * @description 该组件需要搭配checkboxGroup组件使用，以便用户进行操作时，获得当前复选框组的选中情况。
 * @tutorial https://www.uviewui.com/components/checkbox.html
 * @property {String Number} icon-size 图标大小，单位rpx（默认20）
 * @property {String Number} label-size label字体大小，单位rpx（默认28）
 * @property {String Number} name checkbox组件的标示符
 * @property {String} shape 形状，见官网说明（默认circle）
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} label-disabled 是否禁止点击文本操作checkbox
 * @property {String} active-color 选中时的颜色，如设置CheckboxGroup的active-color将失效
 * @event {Function} change 某个checkbox状态发生变化时触发，回调为一个对象
 * @example <u-checkbox v-model="checked" :disabled="false">天涯</u-checkbox>
 */

import { defineComponent, onMounted, computed, toRefs, getCurrentInstance, reactive } from "vue";
import indexVue from "@/pages/componentsA/avatar/index.vue";
import { addUnit } from "../../libs/function/addUnit.js"; // 添加单位
import { toast } from "../../libs/function/toast.js";
import { $parent } from "../../libs/function/$parent"; // 获取整个父组件
import { styleObjToString } from "../../libs/function/styleObjToString";

let instanceProxy: any;
let parent: any;

export default defineComponent({
  name: "u-checkbox",

  emits: ["change", "input"],

  props: {
    // checkbox的名称
    name: {
      type: [String, Number],
      default: "",
    },
    // 形状，square为方形，circle为原型
    shape: {
      type: String,
      default: "",
    },
    // 是否为选中状态
    value: {
      type: Boolean,
      default: false,
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
    // 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值
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
    // 组件的整体大小
    size: {
      type: [String, Number],
      default: "",
    },
  },

  mounted() {
    instanceProxy = this;
    // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环应用
    parent = $parent.call(instanceProxy, "u-checkbox-group");
    // 如果存在u-checkbox-group，将本组件的this塞进父组件的children中
    console.log("parent:::", parent.$children);

    parent && parent.$children.push(instanceProxy);
  },

  setup(props: any, { emit }) {
    let state = reactive({
      parentDisabled: false, //
      newParams: {}, //
    });

    // 是否禁用，如果父组件u-checkbox-group禁用的话，将会忽略子组件的配置
    const isDisabled = computed(() => {
      return props.disabled !== "" ? props.disabled : parent ? parent.disabled : false;
    });

    // 是否禁用label点击
    const isLabelDisabled = computed(() => {
      return props.labelDisabled !== ""
        ? props.labelDisabled
        : parent
        ? parent.labelDisabled
        : false;
    });

    const labelStyle = computed(() => {
      let style: any = {};
      style.fontSize = addUnit(props.labelSize);
      return styleObjToString(style);
    });

    // 组件尺寸，对应size的值，默认值为34rpx
    const checkboxSize = computed(() => {
      return props.size ? props.size : parent ? parent.size : 34;
    });

    // 组件的勾选图标的尺寸，默认20
    const checkboxIconSize = computed(() => {
      return props.iconSize ? props.iconSize : parent ? parent.iconSize : 20;
    });

    // 组件选中激活时的颜色
    const elActiveColor = computed(() => {
      return props.activeColor ? props.activeColor : parent ? parent.activeColor : "primary";
    });

    // 组件的形状
    const elShape = computed(() => {
      return props.shape ? props.shape : parent ? parent.shape : "square";
    });

    //
    const iconStyle = computed(() => {
      let style: any = {};
      // 既要判断是否手动禁用，还要判断用户v-model绑定的值，如果绑定为false，那么也无法选中
      if (props.elActiveColor && props.value && !props.isDisabled) {
        style.borderColor = props.elActiveColor;
        style.backgroundColor = props.elActiveColor;
      }
      style.width = addUnit(props.checkboxSize);
      style.height = addUnit(props.checkboxSize);
      return styleObjToString(style);
    });

    //checkbox内部的勾选图标，如果选中状态，为白色，否则为透明色即可
    const iconColor = computed(() => {
      return props.value ? "#ffffff" : "transparent";
    });

    //
    const iconClass = computed(() => {
      let classes: any = [];
      classes.push("u-checkbox__icon-wrap--" + elShape.value);
      if (props.value == true) classes.push("u-checkbox__icon-wrap--checked");
      if (props.isDisabled) classes.push("u-checkbox__icon-wrap--disabled");
      if (props.value && props.isDisabled) classes.push("u-checkbox__icon-wrap--disabled--checked");
      // 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      classes.join(" ");
      console.log("class:::", styleObjToString(classes));

      return styleObjToString(classes);
    });

    //
    const checkboxStyle = computed(() => {
      let style: any = {};
      if (parent && parent.width) {
        style.width = parent.width;
        // #ifdef MP
        // 各家小程序因为它们特殊的编译结构，使用float布局
        style.float = "left";
        // #endif
        // #ifndef MP
        // H5和APP使用flex布局
        style.flex = `0 0 ${parent.width}`;
        // #endif
      }
      if (parent && parent.wrap) {
        style.width = "100%";
        // #ifndef MP
        // H5和APP使用flex布局，将宽度设置100%，即可自动换行
        style.flex = "0 0 100%";
        // #endif
      }
      return styleObjToString(style);
    });

    function onClickLabel() {
      if (!props.isLabelDisabled && !props.isDisabled) {
        setValue();
      }
    }
    function toggle() {
      if (!isDisabled) {
        setValue();
      }
    }
    function emitEvent() {
      emit("change", {
        value: !props.value,
        name: props.name,
      });
      // 执行父组件u-checkbox-group的事件方法
      // 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
      setTimeout(() => {
        if (parent && parent.emitEvent) parent.emitEvent();
      }, 80);
    }
    // 设置input的值，这里通过input事件，设置通过v-model绑定的组件的值
    function setValue() {
      // 判断是否超过了可选的最大数量
      let checkedNum = 0;
      if (parent && parent.children) {
        // 只要父组件的某一个子元素的value为true，就加1(已有的选中数量)
        parent.children.map((val) => {
          if (val.value) checkedNum++;
        });
      }
      // 如果原来为选中状态，那么可以取消
      if (props.value == true) {
        emitEvent();
        emit("input", !props.value);
      } else {
        // 如果超出最多可选项，提示
        if (props.parent && checkedNum >= props.parent.max) {
          return toast(`最多可选${props.parent.max}项`);
        }
        // 如果原来为未选中状态，需要选中的数量少于父组件中设置的max值，才可以选中
        emitEvent();
        emit("input", !props.value);
      }
    }

    onMounted(() => {});

    return {
      ...toRefs(state),
      ...toRefs(props),
      isDisabled,
      isLabelDisabled,
      checkboxSize,
      checkboxIconSize,
      elActiveColor,
      elShape,
      iconStyle,
      iconColor,
      iconClass,
      checkboxStyle,
      labelStyle,
      onClickLabel,
      toggle,
      emitEvent,
      setValue,
    };
  },
});
</script>

 
<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-checkbox {
  /* #ifndef APP-NVUE */
  display: inline-flex;

  /* #endif */
  align-items: center;
  overflow: hidden;
  line-height: 1.8;
  user-select: none;

  &__icon-wrap {
    box-sizing: border-box;
    display: -webkit-flex;
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
      border-radius: 6rpx;
    }

    &--checked {
      color: #fff;
      background-color: $u-type-primary;
      border-color: $u-type-primary;
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
