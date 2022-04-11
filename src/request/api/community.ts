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
  getNewsDetails(announcementId: number): IPromise {
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
  // 获取用户当前浏览的小区信息
  getCommunityDetail(): IPromise {
    const url = `/user/community/detail`
    return request({
      url,
      method: 'GET',
    })
  },
  // 获取用户所属小区的列表
  getCommunityList(): IPromise {
    const url = `/user/community/list`
    return request({
      url,
      method: 'GET',
    })
  },
  // 切换小区
  switchCommunity(communityId: number): IPromise {
    const url = `/user/community/switch`
    return request({
      url,
      data: {
        communityId,
      },
      method: 'POST',
    })
  },
}

export default CommunityApi
