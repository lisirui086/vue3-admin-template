// 引入需要注册全局组件的组件
import SvgIcon from '@/components/Svgicon/index.vue'

// 全局组件的对象
const allGloablComponent = {
  SvgIcon
}

// 对外暴露插件对象
export default {
  install(app) {
    Object.keys(allGloablComponent).forEach(key => {
      // 注册全局组件
      app.component(key, allGloablComponent[key])
    })
  }
}