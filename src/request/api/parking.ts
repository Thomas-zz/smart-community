import { request } from '../request'

type IPromise = Promise<any>

const ParkingApi = {
  // 查看小区所有车位
  getParkingList(pageNum: number = 1, pageSize: number = 10): IPromise {
    const url = `/user/parking/space/find`
    return request({
      url,
      data: {
        pageNum,
        pageSize,
      },
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
  getParkingDetail(parkingSpaceId: number): IPromise {
    const url = `/user/parking/space/detail`
    return request({
      url,
      data: {
        parkingSpaceId,
      },
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
