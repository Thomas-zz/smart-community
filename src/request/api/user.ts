import { request } from '../request'

type IPromise = Promise<any>

const UserApi = {
  // 获取用户信息
  getUserInfo(): IPromise {
    const url = `/user/info`
    return request({
      url,
      method: 'GET',
    })
  },
  // 用户支付账单
  payBill(billId: number, payPwd: string): IPromise {
    const url = `/user/wx/pay/bill`
    return request({
      url,
      data: {
        billId,
        payPwd,
      },
      method: 'POST',
    })
  },
  // 获取用户所属小区的列表
  getCommunityList(): IPromise {
    const url = `/user/community/list`
    return request({
      url,
      method: 'POST',
    })
  },
}

export default UserApi
