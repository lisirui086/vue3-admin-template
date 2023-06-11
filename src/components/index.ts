// 引入需要注册全局组件的组件
import SvgIcon from './Svgicon/index.vue'
import Category from './Category/index.vue'
import SelectKey from './SelectKey/index.vue'

// 全局组件的对象
const allGloablComponent = {
  SvgIcon,
  Category,
  SelectKey
}

// 对外暴露插件对象
export default {
  install(app) {
    Object.keys(allGloablComponent).forEach((key) => {
      // 注册全局组件
      app.component(key, allGloablComponent[key])
    })
  },
}
