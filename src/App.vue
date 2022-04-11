<script setup lang="ts">
import { onLaunch, onShow, onHide, onLoad } from '@dcloudio/uni-app'
import UserApi from '@/request/api/user'
import store from '@/store/index'
onLoad(() => {})
onLaunch(() => {
  // console.log('App Launch')
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
UserApi.getUserInfo().then((res) => {
  // console.log(res)
  if (res.code !== 200) {
    store.commit('cleanState')
  }
})
</script>
<style>
@import './wxcomponents/vant/common/index.wxss';
</style>
