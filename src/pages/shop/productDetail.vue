<template>
  <view>
    <van-skeleton title row="3" :loading="!commodity.commodity">
      <view class="head">
        <view class="banner">
          <image
            style="width: 100%; height: 200px; background-color: #eeeeee"
            mode="sapectFill"
            :src="commodity.commodity.file[0].url"
          ></image>
        </view>
        <view class="context">
          <view class="price">
            <text class="now-price">¥{{ commodity.commodity.price * commodity.commodity.discount }}</text>
            <text class="origin-price">¥{{ commodity.commodity.price }}</text>
          </view>
          <view class="title">{{ commodity.commodity.name }}</view>
          <view class="descript">{{ commodity.commodity.description }}</view>
        </view>
      </view>
      <view class="to-shop"> <text>商铺名</text><text> 进店逛逛</text>> </view>
      <view class="detail">
        <view id="title">商品详情</view>
        <view class="showImg">
          <view v-for="(item, index) of commodity.commodity.file" :key="index">
            <image
              v-if="item.fileType === 'image'"
              style="width: 100%; background-color: #eeeeee"
              mode="sapectFill"
              :src="item.url"
            ></image>
          </view>
        </view>
      </view>
    </van-skeleton>
    <view class="bottom">
      <view class="price">
        <text class="now-price">价格</text>
        <text class="origin-price">原价</text>
      </view>
      <view class="buy">
        <view class="buy-btn" @click="placeOrder()">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import ShopApi from '@/request/api/shop'
import ShoppingApi from '@/request/api/shopping'
import { reactive } from 'vue'

interface Icommodity {
  commodity: {
    commodityId: number
    description: string
    discount: number
    file: {
      fileType: string
      url: string
    }[]
    name: string
    price: number
  } | null
}

let shopId = 0
let shopName = ''
let commodityId = 0
onLoad((option) => {
  shopId = Number(option.shopId)
  commodityId = Number(option.commodityId)
  shopName = option.shopName!
  getCommodityDetail(shopId, commodityId)
})

const commodity: Icommodity = reactive({ commodity: null })

function getCommodityDetail(shopId: number, commodityId: number) {
  ShopApi.getCommodityDetail(shopId, commodityId).then((res) => {
    console.log(res)
    if (res.code === 200) {
      commodity.commodity = res.data
      console.log(commodity)
    } else {
      uni.showToast({
        title: res.msg || '商品获取失败',
        icon: 'none',
      })
    }
  })
}

function placeOrder() {
  const commodityList = {
    commodityId,
    count: 1,
  }
  ShoppingApi.placeOrder(shopId, [commodityList]).then((res) => {
    console.log(res)
    let { price, description, name } = commodity.commodity!
    if (res.code === 200) {
      const rest =
        'orderId=' +
        res.data.shoppingOrderId +
        '&shopName=' +
        shopName +
        '&price=' +
        price +
        '&desc=' +
        description +
        '&name=' +
        name +
        '&imgUrl=' +
        commodity.commodity!.file[0].url
      uni.navigateTo({
        url: '/pages/shop/order/placeOrder?' + rest,
      })
    } else {
      uni.showToast({
        title: res.msg || '订单创建失败',
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
