// 登录接口需要携带的参数ts类型 --- mock版本

// 用户账号密码
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token?: string
  message?: string
}
// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

// 用户信息
export interface userInfoType {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

export interface user {
  checkUser: userInfoType
}

// 服务器返回用户信息相关数据类型
export interface userResponseData {
  code: number
  data: user
}
