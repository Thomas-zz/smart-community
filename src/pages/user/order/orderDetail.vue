<template>
  <view class="content">
    <van-skeleton title avatar avatar-size="64px" row="3" avatar-shape="square" :loading="!shopDetail.list">
      <view class="head">
        <view class="shop-name">{{ shopDetail.list?.shopName }}</view>
        <view class="commodity-list">
          <view v-for="item of shopDetail.list?.commodityList" :key="item.commodityId">
            <van-card :price="item.price" :thumb="item.url" :num="item.count" thumb-mode="aspectFill">
              <view slot="title" class="title">
                <text>{{ item.name }}</text>
              </view>
            </van-card>
          </view>
        </view>
        <view class="total-price">实付款：¥{{ shopDetail.list?.total }}</view>
      </view>
      <view class="context">
        <view class="order-message">订单信息</view>
        <uni-list>
          <uni-list-item title="订单状态:" :rightText="shopDetail.list?.orderStatus" />
          <uni-list-item title="支付时间:">
            <template v-slot:footer>
              <uni-dateformat
                class="paytime"
                :date="shopDetail.list?.payTime !== null ? shopDetail.list?.payTime : '待支付'"
                format="yyyy/MM/dd"
              ></uni-dateformat>
            </template>
          </uni-list-item>
          <uni-list-item title="预约时间:" :rightText="computedServiceTime()">
            <template v-slot:footer>
              <template v-if="serviceTime.servicetime.length === 0"> 暂未选择预约时间 </template>
              <template v-else>
                <uni-dateformat class="paytime" :date="serviceTime.servicetime[0]" format="yyyy/MM/dd"></uni-dateformat>
                -
                <uni-dateformat class="paytime" :date="serviceTime.servicetime[1]" format="yyyy/MM/dd"></uni-dateformat>
              </template>
            </template>
          </uni-list-item>
          <view v-if="shopDetail.list?.orderStatus === '已支付,待商家确认'">
            <view class="time-title">选择预约时间</view>
            <uni-datetime-picker
              v-model="datetimerange.list"
              rangeSeparator="至"
              :start="nowDate"
              :border="false"
              return-type="timestamp"
              type="datetimerange"
            />
          </view>
        </uni-list>
      </view>
      <view class="btn-content">
        <button v-if="shopDetail.list?.orderStatus === '已支付,待商家确认'" class="btn" @click="chooseTime()">
          {{ serviceTime.servicetime.length === 0 ? '确认预约时间' : '修改预约时间' }}
        </button>
        <button
          v-if="shopDetail.list?.orderStatus === '已支付,待商家确认' || shopDetail.list?.orderStatus === '待支付'"
          class="btn"
          @click="cancelOrder()"
        >
          取消订单
        </button>
        <button v-if="shopDetail.list?.orderStatus === '待支付'" class="btn" @click="goPay()">去支付</button>
        <button
          v-if="shopDetail.list?.orderStatus === '商家已确认' && serviceTime.servicetime.length !== 0"
          class="btn"
          @click="confirmOrder()"
        >
          订单完成
        </button>
      </view>
    </van-skeleton>
  </view>
</template>

<script setup lang="ts">
import ShoppingApi from '@/request/api/shopping'
import { onLoad } from '@dcloudio/uni-app'
import { computed, reactive } from 'vue'

interface IshopDetail {
  list: {
    commodityList: {
      commodityId: number
      count: number
      name: string
      price: number
      url: string
    }[]
    orderStatus: string
    payTime: string
    shopId: number
    shopName: string
    shoppingOrderId: number
    total: number
  } | null
}

const datetimerange = reactive({ list: [] })
const shopDetail: IshopDetail = reactive({ list: null })
const nowDate = Date.now()
const serviceTime: { servicetime: string[] } = reactive({ servicetime: [] })

onLoad((option) => {
  let orderId = Number(option.orderId)
  getServiceTime(orderId)
  getOrderDetail(orderId)
})

