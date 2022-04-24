import { request } from '../request'

type IPromise = Promise<any>

const ParkingApi = {
  // 查看小区所有车位
  getParkingList(): IPromise {
    const url = `/user/parking/space/find`
    return request({
      url,
      method: 'GET',
    })
  },
  // 统计车位出售和出租情况
  getParkingCount(): IPromise {
    const url = `/user/parking/space/count/parking/space`
    return request({
      url,
      method: 'GET',
    })
  },
  // 停车位详细信息
  getParkingDetail(): IPromise {
    const url = `/user/parking/space/detail`
    return request({
      url,
      method: 'GET',
    })
  },
  // 查看业主拥有的车位
  getParkingSpace(): IPromise {
    const url = `/user/parking/space/parking/space`
    return request({
      url,
      method: 'GET',
    })
  },
}

export default ParkingApi
