import { request } from '../request'

type IPromise = Promise<any>

const ParkingApi = {
  // 获取停车位列表
  getParkingList(): IPromise {
    const url = `/user/list/parking/space`
    return request({
      url,
      method: 'GET',
    })
  },
  // 统计车位出售和出租情况
  getParkingCount(): IPromise {
    const url = `/user/count/parking/space`
    return request({
      url,
      method: 'GET',
    })
  },
  // 业主拥有的车位
  getParkingSpace(): IPromise {
    const url = `/user/parking/space`
    return request({
      url,
      method: 'GET',
    })
  },
}

export default ParkingApi
