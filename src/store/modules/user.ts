// 路由鉴权 在main.ts中引入

// 创建用户相关的仓库
import { defineStore } from 'pinia'

// 引入api接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'

// 引入路由常量
import { routes, asnycRoute, anyRoute } from '@/router/routes'

// 引入本地存储方法
import { SET_TOKEN, REMOVE_TOKEN, GET_TOKEN } from '@/utils/token'

// 引入ts类型
import type { UserState } from './types/type'

// 忽略ts对lodash的校验
//@ts-ignore
// 引入lodash
import cloneDeep from 'lodash/cloneDeep'

// 引入接口数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
  logoutResponseData,
} from '@/api/user/type'
import router from '@/router'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children =  filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      // 仓库存储生成菜单需要数组（路由
      menuRoutes: routes,
      // 存储用户信息
      avatar: '',
      username: '',
      buttons: []
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: loginFormData) {
      const res: loginResponseData = await reqLogin(data)
      // console.dir(res)
      // 登录请求 成功 code: 200 ==> 获取并存储token
      // 登录请求 失败 code: 201 ==> 提示登录失败信息
      if (res.code === 200) {
        this.token = res.data
        SET_TOKEN(res.data as string)
        return 'userLogin success'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      let res: userInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.avatar = res.data.avatar
        this.username = res.data.name
        this.buttons = res.data.buttons
        // 过滤异步路由
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), res.data.routes)
        // 合并异步、任意路由数组
        let asyncAndAnyRouteArr = [...userAsyncRoute, ...anyRoute]
        // 路由目录
        this.menuRoutes = [...routes, ...asyncAndAnyRouteArr]
        // 注册异步、任意路由
        asyncAndAnyRouteArr.forEach((route: any) => {
          router.addRoute(route)
        })
        return 'userInfo success'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 退出登录
    async logout() {
      let res: logoutResponseData = await reqLogout()
      if (res.code === 200) {
        // 移除loaclhost
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'logout success'
      } else {
        return Promise.reject(new Error('logout fail'))
      }
    },
  },
  getters: {},
})
