<script setup lang="ts">
import { onLaunch, onShow, onHide, onLoad } from '@dcloudio/uni-app'
onLoad(() => {
  uni.clearStorage()
})
onLaunch(() => {
  // console.log('App Launch')
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
</script>
<style>
@import './wxcomponents/vant/common/index.wxss';
</style>