function computedServiceTime() {
  if (serviceTime.servicetime.length === 0) return '暂未选择预约时间'
  else {
    return serviceTime.servicetime[0] + '-' + serviceTime.servicetime[1]
  }
}

function getServiceTime(orderId: number) {
  ShoppingApi.findServiceTime(orderId).then((res) => {
    console.log(res)
    if (res.code === 200) {
      serviceTime.servicetime[0] = res.data.beginServiceTime
      serviceTime.servicetime[1] = res.data.endServiceTime
    } else {
      uni.showToast({
        title: res.msg || '预约时间获取失败',
        icon: 'none',
      })
    }
  })
}

function getOrderDetail(orderId: number) {
  ShoppingApi.shoppingDetail(orderId).then((res) => {
    console.log(res)
    if (res.code === 200) {
      shopDetail.list = res.data
    } else {
      uni.showToast({
        title: res.msg || '订单详情获取失败',
        icon: 'none',
      })
    }
  })
}

function chooseTime() {
  console.log(datetimerange.list)
  ShoppingApi.choseServiceTime(shopDetail.list?.shoppingOrderId!, datetimerange.list[0], datetimerange.list[1]).then(
    (res) => {
      console.log(res)
      if (res.code === 200) {
        getServiceTime(shopDetail.list?.shoppingOrderId!)
        uni.showToast({
          title: '预约成功！',
          icon: 'none',
        })
      } else {
        uni.showToast({
          title: res.msg || '预约时间失败',
          icon: 'none',
        })
      }
    }
  )
}

function cancelOrder() {
  ShoppingApi.cancelOrder(shopDetail.list?.shoppingOrderId!).then((res) => {
    console.log(res)
    if (res.code === 200) {
      uni.showToast({
        title: '订单取消成功！',
        icon: 'none',
      })
      shopDetail.list!.orderStatus = '已取消'
    } else {
      uni.showToast({
        title: res.msg || '操作失败',
        icon: 'none',
      })
    }
  })
}

function confirmOrder() {
  ShoppingApi.confirmOrder(shopDetail.list?.shoppingOrderId!).then((res) => {
    console.log(res)
    if (res.code === 200) {
      uni.showToast({
        title: '订单确认完成！',
        icon: 'none',
      })
      shopDetail.list!.orderStatus = '已完成'
    } else {
      uni.showToast({
        title: res.msg || '操作失败',
        icon: 'none',
      })
    }
  })
}

function goPay() {
  const rest =
    'orderId=' +
    shopDetail.list?.shoppingOrderId +
    '&shopName=' +
    shopDetail.list?.shopName +
    '&price=' +
    shopDetail.list?.total +
    '&name=' +
    shopDetail.list?.commodityList[0].name +
    '&imgUrl=' +
    shopDetail.list?.commodityList[0].url
  uni.navigateTo({
    url: '/pages/shop/order/placeOrder?' + rest,
  })
}
</script>
<style scoped lang="scss">
.content {
  min-height: 100vh;
  background-color: #f4f4f4;
  .head {
    padding: 20rpx 0;
    background: #fafafa;
  }
  .shop-name {
    // font-size: 40rpx;
    font-weight: 500;
  }
}

.paytime {
  font-size: 28rpx;
  color: #999999;
}

.shop-name,
.total-price,
.order-message,
.time-title {
  margin-left: 30rpx;
}

.context {
  margin-top: 30rpx;
  margin-bottom: 20rpx;
  background: #fafafa;
  .order-message {
    // font-size: 40rpx;
    font-weight: 500;
    padding: 2 rpx;
  }
}

.btn-content {
  margin: 0 30rpx;
  .btn {
    width: 70%;
    height: 30px;
    margin-bottom: 20rpx;
    line-height: 30px;
    font-size: 30rpx;
    padding: 0;
    border: 1px solid #dd5347;
    color: #dd5347;
    border-radius: 20rpx;
  }
}
</style>
