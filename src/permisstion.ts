// 引入路由规则
import router from "@/router"

// 引入进度条插件和样式
import nprogress from 'nprogress'

import 'nprogress/nprogress.css'

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  next()
})

// 路由全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})