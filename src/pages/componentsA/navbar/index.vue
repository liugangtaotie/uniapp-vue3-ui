<template>
  <view class="">
    <u-navbar
      title-color="#fff"
      back-icon-color="#ffffff"
      :is-fixed="isFixed"
      :is-back="isBack"
      :background="background"
      :back-text-style="{ color: '#fff' }"
      :title="title"
      :back-icon-name="backIconName"
      :back-text="backText"
    >
      <view class="slot-wrap" v-if="useSlot">
        <view class="search-wrap" v-if="search">
          <!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
          <u-search
            v-model="keyword"
            :show-action="showAction"
            height="56"
            :action-style="{ color: '#fff' }"
          ></u-search>
        </view>
        <view class="navbar-right" v-if="rightSlot">
          <view class="message-box right-item">
            <u-icon name="chat" size="38"></u-icon>
            <u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
          </view>
          <view class="dot-box right-item">
            <u-icon name="calendar-fill" size="38"></u-icon>
            <u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
          </view>
        </view>
        <view class="map-wrap" v-if="custom">
          <u-icon name="map" color="#ffffff" size="24"></u-icon>
          <text class="map-wrap-text">轻舟已过万重山</text>
          <u-icon name="arrow-down-fill" color="#ffffff" size="22"></u-icon>
        </view>
      </view>
      <view class="navbar-right" slot="right" v-if="slotRight">
        <view class="message-box right-item">
          <u-icon name="chat" size="38"></u-icon>
          <u-badge count="18" size="mini" :offset="[-15, -15]"></u-badge>
        </view>
        <view class="dot-box right-item">
          <u-icon name="calendar-fill" size="38"></u-icon>
          <u-badge size="mini" :is-dot="true" :offset="[-6, -6]"></u-badge>
        </view>
      </view>
    </u-navbar>
    <view class="u-demo">
      <view class="u-demo-wrap">
        <view class="u-demo-title">演示效果</view>
        <view class="u-demo-area">
          <u-toast ref="uToast"></u-toast>
          <view class="u-no-demo-here">查看顶部导航栏效果</view>
        </view>
      </view>
      <view class="u-config-wrap">
        <view class="u-config-title u-border-bottom"> 参数配置 </view>
        <view class="u-config-item">
          <view class="u-item-title">标题长度</view>
          <u-subsection :list="['短', '中', '长']" @change="titleChange"></u-subsection>
        </view>
        <view class="u-config-item">
          <view class="u-item-title">隐藏左侧返回区域</view>
          <u-subsection current="1" :list="['是', '否']" @change="backChange"></u-subsection>
        </view>
        <view class="u-config-item">
          <view class="u-item-title">自定义左侧内容</view>
          <u-subsection current="1" :list="['是', '否']" @change="leftChange"></u-subsection>
        </view>
        <view class="u-config-item">
          <view class="u-item-title">自定义右侧内容</view>
          <u-subsection
            :current="slotRightCurrent"
            :list="['是', '否']"
            @change="rightChange"
          ></u-subsection>
        </view>
        <view class="u-config-item">
          <view class="u-item-title">传入整体slot</view>
          <u-subsection
            :list="['无', '搜索框', '搜索+按钮', '搜索+图标']"
            @change="searchChange"
          ></u-subsection>
        </view>
        <view class="u-config-item">
          <view class="u-item-title">完全自定义传入内容</view>
          <u-subsection current="1" :list="['是', '否']" @change="customChange"></u-subsection>
        </view>
        <view class="u-config-item">
          <view class="u-item-title">背景色</view>
          <u-subsection
            :list="['渐变', '#39CCCC', '#B471CC', '#001f3f']"
            @change="bgColorChange"
          ></u-subsection>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ComponentsNavbar",

  setup() {
    let state = reactive({
      title: "新闻" as any,
      backText: "返回",
      backIconName: "nav-back",
      right: false,
      showAction: false,
      rightSlot: false,
      useSlot: false,
      background: {
        "background-image": "linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))",
      } as any,
      isBack: true,
      search: false,
      custom: false,
      isFixed: true,
      keyword: "",
      // #ifdef MP
      slotRight: false,
      // #endif
      // #ifndef MP
      // slotRight: true,
      // #endif
    });

    const slotRightCurrent = computed(() => {
      return state.slotRight ? 0 : 1;
    });

    function titleChange(index) {
      state.useSlot = false;
      state.title =
        index == 0 ? "新闻" : index == 1 ? "新闻列表" : "雨打梨花深闭门，忘了青春，误了青春";
    }

    function leftChange(index) {
      if (index == 0) {
        state.backText = "";
        state.backIconName = "arrow-leftward";
      } else {
        state.backText = "返回";
        state.backIconName = "arrow-left";
      }
    }

    function searchChange(index) {
      state.title = null;
      state.useSlot = true;
      state.search = false;
      state.custom = false;
      if (index == 0) {
        state.title = "新闻";
        state.useSlot = false;
        state.rightSlot = false;
      } else if (index == 1) {
        state.showAction = false;
        state.useSlot = true;
        state.rightSlot = false;
        state.search = true;
        state.slotRight = false;
      } else if (index == 2) {
        state.useSlot = true;
        state.showAction = true;
        state.rightSlot = false;
        state.search = true;
        state.slotRight = false;
      } else {
        state.useSlot = true;
        state.search = true;
        state.showAction = false;
        state.rightSlot = true;
        state.slotRight = false;
      }
    }

    function backChange(index) {
      state.isBack = !!index;
    }

    function bgColorChange(index) {
      state.background = {};
      if (index == 0) {
        state.background = {
          "background-image": "linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))",
        };
      } else {
        let color = index == 1 ? "#39CCCC" : index == 2 ? "#B471CC" : "#001f3f";
        state.background = {
          background: color,
        };
      }
    }

    function rightChange(index) {
      if (index == 0) {
        state.slotRight = true;
        state.useSlot = false;
      } else {
        state.slotRight = false;
      }
    }

    function customChange(index) {
      state.search = false;
      state.rightSlot = false;
      if (index == 0) {
        state.custom = true;
        state.title = null;
        state.isBack = false;
        state.useSlot = true;
      } else {
        state.useSlot = false;
        state.title = "新闻";
        state.isBack = true;
      }
    }

    return {
      ...toRefs(state),
      slotRightCurrent,
      titleChange,
      leftChange,
      searchChange,
      backChange,
      bgColorChange,
      rightChange,
      customChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.u-demo {
  //height: 200vh;
  height: calc(100% - 44px);
  height: calc(100% - 44px - constant(safe-area-inset-top));
  height: calc(100% - 44px - env(safe-area-inset-top));
}

.wrap {
  padding: 24rpx;
}

.navbar-right {
  display: flex;
  margin-right: 24rpx;
}

.search-wrap {
  flex: 1;
  margin: 0 20rpx;
}

.right-item {
  position: relative;
  display: flex;
  margin: 0 12rpx;
  color: #fff;
}

.slot-wrap {
  display: flex;
  flex: 1;
  align-items: center;
}

.map-wrap {
  display: flex;
  align-items: center;
  padding: 4px 6px;
  margin-left: 30rpx;
  font-size: 22rpx;
  color: #fff;
  background-color: rgba(240, 240, 240, 0.35);
  border-radius: 100rpx;
}

.map-wrap-text {
  padding: 0 6rpx;
}
</style>

