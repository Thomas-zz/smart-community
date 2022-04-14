<template>
  <view>
    <view>
      <van-skeleton title row="3" :loading="!shopDetail.detail">
        <view class="head">
          <van-notice-bar scrollable :text="shopDetail.detail?.shopAnnouncement" />
          <view class="title">{{ shopDetail.detail?.shopName }}</view>
          <view class="location">{{ shopDetail.detail?.addressDetail }}</view>
          <image style="width: 100%; height: 200px" mode="sapectFill" :src="shopDetail.detail?.url"></image>
          <view class="business"
            >营业时间：{{
              shopDetail.detail?.businessBeginTime.slice(0, 5) + '-' + shopDetail.detail?.businessEndTime.slice(0, 5)
            }}</view
          >
        </view>
      </van-skeleton>
      <van-skeleton title avatar avatar-size="64px" row="3" avatar-shape="square" :loading="!productList.list">
        <view v-for="item of productList.list" :key="item.commodityId" @click="jumpToDetail(item.commodityId)">
          <van-card
            desc="嗨嗨嗨"
            :origin-price="item.price"
            :price="item.price * item.discount"
            :thumb="item.url"
            thumb-mode="aspectFill"
          >
            <view slot="title" class="title">
              <text>{{ item.name }}</text>
            </view>
          </van-card>
        </view>
      </van-skeleton>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import ShopApi from '@/request/api/shop'
import { reactive } from 'vue'

interface IproductList {
  list:
    | {
        commodityId: number
        discount: number
        name: string
        price: number
        url: string
      }[]
    | null
}
interface IshopDetail {
  detail: {
    addressDetail: string
    location: string
    phone: string
    businessBeginTime: string
    businessEndTime: string
    shopAnnouncement: string
    shopId: number
    shopName: string
    shopType: string
    url: string
  } | null
}
let productList: IproductList = reactive({ list: null })
let shopDetail: IshopDetail = reactive({ detail: null })
let pageNum = 1
let total = 0
let shopId = 0
onLoad((option) => {
  shopId = Number(option.shopId)
  getShopDetail(shopId)
  getProductList(shopId)
})

function getProductList(shopId: number) {
  ShopApi.getCommodityList(shopId, pageNum).then((res) => {
    // console.log(res)
    if (res.code === 200) {
      productList.list = res.data.data
      total = res.data.total
    } else {
      uni.showToast({
        title: res.msg || '商品获取失败',
        icon: 'none',
      })
    }
  })
}

function getShopDetail(shopId: number) {
  ShopApi.getShopDetail(shopId).then((res) => {
    console.log(res)
    if (res.code === 200) {
      shopDetail.detail = res.data
      total = res.data.total
    } else {
      uni.showToast({
        title: res.msg || '店家信息获取失败',
        icon: 'none',
      })
    }
  })
}

function jumpToDetail(commodityId: number) {
  uni.navigateTo({
    url:
      '/pages/shop/productDetail?shopId=' +
      shopId +
      '&commodityId=' +
      commodityId +
      '&shopName=' +
      shopDetail.detail?.shopName,
  })
}
</script>
<style scoped lang="scss">
.title {
  font-size: 36rpx;
  font-weight: 700;
  margin-bottom: 6rpx;
}
.tags {
  margin-top: 20rpx;
  .context {
    border: 1rpx solid #cccccc;
    border-radius: 8rpx;
    padding: 4rpx 8rpx;
  }
}
</style>
