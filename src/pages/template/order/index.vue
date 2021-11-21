<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper
          activeColor="#f29100"
          ref="tabs"
          :list="list"
          :current="current"
          @change="change"
          :is-scroll="false"
          swiperWidth="750"
        ></u-tabs-swiper>
      </view>
      <swiper
        class="swiper-box"
        :current="swiperCurrent"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="width: 100%; height: 100%" @scrolltolower="reachBottom">
            <view class="page-box">
              <view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
                <view class="top">
                  <view class="left">
                    <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                    <view class="store">{{ res.store }}</view>
                    <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                  </view>
                  <view class="right">{{ res.deal }}</view>
                </view>
                <view class="item" v-for="(item, index) in res.goodsList" :key="index">
                  <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                  <view class="content">
                    <view class="title u-line-2">{{ item.title }}</view>
                    <view class="type">{{ item.type }}</view>
                    <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                  </view>
                  <view class="right">
                    <view class="price">
                      ￥{{ priceInt(item.price) }}
                      <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                    </view>
                    <view class="number">x{{ item.number }}</view>
                  </view>
                </view>
                <view class="total">
                  共{{ totalNum(res.goodsList) }}件商品 合计:
                  <text class="total-price">
                    ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                    <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                  </text>
                </view>
                <view class="bottom">
                  <view class="more"
                    ><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon
                  ></view>
                  <view class="logistics btn">查看物流</view>
                  <view class="exchange btn">卖了换钱</view>
                  <view class="evaluate btn">评价</view>
                </view>
              </view>
              <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="width: 100%; height: 100%" @scrolltolower="reachBottom">
            <view class="page-box">
              <view class="order" v-for="(res, index) in orderList[1]" :key="res.id">
                <view class="top">
                  <view class="left">
                    <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                    <view class="store">{{ res.store }}</view>
                    <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                  </view>
                  <view class="right">{{ res.deal }}</view>
                </view>
                <view class="item" v-for="(item, index) in res.goodsList" :key="index">
                  <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                  <view class="content">
                    <view class="title u-line-2">{{ item.title }}</view>
                    <view class="type">{{ item.type }}</view>
                    <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                  </view>
                  <view class="right">
                    <view class="price">
                      ￥{{ priceInt(item.price) }}
                      <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                    </view>
                    <view class="number">x{{ item.number }}</view>
                  </view>
                </view>
                <view class="total">
                  共{{ totalNum(res.goodsList) }}件商品 合计:
                  <text class="total-price">
                    ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                    <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                  </text>
                </view>
                <view class="bottom">
                  <view class="more"
                    ><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon
                  ></view>
                  <view class="logistics btn">查看物流</view>
                  <view class="exchange btn">卖了换钱</view>
                  <view class="evaluate btn">评价</view>
                </view>
              </view>
              <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="width: 100%; height: 100%">
            <view class="page-box">
              <view>
                <view class="centre">
                  <image
                    src="https://cdn.uviewui.com/uview/template/taobao-order.png"
                    mode=""
                  ></image>
                  <view class="explain">
                    您还没有相关的订单
                    <view class="tips">可以去看看有那些想买的</view>
                  </view>
                  <view class="btn">随便逛逛</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="width: 100%; height: 100%" @scrolltolower="reachBottom">
            <view class="page-box">
              <view class="order" v-for="(res, index) in orderList[3]" :key="res.id">
                <view class="top">
                  <view class="left">
                    <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                    <view class="store">{{ res.store }}</view>
                    <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                  </view>
                  <view class="right">{{ res.deal }}</view>
                </view>
                <view class="item" v-for="(item, index) in res.goodsList" :key="index">
                  <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                  <view class="content">
                    <view class="title u-line-2">{{ item.title }}</view>
                    <view class="type">{{ item.type }}</view>
                    <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                  </view>
                  <view class="right">
                    <view class="price">
                      ￥{{ priceInt(item.price) }}
                      <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                    </view>
                    <view class="number">x{{ item.number }}</view>
                  </view>
                </view>
                <view class="total">
                  共{{ totalNum(res.goodsList) }}件商品 合计:
                  <text class="total-price">
                    ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                    <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                  </text>
                </view>
                <view class="bottom">
                  <view class="more"
                    ><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon
                  ></view>
                  <view class="logistics btn">查看物流</view>
                  <view class="exchange btn">卖了换钱</view>
                  <view class="evaluate btn">评价</view>
                </view>
              </view>
              <u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs, onMounted } from "vue";

let instanceProxy: any;

