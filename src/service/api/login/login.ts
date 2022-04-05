import request from '@/service/request'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login(params) {
    const url = `/admin/logging/user/info`
    return request.post(url, params)
  },
  authorization(code) {
    const url = `/admin/logging/user/info`
    return request.get(url)
  },
}
export default loginApi
