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
    console.log(billId, payPwd)
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
  // 查看用户余额
  checkBalance(): IPromise {
    const url = `/user/balance`
    return request({
      url,
      method: 'GET',
    })
  },
}

export default UserApi
