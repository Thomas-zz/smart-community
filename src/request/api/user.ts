import { request } from '../request'

type IPromise = Promise<any>

const UserApi = {
  getUserInfo(): IPromise {
    const url = `/user/info`
    return request({
      url,
      method: 'GET',
    })
  },
}

export default UserApi
