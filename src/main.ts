import { createApp } from 'vue'
import App from '@/App.vue'

// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
//@ts-expect - error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

// 引入注册脚本
import 'virtual:svg-icons-register'

// 引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'

// 引入全局样式
import '@/styles/index.scss'

// 引入路由
import router from '@/router/index'

// 引入pinia
import pinia from '@/store'

// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入路由鉴权
import './permisstion'

// 引入自定义指令
import directives from '@/directives/index'

// 引入element plus 暗黑主体
import 'element-plus/theme-chalk/dark/css-vars.css'

// 获取应用实例对象
const app = createApp(App)

// 安装自定义插件：注册全局组件
app.use(globalComponent)

// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})

// 安装pinia
app.use(pinia)

// 安装路由插件
app.use(router)

// 导入所有图标并进行全局注册。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 安装自定义指令
app.use(directives)

// 将应用点挂载到挂载点上
app.mount('#app')
