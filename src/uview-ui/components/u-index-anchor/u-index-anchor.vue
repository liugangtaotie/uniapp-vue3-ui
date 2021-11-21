<template>
  <!-- 支付宝小程序使用$u.getRect()获取组件的根元素尺寸，所以在外面套一个"壳" -->
  <view>
    <view class="u-index-anchor-wrapper" :id="$u.guid()">
      <view
        class="u-index-anchor"
        :class="[active ? 'u-index-anchor--active' : '']"
        :style="customAnchorStyle"
      >
        <slot v-if="useSlot" />
        <block v-else>
          <text>{{ index }}</text>
        </block>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
/**
 * indexAnchor 索引列表锚点
 * @description 通过折叠面板收纳内容区域,搭配<u-index-anchor>使用
 * @tutorial https://www.uviewui.com/components/indexList.html#indexanchor-props
 * @property {Boolean} use-slot 是否使用自定义内容的插槽（默认false）
 * @property {String Number} index 索引字符，如果定义了use-slot，此参数自动失效
 * @property {Object} custStyle 自定义样式，对象形式，如"{color: 'red'}"
 * @event {Function} default 锚点位置显示内容，默认为索引字符
 * @example <u-index-anchor :index="item" />
 */
import { defineComponent, computed, reactive, toRefs, ref } from "vue";
import { styleObjToString } from "../../libs/function/styleObjToString";
import { $parent } from "../../libs/function/$parent";

export default defineComponent({
  name: "u-index-anchor",

  props: {
    useSlot: {
      type: Boolean,
      default: false,
    },
    index: {
      type: String,
      default: "",
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props: any) {
    let state = reactive({
      active: false,
      wrapperStyle: {},
      anchorStyle: {},
    });

    let parent: any = false;

    const customAnchorStyle = computed(() => {
      return styleObjToString(Object.assign(state.anchorStyle, props.customStyle));
    });

    return {
      parent,
      ...toRefs(state),
      ...toRefs(props),
      customAnchorStyle,
    };
  },

  mounted() {
    this.parent = $parent.call(this, "u-index-list");
    if (this.parent) {
      this.parent.children && this.parent.children.push(this);
      this.parent.updateData();
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-index-anchor {
  box-sizing: border-box;
  width: 100%;
  padding: 14rpx 24rpx;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.2;
  color: #606266;
  background-color: rgb(245, 245, 245);
}

.u-index-anchor--active {
  right: 0;
  left: 0;
  color: #2abc6d;
  background-color: #fff;
}
</style>
