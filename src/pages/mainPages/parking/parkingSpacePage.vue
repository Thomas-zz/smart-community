<template>
  <view>
    <van-skeleton title avatar row="3" :loading="newsList.list === null">
      <view>
        <uni-list :border="true">
          <uni-list-item
            v-for="item in newsList.list?.data"
            :key="item.announcementId"
            direction="row"
            ellipsis="2"
            clickable="true"
            :to="'../news/newsDetails?newsId=' + item.announcementId"
            :title="item.title"
            :note="getLocalTime(item.releaseTime)"
          >
            <template v-slot:header>
              <!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
              <image class="image-1" :src="item.url ? item.url : defaultImgUrl" mode="aspectFill"></image>
            </template>
          </uni-list-item>
        </uni-list>
        <!-- <uni-list>
    <uni-list-item title="列表文字"></uni-list-item>
    <uni-list-item :disabled="true" title="列表禁用状态"></uni-list-item>
  </uni-list> -->
      </view>
    </van-skeleton>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ParkingApi from '@/request/api/parking'

interface Ilist {
  hasOwner: boolean
  name: string
  parkingSpaceId: number
  size: string
  url: string | null
}

interface IparkingList {
  list: {
    current: number
    data: Ilist[]
    size: number
    total: number
  } | null
}

const defaultImgUrl = `https://intelligent-community.oss-cn-guangzhou.aliyuncs.com/image/1/2/6b2e92c8f48040db9994cb383b33689e.png`

let parkingList: IparkingList = reactive({ list: null })
getParkingList(parkingList)
function getParkingList(newsList: IparkingList) {
  CommunityApi.getNewsList().then((res) => {
    console.log(res)
    if (res.code === 200) {
      newsList.list = res.data
    } else {
      uni.showToast({
        title: res.msg || '公告列表获取失败，请刷新重试',
        icon: 'none',
      })
    }
    console.log(newsList)
  })
}

// 日期格式化
function getLocalTime(nS) {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
}
</script>
<style scoped lang="scss">
.image-1 {
  flex-shrink: 0;
  margin-right: 8px;
  width: 250rpx;
  height: 150rpx;
  border-radius: 6px;
  overflow: hidden;
  border: 1px #f5f5f5 solid;
}
</style>
