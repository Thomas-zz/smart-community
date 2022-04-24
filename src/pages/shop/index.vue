<template>
  <view>
    <view v-if="isLogin()">
      <van-skeleton title avatar avatar-size="64px" row="3" avatar-shape="square" :loading="!shopsList.shopList">
        <view
          class="card-box"
          v-for="item of shopsList.shopList"
          :key="item.shopId"
          @click="jumpToProduct(item.shopId)"
        >
          <van-card
            custom-class="card"
            :desc="'营业时间：' + item.businessBeginTime.slice(0, 5) + ' - ' + item.businessEndTime.slice(0, 5)"
            :thumb="item.url"
            thumb-mode="aspectFill"
          >
            <view slot="title" class="title">
              <text>{{ item.shopName }}</text>
            </view>
            <view slot="tags" class="tags">
              <text class="context">{{ item.type }}</text>
            </view>
          </van-card>
        </view>
      </van-skeleton>
    </view>
    <view v-else class="unLogin"><text>您还未登录哦~</text><br /><text>登录后查看社区商城</text></view>
  </view>
</template>

<script setup lang="ts">
import ShopApi from '@/request/api/shop'
import { computed, reactive, ref, watch } from 'vue'
import store from '@/store/index'

interface IshopsList {
  shopList:
    | {
        businessBeginTime: string
        businessEndTime: string
        shopId: number
        type: string
        shopName: string
        url: string
      }[]
    | null
}

const defaultImgUrl = `https://intelligent-community.oss-cn-guangzhou.aliyuncs.com/image/1/2/6b2e92c8f48040db9994cb383b33689e.png`

const shopsList: IshopsList = reactive({ shopList: null })
const type = {
  1: '到家服务',
}
let userToken = computed(() => store.state.userMsg.userToken)
watch(
  userToken,
  () => {
    ShopApi.getShopList(1).then((res) => {
      console.log(res)
      if (res.code === 200) {
        shopsList.shopList = res.data
      } else {
        uni.showToast({
          title: res.msg || '商铺获取失败',
          icon: 'none',
        })
      }
    })
  },
  { immediate: true }
)

// 是否已经登录
const isLogin = () => {
  return store.getters.getUserToken !== ''
}

function jumpToProduct(shopId: number) {
  uni.navigateTo({
    url: '/pages/shop/productPage?shopId=' + shopId,
  })
}
</script>
<style scoped lang="scss">
.card-box {
  border-bottom: 1rpx solid #f5f6f8;
  .card {
    background: #ffffff;
  }
}

.unLogin {
  padding-top: 80px;
  font-size: 45rpx;
  text-align: center;
  font-weight: 500;
}

.title {
  font-size: 34rpx;
  font-weight: 700;
  margin-bottom: 6rpx;
}
.tags {
  margin-top: 56rpx;
  .context {
    font-size: 30rpx;
    border: 1rpx solid #cccccc;
    border-radius: 8rpx;
    padding: 4rpx 10rpx;
  }
}
</style>
