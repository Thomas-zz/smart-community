<template>
  <view>
    <van-skeleton title avatar row="3" :loading="newsDetails.list === null">
      <view class="container">
        <view class="header">
          <view class="title"
            ><text user-select="true">{{ newsDetails.list?.title }}</text></view
          >
          <view class="sub-title"
            ><text user-select="true">{{ getLocalTime(newsDetails.list?.releaseTime) }}</text></view
          >
        </view>
        <view class="context">
          <text user-select="true">{{ newsDetails.list?.context }} </text>
        </view>
        <view class="ImgList">
          <template v-for="(img, index) of newsDetails.list?.file">
            <image
              v-if="img?.fileType === 'image'"
              :key="index"
              class="newsImg"
              :src="img.url"
              mode="aspectFill"
            ></image>
          </template>
        </view>
      </view>
    </van-skeleton>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CommunityApi from '@/request/api/community'

interface Ilist {
  announcementId: number
  title: string
  typeName: string
  context: string
  releaseTime: string
  file: ({
    fileType: string
    url: string
  } | null)[]
}

interface InewsList {
  list: Ilist | null
}

let newsId: number
let newsDetails: InewsList = reactive({ list: null })
onLoad((option) => {
  newsId = Number(option.newsId)
  getNewsDetail(newsId)
  // console.log(newsDetails.list)
})

function getNewsDetail(announcementId: number) {
  CommunityApi.getNewsDetails(announcementId).then((res) => {
    if (res.code === 200) {
      newsDetails.list = res.data
    } else {
      uni.showToast({
        title: res.msg || '新闻列表获取失败，请刷新重试',
      })
    }
  })
}

// 日期格式化
function getLocalTime(nS) {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
}
</script>
<style scoped lang="scss">
.container {
  margin: 28rpx;
  .header {
    margin-top: 18rpx;
    .title {
      font-size: 56rpx;
      line-height: 1.3em;
    }
    .sub-title {
      margin-top: 16rpx;
      margin-bottom: 32rpx;
      font-size: 26rpx;
      color: #777777;
    }
  }
  .context {
    line-height: 1.5em;
    text-align: justify;
    margin-bottom: 10rpx;
  }
  .ImgList {
    margin: 20rpx 0;
    width: 100%;
    margin: 0;
    .newsImg {
      width: 100%;
    }
  }
}
</style>
