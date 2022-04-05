import store from '@/store'
const BASE_URL = 'http://community.ifast3.vipnps.vip:80' //域名或选取所有接口不变的那一部分

interface Ioptions {
  url: string
  data?: string | {} | null
  method: 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined
  header?: {} | null
}

export const request = (options: Ioptions) => {
  //暴露一个function：myRequest，使用options接收页面传过来的参数
  return new Promise((resolve, reject) => {
    //异步封装接口，使用Promise处理异步请求
    uni.request({
      //发送请求
      url: BASE_URL + options.url, //接收请求的API
      method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
      data: options.data || {}, //接收请求的data,不传默认为空
      header: {
        token: store.getters.getUserToken,
      },
      success: (response: any) => {
        //数据获取成功
        // console.log(response)
        const { data: res, statusCode } = response
        if (statusCode !== 200) {
          //因为200是返回成功的状态码，如果不等于200,则代表获取失败,
          uni.showToast({
            title: res.msg || '数据获取失败！',
            icon: 'none',
            duration: 2000,
          })
          return Promise.reject(res.msg)
        }
        resolve(res) //成功,将数据返回
      },
      fail: (err) => {
        //失败操作
        uni.showToast({
          title: '请求接口失败！',
        })
        reject(err)
      },
    })
  })
}
