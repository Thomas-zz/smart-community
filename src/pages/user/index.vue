<template>
  <view class="content">
    <view class="head">
      <img
        class="headImg"
        src="https://i2.hdslb.com/bfs/face/85a34b1d1b7b892cfa4d39f67f1209675a31ea91.jpg@150w_150h.jpg"
      />
      <text class="username">{{ username }}</text>
    </view>
    <view class="myOrder">
      <view class="title">
        <text class="title-1">我的订单</text>
        <text class="title-2" @click="jumpToOrderList()">查看全部 ></text>
      </view>
      <uni-grid :column="4" :showBorder="false" @change="orderTo">
        <uni-grid-item v-for="item in mainModules" :index="item.id" :key="item.id">
          <view class="grid-item-box">
            <uni-icons custom-prefix="iconfont" :type="item.iconSrc" :size="22" color="#dd5347" />
            <text class="text">{{ item.name }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
    <view class="myOrder">
      <uni-grid :column="4" :showBorder="false" @change="serverTo">
        <uni-grid-item v-for="item in serverModules" :index="item.id" :key="item.id">
          <view class="grid-item-box">
            <uni-icons class="icons" custom-prefix="iconfont" :type="item.iconSrc" :size="22" color="#dd5347" />
            <text class="text">{{ item.name }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import store from '@/store/index'

let username = store.state.userMsg.userInfo?.nickName || '半岛铁盒'

// 订单流程
const mainModules = reactive([
  {
    id: 0,
    name: '待付款',
    iconSrc: 'iconfont-daifukuan',
    jumpTo: '/pages/user/order/orderList',
  },
  {
    id: 1,
    name: '待确认',
    iconSrc: 'iconfont-daiqueren',
    jumpTo: '/pages/user/order/orderList',
  },
  {
    id: 2,
    name: '待使用',
    iconSrc: 'iconfont-daishiyong1',
    jumpTo: '/pages/user/order/orderList',
  },
  {
    id: 3,
    name: '已取消',
    iconSrc: 'iconfont-yiquxiao',
    jumpTo: '/pages/user/order/orderList',
  },
])

// 用户服务
const serverModules = reactive([
  {
    id: 0,
    name: '我的投诉',
    iconSrc: 'iconfont-tousu',
    jumpTo: '/pages/user/server/feedback',
  },
  {
    id: 1,
    name: '我的建议',
    iconSrc: 'iconfont-jianyi',
    jumpTo: '/pages/user/server/feedback',
  },
  {
    id: 2,
    name: '我的报修',
    iconSrc: 'iconfont-baoxiu',
    jumpTo: '/pages/user/server/feedback',
  },
  {
    id: 3,
    name: '个人信息',
    iconSrc: 'iconfont-essential-information',
    jumpTo: '/pages/user/server/feedback',
  },
])

function jumpToOrderList() {
  uni.navigateTo({
    url: '/pages/user/order/orderList',
  })
}

function orderTo(e) {
  const { index } = e.detail
  uni.navigateTo({
    url: mainModules[index].jumpTo,
  })
}

function serverTo(e) {
  const { index } = e.detail
  uni.navigateTo({
    url: serverModules[index].jumpTo,
  })
}
</script>
<style scoped lang="scss">
.content {
  background-color: #f4f4f4;
  min-height: 100vh;
}

.head {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 20px;
  padding-left: 30rpx;
  background: #fee1bf;
  border-radius: 0 0 15rpx 15rpx;
  .headImg {
    width: 120rpx;
    height: 120rpx;
    box-sizing: border-box;
    border-radius: 50%;
  }
  .username {
    margin-left: 18rpx;
  }
}

.myOrder {
  margin: 30rpx;
  border-radius: 30rpx;
  background: #ffffff;
  .title {
    padding: 30rpx;
    padding-bottom: 10rpx;
    display: flex;
    justify-content: space-between;
    vertical-align: bottom;
    .title-1 {
      font-size: 40rpx;
      font-weight: 700;
    }
    .title-2 {
      color: #9d9d9d;
      font-size: 30rpx;
    }
  }
}

.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.icons {
  margin-bottom: 10rpx;
}

.text {
  font-size: 31rpx;
}
</style>
