// 引入路由规则
import router from '@/router'

// 引入进度条插件和样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 用户未登录 可以访问login，其他路由均不能访问
// 用户已登录 不能访问login，其他路由都可以访问

// 引入pinia，useUserStore
import pinia from './store'
import { useUserStore } from './store/modules/user'

// import piniaPersist from 'pinia-plugin-persist'

// pinia.use(piniaPersist)

// Message 消息提示
import { ElMessage } from 'element-plus'

/* useUserStore.persist: {
  enabled: true,
  strategies: [
    {
      key: 'user',
      paths: ['token'],
      storage: localStorage,
    },
  ],
} */

let userStore = useUserStore(pinia)

// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  nprogress.start()

  // 解构，获取token，用户名
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path == '/login') {
      next({ path: from.path })
    } else {
      if (username) {
        next()
      } else {
        try {
          // 发请求获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          ElMessage.error(error.messsage)
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 路由全局后置守卫
router.afterEach((to, from) => {
  // 结束进度条
  nprogress.done()
})
