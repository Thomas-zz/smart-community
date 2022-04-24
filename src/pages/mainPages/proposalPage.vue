<template>
  <view class="main">
    <uni-forms :modelValue="formData">
      <uni-forms-item label="我的建议" required>
        <uni-easyinput v-model="formData.context" type="textarea" placeholder="请在此写下您宝贵的建议" />
      </uni-forms-item>
      <uni-forms-item label="图片列表">
        <uni-file-picker
          v-model="formData.imageValue"
          fileMediatype="image"
          mode="grid"
          @select="select"
          @progress="progress"
          @success="success"
          @fail="fail"
        />
      </uni-forms-item>
      <uni-forms-item label="联系人">
        <uni-easyinput v-model="formData.name" />
      </uni-forms-item>
      <uni-forms-item label="联系电话">
        <uni-easyinput v-model="formData.phone" />
      </uni-forms-item>
    </uni-forms>

    <button class="btn" @click="submitForm">提交</button>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import store from '@/store/index'

interface IformData {
  context: string
  imageValue: []
  name: string
  phone: string
}

let formData: IformData = reactive({
  context: '',
  imageValue: [],
  name: store.state.userMsg.userInfo!.name!,
  phone: store.state.userMsg.userInfo!.phone!,
})

// 提交反馈
function submitForm() {}

// 获取上传状态
function select(e) {
  console.log('选择文件：', e)
}
// 获取上传进度
function progress(e) {
  console.log('上传进度：', e)
}
// 上传成功
function success(e) {
  console.log('上传成功')
}
// 上传失败
function fail(e) {
  console.log('上传失败：', e)
}
</script>
<style scoped lang="scss">
.main {
  margin: 28rpx 32rpx;
}

.btn {
  background: #dd5347;
  color: #ffffff;
  width: 150px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
</style>