export default defineComponent({
  name: "ComponentsOrder",

  setup() {
    let state = reactive({
      orderList: [[], [], [], []],
      dataList: [
        {
          id: 1,
          store: "夏日流星限定贩卖",
          deal: "交易成功",
          goodsList: [
            {
              goodsUrl:
                "//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg",
              title:
                "【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风",
              type: "灰色;M",
              deliveryTime: "付款后30天内发货",
              price: "348.58",
              number: 2,
            },
            {
              goodsUrl:
                "//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg",
              title:
                "【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款",
              type: "45cm;S",
              deliveryTime: "付款后30天内发货",
              price: "135.00",
              number: 1,
            },
          ],
        },
        {
          id: 2,
          store: "江南皮革厂",
          deal: "交易失败",
          goodsList: [
            {
              goodsUrl:
                "//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg",
              title:
                "【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风",
              type: "粉色;M",
              deliveryTime: "付款后7天内发货",
              price: "128.05",
              number: 1,
            },
          ],
        },
        {
          id: 3,
          store: "三星旗舰店",
          deal: "交易失败",
          goodsList: [
            {
              goodsUrl:
                "//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg",
              title:
                "三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机",
              type: "4K，广色域",
              deliveryTime: "保质5年",
              price: "1998",
              number: 3,
            },
            {
              goodsUrl:
                "//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg",
              title:
                "美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)",
              type: "容量大，速冻",
              deliveryTime: "保质5年",
              price: "2354",
              number: 1,
            },
          ],
        },
        {
          id: 4,
          store: "三星旗舰店",
          deal: "交易失败",
          goodsList: [
            {
              goodsUrl:
                "//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg",
              title: "法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装",
              type: "4K，广色域",
              deliveryTime: "珍藏10年好酒",
              price: "1543",
              number: 3,
            },
            {
              goodsUrl:
                "//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg",
              title: "蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装",
              type: "一打",
              deliveryTime: "口感好",
              price: "120",
              number: 1,
            },
          ],
        },
        {
          id: 5,
          store: "三星旗舰店",
          deal: "交易成功",
          goodsList: [
            {
              goodsUrl:
                "//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg",
              title: "企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108",
              type: "识别效率高",
              deliveryTime: "使用方便",
              price: "451",
              number: 9,
            },
          ],
        },
      ],
      list: [
        {
          name: "待付款",
        },
        {
          name: "待发货",
        },
        {
          name: "待收货",
        },
        {
          name: "待评价",
          count: 12,
        },
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
      loadStatus: ["loadmore", "loadmore", "loadmore", "loadmore"],
    });

    // 价格小数
    const priceDecimal = computed(() => {
      return (val) => {
        if (val !== parseInt(val)) return val.slice(-2);
        else return "00";
      };
    });

    // 价格整数
    const priceInt = computed(() => {
      return (val) => {
        if (val !== parseInt(val)) return val.split(".")[0];
        else return val;
      };
    });

    function reachBottom() {
      // 此tab为空数据
      if (state.current != 2) {
        state.loadStatus.splice(state.current, 1, "loading");
        setTimeout(() => {
          getOrderList(state.current);
        }, 1200);
      }
    }
    // 页面数据
    function getOrderList(idx) {
      for (let i = 0; i < 5; i++) {
        let index = instanceProxy.$u.random(0, state.dataList.length - 1);
        let data = JSON.parse(JSON.stringify(state.dataList[index]));
        data.id = instanceProxy.$u.guid();
        state.orderList[idx].push(data as never);
      }
      state.loadStatus.splice(state.current, 1, "loadmore");
    }
    // 总价
    function totalPrice(item) {
      let price = 0;
      item.map((val) => {
        price += parseFloat(val.price);
      });
      return price.toFixed(2);
    }
    // 总件数
    function totalNum(item) {
      let num = 0;
      item.map((val) => {
        num += val.number;
      });
      return num;
    }
    // tab栏切换
    function change(index) {
      state.swiperCurrent = index;
      getOrderList(index);
    }
    function transition({ detail: { dx } }) {
      instanceProxy.$refs.tabs.setDx(dx);
    }
    function animationfinish({ detail: { current } }) {
      instanceProxy.$refs.tabs.setFinishCurrent(current);
      state.swiperCurrent = current;
      state.current = current;
    }

    onMounted(() => {});

    return {
      ...toRefs(state),
      priceDecimal,
      priceInt,
      reachBottom,
      getOrderList,
      totalPrice,
      totalNum,
      change,
      transition,
      animationfinish,
    };
  },

  onLoad() {},

  mounted() {
    instanceProxy = this;
    instanceProxy.getOrderList(0);
    instanceProxy.getOrderList(1);
    instanceProxy.getOrderList(3);
  },
});
</script>

<style lang="scss" scoped>
.order {
  box-sizing: border-box;
  width: 710rpx;
  padding: 20rpx;
  margin: 20rpx auto;
  font-size: 28rpx;
  background-color: #fff;
  border-radius: 20rpx;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .store {
        margin: 0 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .right {
      color: $u-type-warning-dark;
    }
  }
  .item {
    display: flex;
    margin: 20rpx 0 0;
    .left {
      margin-right: 20rpx;
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
    }
    .content {
      .title {
        font-size: 28rpx;
        line-height: 50rpx;
      }
      .type {
        margin: 10rpx 0;
        font-size: 24rpx;
        color: $u-tips-color;
      }
      .delivery-time {
        font-size: 24rpx;
        color: #e5d001;
      }
    }
    .right {
      padding-top: 20rpx;
      margin-left: 10rpx;
      text-align: right;
      .decimal {
        margin-top: 4rpx;
        font-size: 24rpx;
      }
      .number {
        font-size: 24rpx;
        color: $u-tips-color;
      }
    }
  }
  .total {
    margin-top: 20rpx;
    font-size: 24rpx;
    text-align: right;
    .total-price {
      font-size: 32rpx;
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx;
    margin-top: 40rpx;
    .btn {
      width: 160rpx;
      font-size: 26rpx;
      line-height: 52rpx;
      color: $u-type-info-dark;
      text-align: center;
      border: 2rpx solid $u-border-color;
      border-radius: 26rpx;
    }
    .evaluate {
      color: $u-type-warning-dark;
      border-color: $u-type-warning-dark;
    }
  }
}
.centre {
  margin: 200rpx auto;
  font-size: 32rpx;
  text-align: center;
  image {
    width: 164rpx;
    height: 164rpx;
    margin-bottom: 20rpx;
    border-radius: 50%;
  }
  .tips {
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #999;
  }
  .btn {
    width: 200rpx;
    margin: 80rpx auto;
    font-size: 26rpx;
    line-height: 64rpx;
    color: #fff;
    background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
    border-radius: 32rpx;
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - var(--window-top));
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}
</style>
