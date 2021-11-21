<template>
  <view class="u-select">
    <u-popup
      :maskCloseAble="maskCloseAble"
      mode="bottom"
      :popup="false"
      v-model="value"
      length="auto"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      @close="close"
      :z-index="uZIndex"
    >
      <view class="u-select">
        <view class="u-select__header" @touchmove.stop.prevent="">
          <view
            class="u-select__header__cancel u-select__header__btn"
            :style="{ color: cancelColor }"
            hover-class="u-hover-class"
            :hover-stay-time="150"
            @tap="getResult('cancel')"
          >
            {{ cancelText }}
          </view>
          <view class="u-select__header__title">
            {{ title }}
          </view>
          <view
            class="u-select__header__confirm u-select__header__btn"
            :style="{ color: moving ? cancelColor : confirmColor }"
            hover-class="u-hover-class"
            :hover-stay-time="150"
            @touchmove.stop=""
            @tap.stop="getResult('confirm')"
          >
            {{ confirmText }}
          </view>
        </view>
        <view class="u-select__body">
          <picker-view
            @change="columnChange"
            class="u-select__body__picker-view"
            :value="defaultSelector"
            @pickstart="pickstart"
            @pickend="pickend"
          >
            <picker-view-column v-for="(item, index) in columnData" :key="index">
              <view
                class="u-select__body__picker-view__item"
                v-for="(item1, index1) in item"
                :key="index1"
              >
                <view class="u-line-1">{{ item1[labelName] }}</view>
              </view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script lang='ts'>
/**
 * select 列选择器
 * @description 此选择器用于单列，多列，多列联动的选择场景。(从1.3.0版本起，不建议使用Picker组件的单列和多列模式，Select组件是专门为列选择而构造的组件，更简单易用。)
 * @tutorial http://uviewui.com/components/select.html
 * @property {String} mode 模式选择，"single-column"-单列模式，"mutil-column"-多列模式，"mutil-column-auto"-多列联动模式
 * @property {Array} list 列数据，数组形式，见官网说明
 * @property {Boolean} v-model 布尔值变量，用于控制选择器的弹出与收起
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配(默认false)
 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
 * @property {String} confirm-color 确认按钮的颜色(默认#2abc6d)
 * @property {String} confirm-text 确认按钮的文字
 * @property {String} cancel-text 取消按钮的文字
 * @property {String} default-value 提供的默认选中的下标，见官网说明
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker(默认true)
 * @property {String Number} z-index 弹出时的z-index值(默认10075)
 * @property {String} value-name 自定义list数据的value属性名 1.3.6
 * @property {String} label-name 自定义list数据的label属性名 1.3.6
 * @property {String} child-name 自定义list数据的children属性名，只对多列联动模式有效 1.3.7
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @example <u-select v-model="show" :list="list"></u-select>
 */
