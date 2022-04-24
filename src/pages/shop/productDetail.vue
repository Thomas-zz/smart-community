<template>
  <view>
    <van-skeleton title row="3" :loading="!commodity.commodity">
      <view class="head">
        <view class="banner">
          <image
            style="width: 100%; height: 200px; background-color: #eeeeee"
            mode="aspectFill"
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
      <view class="line"></view>
      <view class="to-shop">
        <text class="tags">店铺</text>
        <text class="title">{{ shopName }}</text>
      </view>
      <view class="line"></view>
      <view class="detail">
        <view id="title">商品详情</view>
        <view class="title-line"></view>
        <view class="showImg">
          <view v-for="(item, index) of commodity.commodity.file" :key="index">
            <image
              v-if="item.fileType === 'image'"
              style="width: 100%; background-color: #eeeeee"
              mode="widthFix"
              :src="item.url"
            ></image>
          </view>
        </view>
      </view>
    </van-skeleton>
    <view class="bottom">
      <view id="price" class="price">
        <text class="now-price">¥{{ commodity.commodity.price * commodity.commodity.discount }}</text>
        <text class="origin-price">¥{{ commodity.commodity.price }}</text>
      </view>
      <!-- <view class="buy">
        <view class="buy-btn" @click="placeOrder()">立即购买</view>
      </view> -->
      <!-- <view class="btn">
        <van-button color="#dd5347" size="large" round type="info" @click="placeOrder()">立即购买</van-button>
      </view> -->
      <button class="btn" @click="placeOrder()">立即购买</button>
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
.head {
  margin: 28rpx;
  margin-top: 0;
  .banner {
    margin: 0 -28rpx;
  }
  .context {
    .title {
      font-size: 40rpx;
      font-weight: 600;
      margin-bottom: 13rpx;
    }
    .descript {
      font-size: 32rpx;
      color: #646566;
    }
  }
}

.price {
  margin: 18rpx 0;
  vertical-align: middle;
  .now-price {
    font-size: 50rpx;
    font-weight: bold;
    color: #dd5347;
  }
  .origin-price {
    margin-left: 20rpx;
    font-size: 35rpx;
    text-decoration: line-through;
    color: #646566;
  }
}

.line {
  height: 18rpx;
  background: #f4f4f4;
}

.to-shop {
  height: 80rpx;
  padding: 0 28rpx;
  padding-top: 15rpx;
  // vertical-align: middle;
  line-height: 60rpx;
  .tags {
    display: inline-block;
    padding-left: 15rpx;
    padding-right: 15rpx;
    background: #dd5347;
    border-radius: 10rpx;
    color: #ffffff;
    font-size: 30rpx;
  }
  .title {
    margin-left: 15rpx;
    font-size: 35rpx;
  }
}

.detail {
  padding: 28rpx;
  #title {
    font-size: 40rpx;
    font-weight: bold;
    padding-bottom: 15rpx;
  }
  .title-line {
    margin: 0 -28rpx;
    border-bottom: 1rpx solid #f5f5f5;
  }
  .showImg {
    padding-top: 15rpx;
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  background: #ffffff;
  height: 50px;
  line-height: 50px;
  width: 100%;
  #price {
    margin: 0;
    margin-left: 30rpx;
  }
  .btn {
    width: 140px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
    font-size: 16px;
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    background: #dd5347;
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
