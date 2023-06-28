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

// 关闭加载旋转器
nprogress.configure({ showSpinner: false })

// Message 消息提示
import { ElMessage } from 'element-plus'

// 引入项目名称
import setting from './setting'

let userStore = useUserStore(pinia)

// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 拼接当前标题名称
  document.title = `${setting.projectName}-${to.meta.title}`
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
          // 避免死循环
          next({ ...to, replace: true })
        } catch (error) {
          ElMessage.error('token失效,请重新登录')
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
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
