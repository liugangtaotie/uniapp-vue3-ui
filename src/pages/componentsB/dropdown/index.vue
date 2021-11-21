<template>
  <view class="">
    <view class="u-m-p-50">
      <view class="u-demo-area u-flex u-row-center">
        <u-dropdown
          :close-on-click-mask="mask"
          ref="uDropdown"
          :activeColor="activeColor"
          :borderBottom="borderBottom"
        >
          <u-dropdown-item
            @change="change"
            v-model="value1"
            title="距离"
            :options="options1"
          ></u-dropdown-item>
          <u-dropdown-item
            @change="change"
            v-model="value2"
            title="温度"
            :options="options2"
          ></u-dropdown-item>
          <u-dropdown-item title="属性">
            <view class="slot-content">
              <view class="item-box">
                <view
                  class="item"
                  :class="[item.active ? 'active' : '']"
                  @tap="tagClick(index)"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  {{ item.label }}
                </view>
              </view>
              <u-button type="primary" @click="closeDropdown">确定</u-button>
            </view>
          </u-dropdown-item>
        </u-dropdown>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">下边框</view>
        <u-subsection current="1" :list="['有', '无']" @change="borderChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">激活颜色</view>
        <u-subsection
          :list="['#2979ff', '#ff9900', '#19be6b']"
          @change="activeColorChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">遮罩是否可点击</view>
        <u-subsection :list="['是', '否']" @change="maskChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { toast } from "@UVIEW/libs/function/toast";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsDropdown",

  setup() {
    let state = reactive({
      value1: "",
      value2: "2",
      mask: true,
      options1: [
        {
          label: "默认排序",
          value: 1,
        },
        {
          label: "距离优先",
          value: 2,
        },
        {
          label: "价格优先",
          value: 3,
        },
      ],
      options2: [
        {
          label: "去冰",
          value: 1,
        },
        {
          label: "加冰",
          value: 2,
        },
        {
          label: "正常温",
          value: 3,
        },
        {
          label: "加热",
          value: 4,
        },
        {
          label: "极寒风暴",
          value: 5,
        },
      ],
      list: [
        {
          label: "琪花瑶草",
          active: true,
        },
        {
          label: "清词丽句",
          active: false,
        },
        {
          label: "宛转蛾眉",
          active: false,
        },
        {
          label: "煦色韶光",
          active: false,
        },
        {
          label: "鱼沉雁落",
          active: false,
        },
        {
          label: "章台杨柳",
          active: false,
        },
        {
          label: "霞光万道",
          active: false,
        },
      ],
      borderBottom: false,
      activeColor: "#2979ff",
    });

    function borderChange(index) {
      state.borderBottom = !index;
    }

    function activeColorChange(index) {
      state.activeColor = ["#2979ff", "#ff9900", "#19be6b"][index];
    }

    function change(index) {
      toast(`点击了第${index}项`);
    }

    function closeDropdown() {
      instanceProxy.$refs.uDropdown.close();
    }

    function tagClick(index) {
      state.list[index].active = !state.list[index].active;
    }

    function maskChange(index) {
      state.mask = !index;
    }

    return {
      ...toRefs(state),
      borderChange,
      activeColorChange,
      change,
      closeDropdown,
      tagClick,
      maskChange,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style scoped lang="scss">
.u-config-wrap {
  padding: 40rpx;
}

.slot-content {
  padding: 24rpx;
  background-color: #fff;

  .item-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50rpx;

    .item {
      padding: 8rpx 40rpx;
      margin-top: 30rpx;
      color: $u-type-primary;
      border: 1px solid $u-type-primary;
      border-radius: 100rpx;
    }

    .active {
      color: #fff;
      background-color: $u-type-primary;
    }
  }
}
</style>
