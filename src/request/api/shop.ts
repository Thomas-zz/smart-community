import { request } from '../request'

type IPromise = Promise<any>

const ShopApi = {
  // 获取商店列表
  getShopList(type: number): IPromise {
    const url = `/user/shop/find/info`
    return request({
      url,
      data: {
        type,
      },
      method: 'GET',
    })
  },
  // 商店详细信息
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
  // 获取商品列表
  getCommodityList(shopId: number, pageNum: number): IPromise {
    const url = `/user/commodity/find/info`
    return request({
      url,
      data: {
        pageNum,
        pageSize: 8,
        shopId,
      },
      method: 'GET',
    })
  },
  // 获取商品详细信息
  getCommodityDetail(shopId: number, commodityId: number): IPromise {
    const url = `/user/commodity/detail`
    return request({
      url,
      data: {
        shopId,
        commodityId,
      },
      method: 'GET',
    })
  },
}

export default ShopApi
