<template>
  <view class="u-demo">
    <view class="u-demo-wrap">
      <view class="u-demo-title">演示效果</view>
      <view class="u-demo-area">
        <u-toast ref="uToast"></u-toast>
        <view class="pre-box" v-if="!showUploadList">
          <view class="pre-item" v-for="(item, index) in lists" :key="index">
            <image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
            <view class="u-delete-icon" @tap.stop="deleteItem(index)">
              <u-icon name="close" size="20" color="#ffffff"></u-icon>
            </view>
            <u-line-progress
              v-if="item.progress > 0 && !item.error"
              :show-percent="false"
              height="16"
              class="u-progress"
              :percent="item.progress"
            ></u-line-progress>
          </view>
        </view>
        <u-upload
          @on-choose-fail="onChooseFail"
          :before-remove="beforeRemove"
          ref="uUpload"
          :custom-btn="customBtn"
          :show-upload-list="showUploadList"
          :action="action"
          :auto-upload="autoUpload"
          :file-list="fileList"
          :show-progress="showProgress"
          :deletable="deletable"
          :max-count="maxCount"
          @on-list-change="onListChange"
        >
          <view
            v-if="customBtn"
            slot="addBtn"
            class="slot-btn"
            hover-class="slot-btn__hover"
            hover-stay-time="150"
          >
            <u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
          </view>
        </u-upload>
        <u-button :custom-style="{ 'margin-top': '20rpx' }" @click="upload">上传</u-button>
        <u-button :custom-style="{ 'margin-top': '40rpx' }" @click="clear">清空列表</u-button>
        <!-- <u-button :custom-style="{marginTop: '40rpx'}" @click="reUpload">重新上传</u-button> -->
      </view>
    </view>
    <view class="u-config-wrap">
      <view class="u-config-title u-border-bottom"> 参数配置 </view>
      <view class="u-config-item">
        <view class="u-item-title">上传方式</view>
        <u-subsection
          current="1"
          :list="['自动上传', '手动上传']"
          @change="autoUploadChange"
        ></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义控件(进度条和删除按钮)</view>
        <u-subsection :list="['显示', '隐藏']" @change="controlChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">最大上传数量</view>
        <u-subsection current="1" :list="['1', '2', '4']" @change="maxCountChange"></u-subsection>
      </view>
      <view class="u-config-item">
        <view class="u-item-title">自定义样式(预览区域和上传按钮)</view>
        <u-subsection current="1" :list="['是', '否']" @change="customStyleChange"></u-subsection>
      </view>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
let instanceProxy: any;

export default defineComponent({
  name: "ComponentsUpload",

  setup() {
    let state = reactive({
      action: "http://127.0.0.1:7001/upload",
      // 预置上传列表
      fileList: [],
      // fileList: [{
      // 	url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
      // 	error: false,
      // 	progress: 100
      // }],
      showUploadList: true,
      customBtn: false,
      autoUpload: false,
      showProgress: true,
      deletable: true,
      customStyle: false,
      maxCount: 2,
      lists: [], // 组件内部的文件列表
    });

    function reUpload() {
      instanceProxy.$refs.uUpload.reUpload();
    }

    function clear() {
      instanceProxy.$refs.uUpload.clear();
    }

    function autoUploadChange(index) {
      state.autoUpload = index == 0 ? true : false;
    }

    function controlChange(index) {
      if (index == 0) {
        state.showProgress = true;
        state.deletable = true;
      } else {
        state.showProgress = false;
        state.deletable = false;
      }
    }

    function maxCountChange(index) {
      state.maxCount = index == 0 ? 1 : index == 1 ? 2 : 4;
    }

    function customStyleChange(index) {
      if (index == 0) {
        state.showUploadList = false;
        state.customBtn = true;
      } else {
        state.showUploadList = true;
        state.customBtn = false;
      }
    }

    function upload() {
      instanceProxy.$refs.uUpload.upload();
    }

    function deleteItem(index) {
      instanceProxy.$refs.uUpload.remove(index);
    }

    function onOversize(file, lists) {
      // console.log('onOversize', file, lists);
    }

    function onPreview(url, lists) {
      // console.log('onPreview', url, lists);
    }

    function onRemove(index, lists) {
      // console.log('onRemove', index, lists);
    }

    function onSuccess(data, index, lists) {
      // console.log('onSuccess', data, index, lists);
    }

    function onChange(res, index, lists) {
      // console.log('onChange', res, index, lists);
    }

    function error(res, index, lists) {
      // console.log('onError', res, index, lists);
    }

    function onProgress(res, index, lists) {
      // console.log('onProgress', res, index, lists);
    }

    function onUploaded(lists) {
      // console.log('onUploaded', lists);
    }

    function onListChange(lists) {
      // console.log('onListChange', lists);
      state.lists = lists;
    }

    function beforeRemove(index, lists) {
      return true;
    }

    function onChooseFail(e) {
      // console.log(e);
    }

    return {
      ...toRefs(state),
      reUpload,
      clear,
      autoUploadChange,
      controlChange,
      maxCountChange,
      customStyleChange,
      upload,
      deleteItem,
      onOversize,
      onPreview,
      onRemove,
      onSuccess,
      onChange,
      error,
      onProgress,
      onUploaded,
      onListChange,
      beforeRemove,
      onChooseFail,
    };
  },

  mounted() {
    instanceProxy = this;
  },
});
</script>

<style scoped lang="scss">
.u-demo-wrap {
  padding: 40rpx 8rpx;
  margin-right: -14rpx;
  margin-left: -14rpx;
  background-color: #fff;
}

.u-add-wrap {
  flex-direction: column;
  font-size: 28rpx;
  color: $u-content-color;
}

/deep/ .slot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 329rpx;
  height: 140rpx;
  background: rgb(244, 245, 246);
  border-radius: 10rpx;
}

.slot-btn__hover {
  background-color: rgb(235, 236, 238);
}

.pre-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.pre-item {
  position: relative;
  flex: 0 0 48.5%;
  height: 140rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  border-radius: 10rpx;
}

.u-progress {
  position: absolute;
  right: 8rpx;
  bottom: 10rpx;
  left: 8rpx;
  z-index: 9;
  width: auto;
}

.pre-item-image {
  width: 100%;
  height: 140rpx;
}

.u-delete-icon {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44rpx;
  height: 44rpx;
  background-color: $u-type-error;
  border-radius: 100rpx;
}
</style>
