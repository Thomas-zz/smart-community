import { request } from '../request'

type IPromise = Promise<any>

const loginApi = {
  // 获取用户码
  authorization(code: string): IPromise {
    const url = `/user/authorization`
    return request({
      url,
      data: code,
      method: 'GET',
    })
  },
  sendMessage(phone: string): IPromise {
    const url = `/user/send/message`
    console.log(phone)
    return request({
      url,
      data: { phone },
      method: 'GET',
    })
  },
  // 验证电话号码，注册用户
  checkCode(messageCode: string, phone: string, wxCode: string): IPromise {
    const url = `/user/check/code`
    console.log({
      messageCode,
      phone,
      wxCode,
    })
    return request({
      url,
      data: {
        messageCode,
        phone,
        wxCode,
      },
      method: 'POST',
    })
  },
}

export default loginApi
