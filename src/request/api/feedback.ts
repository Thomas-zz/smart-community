import { request } from '../request'

type IPromise = Promise<any>

const FeedbackApi = {
  // 获取反馈列表
  getFeedbackList(type: string): IPromise {
    const url = `/user/feedback/list`
    return request({
      url,
      data: {
        type,
      },
      method: 'GET',
    })
  },
  // 提交反馈
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
