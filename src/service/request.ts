import axios from 'axios'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, // url = base url + request url
  //withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
  // 对发送的数据做序列化处理
  transformRequest: [
    (data) => {
      data = qs.stringify(data)
      return data
    },
  ],
  timeout: 6000, // request timeout
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
  (config) => {
    // if (store.state.token) {
    //     // 给请求头添加user-token
    //     config.headers["user-token"] = store.state.token;
    // }
    console.log('请求拦截成功')
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

//配置成功后的拦截器
// service.interceptors.response.use(
//   (response) => {
//     console.log('response,' + response)
//     const { data: res, status } = response
//     if (status === 200) {
//       return res
//     } else {
//       uni.showToast({
//         title: res.msg || '请求出错了，请稍后尝试~',
//       })
//       return Promise.reject(res.msg)
//     }
//   },
//   (error) => {
//     console.log('error' + error)
//     // if (error.response.status) {
//     //   switch (error.response.status) {
//     //     case 401:
//     //       uni.showToast({
//     //         title: error.response.msg || '请求出错了，请稍后尝试~',
//     //       })
//     //       break
//     //     default:
//     //       break
//     //   }
//     // }
//     return Promise.reject(error)
//   }
// )

// // 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
// axios.defaults.adapter = function (config) {
//   return new Promise((resolve, reject) => {
//     console.log(config)
//     var settle = import('axios/lib/core/settle')
//     var buildURL = import('axios/lib/helpers/buildURL')
//     uni.request({
//       method: config.method.toUpperCase(),
//       url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
//       header: config.headers,
//       data: config.data,
//       dataType: config.dataType,
//       responseType: config.responseType,
//       sslVerify: config.sslVerify,
//       complete: function complete(response) {
//         console.log('执行完成：', response)
//         response = {
//           data: response.data,
//           status: response.statusCode,
//           errMsg: response.errMsg,
//           header: response.header,
//           config: config,
//         }

//         settle(resolve, reject, response)
//       },
//     })
//   })
// }

export default service
