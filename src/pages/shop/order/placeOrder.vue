<template>
  <view>
    <van-skeleton title row="3" :loading="!rest.data">
      <view class="context">
        <view class="title">
          <text class="shop-name">{{ rest.data?.shopName }}</text>
          <van-card
            num="1"
            :price="rest.data?.price"
            :desc="rest.data?.desc"
            :title="rest.data?.name"
            :thumb="rest.data?.url"
          />
        </view>
      </view>
      <view class="detail">
        <uni-list>
          <uni-list-item title="商品金额" :rightText="rest.data?.price" />
          <uni-list-item title="手机号码" :rightText="rest.data?.phone" />
          <uni-list-item title="储值卡（余额）" :rightText="balance" />
        </uni-list>
      </view>
    </van-skeleton>
    <view class="bottom">
      <view class="price">
        <text class="now-price"
          >应付<text class="total">¥{{ rest.data?.price }}</text></text
        >
      </view>
      <view class="buy">
        <view class="buy-btn" @click="payOrder()">提交订单</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref, watch } from 'vue'
import store from '@/store/index'
import UserApi from '@/request/api/user'
import ShoppingApi from '@/request/api/shopping'

interface Irest {
  data: {
    orderId?: number
    shopName?: string
    price?: number
    desc?: string
    name?: string
    url?: string
    phone?: string
  } | null
}
const rest: Irest = reactive({ data: null })
let balance = ref(0)
onLoad((option) => {
  checkBalance()
  const obj = {}
  obj['orderId'] = Number(option.orderId)
  obj['shopName'] = option.shopName!
  obj['price'] = Number(option.price)
  obj['desc'] = option.desc!
  obj['name'] = option.name!
  obj['url'] = option.imgUrl!
  obj['phone'] = store.state.userMsg.userInfo?.phone!
  rest.data = obj
})

watch(
  balance,
  (count, prevCount) => {
    console.log(count, prevCount)
  },
  { immediate: true }
)

function checkBalance() {
  UserApi.checkBalance().then((res) => {
    if (res.code === 200) {
      balance.value = res.data.balance
    } else {
      uni.showToast({
        title: res.msg || '商品获取失败',
        icon: 'none',
      })
    }
  })
}

function payOrder() {
  ShoppingApi.payShoppingOrder(rest.data?.orderId!).then((res) => {
    if (res.code === 200) {
      uni.hideLoading()
      uni.navigateTo({
        url: '/pages/shop/order/paymentCompleted?' + 'productName=' + rest.data?.name + '&price=' + rest.data?.price,
      })
    } else {
      uni.showToast({
        title: res.msg || '商品获取失败',
        icon: 'none',
      })
    }
  })
}
</script>
<style scoped lang="scss">
.bottom {
  position: fixed;
  bottom: 0;
  background: #ffffff;
  .price {
    display: inline-block;
    width: 50%;
  }
  .buy {
    display: inline-block;
    width: 50%;
    .buy-btn {
      margin: 1px solid #4a5865;
      border-radius: 10rpx;
    }
  }
}
</style>
