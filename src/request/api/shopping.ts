import { request } from '../request'

type IPromise = Promise<any>

const ShoppingApi = {
  // 确认订单完成
  confirmOrder(shoppingOrderId: number): IPromise {
    const url = `/user/shopping/confirm/order`
    return request({
      url,
      data: {
        shoppingOrderId,
      },
      method: 'POST',
    })
  },
  // 取消商品订单
  cancelOrder(shoppingOrderId: number): IPromise {
    const url = `/user/shopping/cancel/shopping/order`
    return request({
      url,
      data: {
        shoppingOrderId,
      },
      method: 'POST',
    })
  },
  // 选择服务时间
  choseServiceTime(shoppingOrderId: number, beginServiceTime: string, endServiceTime: string): IPromise {
    const url = `/user/shopping/chose/service/time`
    return request({
      url,
      data: {
        beginServiceTime,
        endServiceTime,
        shoppingOrderId,
      },
      method: 'POST',
    })
  },
  // 订单详情
  shoppingDetail(shoppingOrderId: number): IPromise {
    const url = `/user/shopping/detail`
    return request({
      url,
      data: {
        shoppingOrderId,
      },
      method: 'GET',
    })
  },
  // 订单列表
  shoppingInfo(pageNum: number, pageSize: number): IPromise {
    const url = `/user/shopping/find/info`
    return request({
      url,
      data: {
        pageNum,
        pageSize,
      },
      method: 'GET',
    })
  },
  // 支付订单
  payShoppingOrder(shoppingOrderId: number): IPromise {
    const url = `/user/shopping/pay/shopping/order`
    uni.showLoading({
      title: '支付中...',
    })
    return request({
      url,
      data: {
        shoppingOrderId,
      },
      method: 'POST',
    })
  },
  // 生成订单
  placeOrder(shopId: number, commodityList: { commodityId: number; count: number }[]): IPromise {
    const url = `/user/shopping/place/order`
    return request({
      url,
      data: {
        commodityList,
        shopId,
      },
      method: 'POST',
    })
  },
}

export default ShoppingApi
