import { request } from '../request'

type IPromise = Promise<any>

const CommunityApi = {
  // 获取公告列表
  getNewsList(pageNum: number = 1, pageSize: number = 10): IPromise {
    const url = `/user/announcement/list/simple`
    return request({
      url,
      data: {
        pageNum,
        pageSize,
      },
      method: 'GET',
    })
  },
  // 公告详情
  getNewsDetail(announcementId: number) {
    const url = `/user/announcement/detail`
    return request({
      url,
      data: {
        announcementId,
      },
      method: 'GET',
    })
  },
  // 获取用户账单
  getBillList(status: null | boolean): IPromise {
    const url = `/user/bill/list`
    return request({
      url,
      data: {
        status,
      },
      method: 'GET',
    })
  },
}

export default CommunityApi
