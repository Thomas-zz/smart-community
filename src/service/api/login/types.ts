export interface ILoginParams {
  userName: string
  passWord: string | number
}
export interface ILoginApi {
  // 登录
  login: (params: ILoginParams) => Promise<any>
  authorization: (code: string) => Promise<any>
}