import { defineComponent, onMounted, reactive, toRefs, watch, computed, Events } from "vue";
import { zIndex } from "../../libs/config/zIndex";
import { deepClone } from "../../libs/function/deepClone";
export default defineComponent({
  name: "u-select",
  props: {
    // 列数据
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true,
    },
    // 通过双向绑定控制组件的弹出与收起
    value: {
      type: Boolean,
      default: false,
    },
    // "取消"按钮的颜色
    cancelColor: {
      type: String,
      default: "#606266",
    },
    // "确定"按钮的颜色
    confirmColor: {
      type: String,
      default: "#2abc6d",
    },
    // 弹出的z-index值
    zIndex: {
      type: [String, Number],
      default: 0,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false,
    },
    // 是否允许通过点击遮罩关闭Picker
    maskCloseAble: {
      type: Boolean,
      default: true,
    },
    // 提供的默认选中的下标
    defaultValue: {
      type: Array,
      default() {
        return [0];
      },
    },
    // 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动
    mode: {
      type: String,
      default: "single-column",
    },
    // 自定义value属性名
    valueName: {
      type: String,
      default: "value",
    },
    // 自定义label属性名
    labelName: {
      type: String,
      default: "label",
    },
    // 自定义多列联动模式的children属性名
    childName: {
      type: String,
      default: "children",
    },
    // 顶部标题
    title: {
      type: String,
      default: "",
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: "取消",
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: "确认",
    },
  },
  components: {},

  emits: ["input", "click", "confirm", "cancel"],
  setup(props: any, { emit }) {
    let state = reactive({
      // 用于列改变时，保存当前的索引，下一次变化时比较得出是哪一列发生了变化
      defaultSelector: [0],
      // picker-view的数据
      columnData: [],
      // 每次队列发生变化时，保存选择的结果
      selectValue: [],
      // 上一次列变化时的index
      lastSelectIndex: [0],
      // 列数
      columnNum: 0,
      // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
      moving: false,
    });
    watch(
      // 在select弹起的时候，重新初始化所有数据
      () => props.value,
      (Val) => {
        if (Val) setTimeout(() => init(), 10);
      }
    );

    onMounted(() => {});
    const uZIndex: any = computed(() => {
      // 如果用户有传递z-index值，优先使用
      return props.zIndex ? props.zIndex : zIndex.popup;
    });
    // 标识滑动开始，只有微信小程序才有这样的事件
    function pickstart() {
      // #ifdef MP-WEIXIN
      state.moving = true;
      // #endif
    }
    // 标识滑动结束
    function pickend() {
      // #ifdef MP-WEIXIN
      state.moving = false;
      // #endif
    }
    function init() {
      setColumnNum();
      setDefaultSelector();
      setColumnData();
      setSelectValue();
    }
    // 获取默认选中列下标
    function setDefaultSelector() {
      // 如果没有传入默认选中的值，生成长度为columnNum，用0填充的数组
      state.defaultSelector =
        props.defaultValue.length == state.columnNum
          ? props.defaultValue
          : Array(state.columnNum).fill(0);
      state.lastSelectIndex = deepClone(state.defaultSelector);
    }
    // 计算列数
    function setColumnNum() {
      // 单列的列数为1
      if (props.mode == "single-column") state.columnNum = 1;
      // 多列时，this.list数组长度就是列数
      else if (props.mode == "mutil-column") state.columnNum = props.list.length;
      // 多列联动时，通过历遍this.list的第一个元素，得出有多少列
      else if (props.mode == "mutil-column-auto") {
        let num = 1;
        let column = props.list;
        // 只要有元素并且第一个元素有children属性，继续历遍
        while (column[0][props.childName]) {
          column = column[0] ? column[0][props.childName] : {};
          num++;
        }
        state.columnNum = num;
      }
    }
    // 获取需要展示在picker中的列数据
    function setColumnData() {
      let data: any = [];
      state.selectValue = [];
      if (props.mode == "mutil-column-auto") {
        // 获得所有数据中的第一个元素
        let column = props.list[state.defaultSelector.length ? state.defaultSelector[0] : 0];
        // 通过循环所有的列数，再根据设定列的数组，得出当前需要渲染的整个列数组
        for (let i = 0; i < state.columnNum; i++) {
          // 第一列默认为整个list数组
          if (i == 0) {
            data[i] = props.list;
            column = column[props.childName];
          } else {
            // 大于第一列时，判断是否有默认选中的，如果没有就用该列的第一项
            data[i] = column;
            column = column[state.defaultSelector[i]][props.childName];
          }
        }
      } else if (props.mode == "single-column") {
        data[0] = props.list;
      } else {
        data = props.list;
      }
      state.columnData = data;
    }
    // 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个
    function setSelectValue() {
      let tmp: any = null;
      const tmpArray: any = [];
      for (let i = 0; i < state.columnNum; i++) {
        tmp = state.columnData[i][state.defaultSelector[i]];
        let data: any = {
          value: tmp ? tmp[props.valueName] : null,
          label: tmp ? tmp[props.labelName] : null,
        };
        // 判断是否存在额外的参数，如果存在，就返回
        if (tmp && tmp.extra) data.extra = tmp.extra;
        tmpArray.push(data);
        state.selectValue = tmpArray;
        // state.selectValue.push(data);
      }
    }
    // 列选项
    function columnChange(e) {
      let index: any = null;
      let columnIndex = e.detail.value;
      // 由于后面是需要push进数组的，所以需要先清空数组
      state.selectValue = [];
      const tmpArray: any = [];
      if (props.mode == "mutil-column-auto") {
        // 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
        state.lastSelectIndex.map((val, idx) => {
          if (val != columnIndex[idx]) index = idx;
        });
        state.defaultSelector = columnIndex;
        for (let i = index + 1; i < state.columnNum; i++) {
          // 当前变化列的下一列的数据，需要获取上一列的数据，同时需要指定是上一列的第几个的children，再往后的
          // 默认是队列的第一个为默认选项
          state.columnData[i] =
            state.columnData[i - 1][i - 1 == index ? columnIndex[index] : 0][props.childName];
          // 改变的列之后的所有列，默认选中第一个
          state.defaultSelector[i] = 0;
        }
        // 在历遍的过程中，可能由于上一步修改this.columnData，导致产生连锁反应，程序触发columnChange，会有多次调用
        // 只有在最后一次数据稳定后的结果是正确的，此前的历遍中，可能会产生undefined，故需要判断

        columnIndex.map((item, index) => {
          let data: any = state.columnData[index][columnIndex[index]];
          let tmp: any = {
            value: data ? data[props.valueName] : null,
            label: data ? data[props.labelName] : null,
          };
          // 判断是否有需要额外携带的参数
          if (data && data.extra !== undefined) tmp.extra = data.extra;
          tmpArray.push(tmp);
          state.selectValue = tmpArray;
          // state.selectValue.push(tmp);
        });
        // 保存这一次的结果，用于下次列发生变化时作比较
        state.lastSelectIndex = columnIndex;
      } else if (props.mode == "single-column") {
        let data: any = state.columnData[0][columnIndex[0]];
        // 初始默认选中值
        let tmp: any = {
          value: data ? data[props.valueName] : null,
          label: data ? data[props.labelName] : null,
        };
        // 判断是否有需要额外携带的参数
        if (data && data.extra !== undefined) tmp.extra = data.extra;
        tmpArray.push(tmp);
        state.selectValue = tmpArray;
        // state.selectValue.push(tmp);
      } else if (props.mode == "mutil-column") {
        // 初始默认选中值
        columnIndex.map((item, index) => {
          let data: any = state.columnData[index][columnIndex[index]];
          // 初始默认选中值
          let tmp: any = {
            value: data ? data[props.valueName] : null,
            label: data ? data[props.labelName] : null,
          };
          // 判断是否有需要额外携带的参数
          if (data && data.extra !== undefined) tmp.extra = data.extra;
          tmpArray.push(tmp);
          state.selectValue = tmpArray;
          // state.selectValue.push(tmp);
        });
      }
    }
    function close() {
      emit("input", false);
    }
    // 点击确定或者取消
    function getResult(event = null) {
      // #ifdef MP-WEIXIN
      if (state.moving) return;
      // #endif
      console.log("event:", event);
      if (event == "confirm") emit("confirm", state.selectValue);
      if (event == "cancel") emit("cancel", state.selectValue);
      close();
    }
    function selectHandler() {
      emit("click");
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      uZIndex,
      init,
      pickend,
      pickstart,
      selectHandler,
      setDefaultSelector,
      setColumnNum,
      setColumnData,
      setSelectValue,
      columnChange,
      close,
      getResult,
    };
  },
});
</script>


<style scoped lang="scss">
@import "../../libs/css/style.components.scss";

.u-select {
  &__action {
    position: relative;
    height: $u-form-item-height;
    line-height: $u-form-item-height;

    &__icon {
      position: absolute;
      top: 50%;
      right: 20rpx;
      z-index: 1;
      transition: transform 0.4s;
      transform: translateY(-50%);

      &--reverse {
        transform: rotate(-180deg) translateY(50%);
      }
    }
  }

  &__hader {
    &__title {
      color: $u-content-color;
    }
  }

  &--border {
    border: 1px solid $u-form-item-border-color;
    border-radius: 6rpx;
    border-radius: 4px;
  }

  &__header {
    @include vue-flex;

    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    padding: 0 40rpx;
  }

  &__body {
    width: 100%;
    height: 500rpx;
    overflow: hidden;
    background-color: #fff;

    &__picker-view {
      box-sizing: border-box;
      height: 100%;

      &__item {
        @include vue-flex;

        align-items: center;
        justify-content: center;
        padding: 0 8rpx;
        font-size: 32rpx;
        color: $u-main-color;
      }
    }
  }
}
</style>
