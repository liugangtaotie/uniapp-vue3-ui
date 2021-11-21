<template>
  <view
    v-if="show"
    :class="[
      disabled ? 'u-disabled' : '',
      'u-size-' + size,
      'u-shape-' + shape,
      'u-mode-' + mode + '-' + type,
    ]"
    class="u-tag"
    :style="customStyle"
    @tap.native="clickTag"
  >
    {{ text }}
    <view class="u-icon-wrap" @tap.stop>
      <u-icon
        @click.native="close"
        size="22"
        v-if="closeable"
        :color="closeIconColor"
        name="close"
        class="u-close-icon"
        :style="iconStyle"
      ></u-icon>
    </view>
  </view>
</template>

<script lang='ts'>
/**
 * tag 提示
 * @description 该组件一般用于标记和选择
 * @tutorial https://www.uviewui.com/components/tag.html
 * @property {String} type 主题类型（默认primary）
 * @property {String} size 标签大小（默认default）
 * @property {String} shape 标签形状（默认square）
 * @property {String} text 标签的文字内容
 * @property {String} bg-color 自定义标签的背景颜色
 * @property {String} border-color 标签的边框颜色
 * @property {String} close-color 关闭按钮的颜色
 * @property {String Number} index 点击标签时，会通过click事件返回该值
 * @property {String} mode 模式选择，见官网说明（默认light）
 * @property {Boolean} closeable 是否可关闭，设置为true，文字右边会出现一个关闭图标（默认false）
 * @property {Boolean} show 标签显示与否（默认true）
 * @event {Function} click 点击标签触发
 * @event {Function} close closeable为true时，点击标签关闭按钮触发
 * @example <u-tag text="雪月夜" type="success" />
 */
import { defineComponent, computed, toRefs } from "vue";

