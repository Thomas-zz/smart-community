<template>
  <view>
    <van-skeleton title avatar row="3" :loading="newsDetails.list === null">
      <view class="container">
        <view class="header">
          <view class="title"
            ><text user-select="true">{{ newsDetails.list?.title }}</text></view
          >
          <view class="sub-title"
            ><text user-select="true">{{ newsDetails.list?.releaseTime.split('T').join(' ') }}</text></view
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
import store from '@/store/index'

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
  newsDetails.list = store.getters.getNewsDetails(newsId)
  console.log(newsDetails.list)
})
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
      margin-top: 14rpx;
      margin-bottom: 30rpx;
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
