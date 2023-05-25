// 路由鉴权 在main.ts中引入

// 创建用户相关的仓库
import { defineStore } from 'pinia'

// 引入mock api接口
import { reqLogin, reqUserInfo } from '@/api/user/index'

// 引入路由常量
import { routes } from '@/router/routes'

// 引入ts类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'

export const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: '',
      // 仓库存储生成菜单需要数组（路由
      menuRoutes: routes,
      // 存储用户信息
      avatar: '',
      username: '',
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: loginForm) {
      const res: loginResponseData = await reqLogin(data)
      // 登录请求 成功 code: 200 ==> 获取并存储token
      // 登录请求 失败 code: 201 ==> 提示登录失败信息
      if (res.code === 200) {
        this.token = res.data.token
        return 'userLogin success'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      let res = await reqUserInfo()
      if (res.code === 200) {
        this.avatar = res.data.checkUser.avatar
        this.username = res.data.checkUser.username
        return 'userIfon success'
      } else {
        return Promise.reject(new Error('userInfo fail'))
      }
    },
    // 退出登录
    logout() {
      this.$reset()
      // 移除loaclhost
      localStorage.removeItem('token')
    },
  },
  getters: {},
  // 作数据持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        paths: ['token'],
        storage: localStorage,
      },
    ],
  },
})