export default defineComponent({
  name: "u-tag",

  // 是否禁用这个标签，禁用的话，会屏蔽点击事件
  props: {
    // 标签类型info、primary、success、warning、error
    type: {
      type: String,
      default: "primary",
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    // 标签的大小，分为default（默认），mini（较小）
    size: {
      type: String,
      default: "default",
    },
    // tag的形状，circle（两边半圆形）, square（方形，带圆角），circleLeft（左边是半圆），circleRight（右边是半圆）
    shape: {
      type: String,
      default: "square",
    },
    // 标签文字
    text: {
      type: [String, Number],
      default: "",
    },
    // 背景颜色，默认为空字符串，即不处理
    bgColor: {
      type: String,
      default: "",
    },
    // 标签字体颜色，默认为空字符串，即不处理
    color: {
      type: String,
      default: "",
    },
    // 镂空形式标签的边框颜色
    borderColor: {
      type: String,
      default: "",
    },
    // 关闭按钮图标的颜色
    closeColor: {
      type: String,
      default: "",
    },
    // 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
    index: {
      type: [Number, String],
      default: "",
    },
    // 模式选择，dark|light|plain
    mode: {
      type: String,
      default: "light",
    },
    // 是否可关闭
    closeable: {
      type: Boolean,
      default: false,
    },
    // 是否显示
    show: {
      type: Boolean,
      default: true,
    },
  },

  emits: ["click", "close"],

  setup(props: any, { emit }) {
    const customStyle = computed(() => {
      let style: any = {};
      // 文字颜色（如果有此值，会覆盖type值的颜色）
      if (props.color) style.color = props.color;
      // tag的背景颜色（如果有此值，会覆盖type值的颜色）
      if (props.bgColor) style.backgroundColor = props.bgColor;
      // 如果是镂空型tag，没有传递边框颜色（borderColor）的话，使用文字的颜色（color属性）
      if (props.mode == "plain" && props.color && !props.borderColor)
        style.borderColor = props.color;
      else style.borderColor = props.borderColor;
      return style;
    });

    const iconStyle = computed(() => {
      if (!props.closeable) return;
      let style: any = {};
      if (props.size == "mini") style.fontSize = "20rpx";
      else style.fontSize = "22rpx";
      if (props.mode == "plain" || props.mode == "light") style.color = props.type;
      else if (props.mode == "dark") style.color = "#ffffff";
      if (props.closeColor) style.color = props.closeColor;
      return style;
    });

    // 关闭图标的颜色
    const closeIconColor = computed(() => {
      // 如果定义了关闭图标的颜色，就用此值，否则用字体颜色的值
      // 如果上面的二者都没有，如果是dark深色模式，图标就为白色
      // 最后如果上面的三者都不合适，就返回type值给图标获取颜色
      let color = "";
      if (props.closeColor) return props.closeColor;
      else if (props.color) return props.color;
      else if (props.mode == "dark") return "#ffffff";
      else return props.type;
    });

    // 标签被点击
    function clickTag() {
      // 如果是disabled状态，不发送点击事件
      if (props.disabled) return;
      emit("click", props.index);
    }

    // 点击标签关闭按钮
    function close() {
      emit("close", props.index);
    }

    return {
      ...toRefs(props),
      customStyle,
      iconStyle,
      closeIconColor,
      clickTag,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-tag {
  box-sizing: border-box;

  /* #ifndef APP-NVUE */
  display: inline-block;
  align-items: center;

  /* #endif */
  line-height: 1;
  border-radius: 6rpx;
}

.u-size-default {
  padding: 12rpx 22rpx;
  font-size: 22rpx;
}

.u-size-mini {
  padding: 6rpx 12rpx;
  font-size: 20rpx;
}

.u-mode-light-primary {
  color: $u-type-primary;
  background-color: $u-type-primary-light;
  border: 1px solid $u-type-primary-disabled;
}

.u-mode-light-success {
  color: $u-type-success;
  background-color: $u-type-success-light;
  border: 1px solid $u-type-success-disabled;
}

.u-mode-light-error {
  color: $u-type-error;
  background-color: $u-type-error-light;
  border: 1px solid $u-type-error-disabled;
}

.u-mode-light-warning {
  color: $u-type-warning;
  background-color: $u-type-warning-light;
  border: 1px solid $u-type-warning-disabled;
}

.u-mode-light-info {
  color: $u-type-info;
  background-color: $u-type-info-light;
  border: 1px solid $u-type-info-disabled;
}

.u-mode-dark-primary {
  color: #fff;
  background-color: $u-type-primary;
}

.u-mode-dark-success {
  color: #fff;
  background-color: $u-type-success;
}

.u-mode-dark-error {
  color: #fff;
  background-color: $u-type-error;
}

.u-mode-dark-warning {
  color: #fff;
  background-color: $u-type-warning;
}

.u-mode-dark-info {
  color: #fff;
  background-color: $u-type-info;
}

.u-mode-plain-primary {
  color: $u-type-primary;
  background-color: #fff;
  border: 1px solid $u-type-primary;
}

.u-mode-plain-success {
  color: $u-type-success;
  background-color: #fff;
  border: 1px solid $u-type-success;
}

.u-mode-plain-error {
  color: $u-type-error;
  background-color: #fff;
  border: 1px solid $u-type-error;
}

.u-mode-plain-warning {
  color: $u-type-warning;
  background-color: #fff;
  border: 1px solid $u-type-warning;
}

.u-mode-plain-info {
  color: $u-type-info;
  background-color: #fff;
  border: 1px solid $u-type-info;
}

.u-disabled {
  opacity: 0.55;
}

.u-shape-circle {
  border-radius: 100rpx;
}

.u-shape-circleRight {
  border-radius: 0 100rpx 100rpx 0;
}

.u-shape-circleLeft {
  border-radius: 100rpx 0 0 100rpx;
}

.u-close-icon {
  margin-left: 14rpx;
  font-size: 22rpx;
  color: $u-type-success;
}

.u-icon-wrap {
  display: inline-flex;
  transform: scale(0.86);
}
</style>
