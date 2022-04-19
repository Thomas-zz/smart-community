import { request } from '../request'

type IPromise = Promise<any>

const FeedbackApi = {
  // 获取反馈列表
  getUserInfo(type: string): IPromise {
    const url = `/user/feedback/list`
    return request({
      url,
      data: {
        type,
      },
      method: 'GET',
    })
  },
  // 获取反馈列表
  sendFeedback(context: string, type: string, fileId: string): IPromise {
    const url = `/user/feedback/list`
    return request({
      url,
      data: {
        context,
        fileId,
        type,
      },
      method: 'GET',
    })
  },
}

export default FeedbackApi
