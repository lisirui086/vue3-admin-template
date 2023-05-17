import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'

// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

// 获取应用实例对象
const app = createApp(App)

// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn
})

// 将应用点挂载到挂载点上
app.mount('#app')
