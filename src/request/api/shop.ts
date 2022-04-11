import { request } from '../request'

type IPromise = Promise<any>

const UserApi = {
  // 获取商店列表
  getShopList(): IPromise {
    const url = `/user/shop/find/info`
    return request({
      url,
      method: 'GET',
    })
  },
  getShopDetail(shopId: number): IPromise {
    const url = `/user/shop/info/detail`
    return request({
      url,
      data: {
        shopId,
      },
      method: 'GET',
    })
  },
  getCommodityList(shopId: number) {
    const url = `/user/commodity/list`
    return request({
      url,
      data: {
        shopId,
      },
      method: 'GET',
    })
  },
}

export default UserApi
