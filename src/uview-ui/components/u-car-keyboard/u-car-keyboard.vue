<template>
  <view class="u-keyboard" @touchmove.stop.prevent="() => {}">
    <view class="u-keyboard-grids">
      <block>
        <view
          class="u-keyboard-grids-item"
          v-for="(group, i) in abc ? EngKeyBoardList : areaList"
          :key="i"
        >
          <view
            :hover-stay-time="100"
            @tap="carInputClick(i, j)"
            hover-class="u-carinput-hover"
            class="u-keyboard-grids-btn"
            v-for="(item, j) in group"
            :key="j"
          >
            {{ item }}
          </view>
        </view>
        <view
          @touchstart="backspaceClick"
          @touchend="clearTimer"
          :hover-stay-time="100"
          class="u-keyboard-back"
          hover-class="u-hover-class"
        >
          <u-icon :size="38" name="backspace" :bold="true"></u-icon>
        </view>
        <view
          :hover-stay-time="100"
          class="u-keyboard-change"
          hover-class="u-carinput-hover"
          @tap="changeCarInputMode"
        >
          <text class="zh" :class="[!abc ? 'active' : 'inactive']">中</text>
          /
          <text class="en" :class="[abc ? 'active' : 'inactive']">英</text>
        </view>
      </block>
    </view>
  </view>
</template>
<script lang='ts'>
import { defineComponent, reactive, toRefs, computed } from "vue";
import { randomArray } from "../../libs/function/randomArray";

export default defineComponent({
  name: "u-car-keyboard",

  props: {
    // 是否打乱键盘按键的顺序
    random: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["change", "backspace"],

  setup(props: any, { emit }) {
    let state: any = reactive({
      // 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
      abc: false,
      timer: null, // 长按多次删除的事件监听
    });

    const areaList = computed(() => {
      let data = [
        "京",
        "沪",
        "粤",
        "津",
        "冀",
        "豫",
        "云",
        "辽",
        "黑",
        "湘",
        "皖",
        "鲁",
        "苏",
        "浙",
        "赣",
        "鄂",
        "桂",
        "甘",
        "晋",
        "陕",
        "蒙",
        "吉",
        "闽",
        "贵",
        "渝",
        "川",
        "青",
        "琼",
        "宁",
        "挂",
        "藏",
        "港",
        "澳",
        "新",
        "使",
        "学",
      ];
      let tmp: any = [];
      // 打乱顺序
      if (props.random) data = randomArray(data);
      // 切割成二维数组
      tmp[0] = data.slice(0, 10);
      tmp[1] = data.slice(10, 20);
      tmp[2] = data.slice(20, 30);
      tmp[3] = data.slice(30, 36);
      return tmp;
    });

    const EngKeyBoardList = computed(() => {
      let data = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
      ];
      let tmp: any = [];
      if (props.random) data = randomArray(data);
      tmp[0] = data.slice(0, 10);
      tmp[1] = data.slice(10, 20);
      tmp[2] = data.slice(20, 30);
      tmp[3] = data.slice(30, 36);
      return tmp;
    });

    // 点击键盘按钮
    function carInputClick(i, j) {
      let value = "";

      // 不同模式，获取不同数组的值
      let tempArray: any = [];
      if (state.abc) {
        tempArray = EngKeyBoardList.value[i];
        value = tempArray[j];
      } else {
        tempArray = areaList.value[i];
        value = tempArray[j];
      }
      emit("change", value);
    }

    // 修改汽车牌键盘的输入模式，中文|英文
    function changeCarInputMode() {
      state.abc = !state.abc;
    }

    // 点击退格键
    function backspaceClick() {
      emit("backspace");
      clearInterval(state.timer); //再次清空定时器，防止重复注册定时器
      state.timer = null;
      state.timer = setInterval(() => {
        emit("backspace");
      }, 250);
    }

    function clearTimer() {
      clearInterval(state.timer);
      state.timer = null;
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      areaList,
      EngKeyBoardList,
      carInputClick,
      changeCarInputMode,
      backspaceClick,
      clearTimer,
    };
  },
});
</script>


<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-keyboard-grids {
  position: relative;
  padding: 24rpx 0;
  background: rgb(215, 215, 217);
}

.u-keyboard-grids-item {
  @include vue-flex;

  align-items: center;
  justify-content: center;
}

.u-keyboard-grids-btn {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  flex: 0 0 64rpx;
  justify-content: center;
  width: 62rpx;
  height: 80rpx;
  margin: 8rpx 5rpx;

  /* #endif */
  font-size: 36rpx;
  font-weight: 500;
  line-height: 80rpx;
  text-align: center;
  text-decoration: none;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 0rpx #888992;
}

.u-carinput-hover {
  background-color: rgb(185, 188, 195) !important;
}

.u-keyboard-back {
  position: absolute;
  right: 22rpx;
  bottom: 32rpx;
  align-items: center;
  justify-content: center;
  width: 96rpx;
  height: 80rpx;
  background-color: rgb(185, 188, 195);
  border-radius: 8rpx;
  box-shadow: 0 2rpx 0rpx #888992;
  @include vue-flex;
}

.u-keyboard-change {
  position: absolute;
  bottom: 32rpx;
  left: 22rpx;
  align-items: center;
  justify-content: center;
  width: 96rpx;
  height: 80rpx;
  font-size: 24rpx;
  line-height: 1;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 0rpx #888992;
  @include vue-flex;
}

.u-keyboard-change .inactive.zh {
  transform: scale(0.85) translateY(-10rpx);
}

.u-keyboard-change .inactive.en {
  transform: scale(0.85) translateY(10rpx);
}

.u-keyboard-change .active {
  font-size: 30rpx;
  color: rgb(237, 112, 64);
}

.u-keyboard-change .zh {
  transform: translateY(-10rpx);
}

.u-keyboard-change .en {
  transform: translateY(10rpx);
}
</style>
