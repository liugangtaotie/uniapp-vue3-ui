<template>
  <view class="u-demo">
    <view
      class="u-demo-wrap"
      style="padding-right: 0; padding-left: 0; margin-right: -40rpx; margin-left: -40rpx"
    >
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-cell-group title="读万卷书">
          <u-cell-item
            center
            :is-link="true"
            :label="label"
            value="铁马冰河入梦来"
            i
            ndex="index"
            @click="click"
            :hover-class="hoverClass"
            :arrow="arrow"
            :title="title"
            :icon="icon"
          >
            <u-badge
              :absolute="false"
              v-if="rightSlot == 'badge'"
              count="105"
              slot="right-icon"
            ></u-badge>
            <u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
          </u-cell-item>
          <u-cell-item
            :border-bottom="false"
            value=""
            title="铁马冰河入梦来"
            value="行万里路"
            :arrow="false"
          >
            <u-icon slot="icon" size="34" name="calendar" style="margin-right: 5px"></u-icon>
            <u-icon slot="right-icon" size="34" name="calendar"></u-icon>
            <u-field slot="value"></u-field>
          </u-cell-item>
        </u-cell-group>
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">更换图标</view>
        <u-subsection :list="['是', '否']" @change="iconChange"></u-subsection>
      </view>
      <!-- 小程序无法动态切换slot -->
      <!-- #ifndef MP -->
      <view class="u-config-item">
        <view class="u-item-title">自定义右侧内容</view>
        <u-subsection
          :list="['文字', 'Switch组件', 'Badge组件']"
          @change="rightSlotChange"
        ></u-subsection>
      </view>
      <!-- #endif -->
      <view class="u-config-item">
        <view class="u-item-title">描述信息</view>
        <u-subsection current="1" :list="['是', '否']" @change="lableChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">更换标题</view>
        <u-subsection :list="['是', '否']" @change="titleChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">右侧箭头</view>
        <u-subsection :list="['是', '否']" @change="arrowChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed } from "vue";

export default defineComponent({
  name: "CellIndex",

  setup() {
    let state = reactive({
      icon: "setting",
      arrow: true,
      label: "",
      title: "青山一道同云雨",
      rightSlot: "",
      checked: false,
    });

    const hoverClass = computed(() => {
      return state.rightSlot == "switch" ? "none" : "u-cell-hover";
    });

    function iconChange(index) {
      state.icon = index == 0 ? "setting" : "file-text";
    }

    function arrowChange(index) {
      state.arrow = index == 0 ? true : false;
    }

    function lableChange(index) {
      state.label = index == 0 ? "岂曰无衣，与子同裳" : "";
    }

    function titleChange(index) {
      state.title = index == 0 ? "青山一道同云雨" : "明月何曾是两乡";
    }

    function rightSlotChange(index) {
      state.rightSlot = index == 0 ? "text" : index == 1 ? "switch" : "badge";
      if (index == 0) state.arrow = true;
      else state.arrow = false;
    }

    function click(index) {
      // console.log(index);
    }

    return {
      ...toRefs(state),
      iconChange,
      arrowChange,
      lableChange,
      titleChange,
      rightSlotChange,
      click,
    };
  },
});
</script>

<style lang="scss" scoped>
.gab {
  height: 20rpx;
  background-color: rgb(245, 245, 245);
}

.wrap {
  height: 100vh;
  background-color: rgb(241, 241, 241);
}

.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 00rpx;
  font-size: 28rpx;
  color: $u-type-info;
}
</style>
