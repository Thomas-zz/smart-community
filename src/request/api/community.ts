import { request } from '../request'

type IPromise = Promise<any>

const CommunityApi = {
  // 获取公告列表
  getNewsList(): IPromise {
    const url = `/user/announcement/list`
    return request({
      url,
      method: 'GET',
    })
  },
}

export default CommunityApi
