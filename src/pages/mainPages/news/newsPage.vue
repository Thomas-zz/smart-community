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
            :note="item.releaseTime.split('T').join(' ')"
          >
            <template v-slot:header>
              <!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
              <image class="image-1" :src="item.file[0]?.url" mode="aspectFill"></image>
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
import CommunityApi from '@/request/api/community'
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
  list: {
    current: number
    data: Ilist[]
    size: number
    total: number
  } | null
}

let newsList: InewsList = reactive({ list: null })
getNewsList(newsList)
function getNewsList(newsList: InewsList) {
  CommunityApi.getNewsList().then((res) => {
    console.log(res)
    if (res.code === 200) {
      newsList.list = res.data
    } else {
      uni.showToast({
        title: res.msg || '新闻列表获取失败，请刷新重试',
      })
    }
    // console.log(newsList)
  })
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
