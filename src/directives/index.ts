// vue自定义指令

// 导入自定义指令文件
import focus from './focus/index'
import isHasButton from './isHasButton/index'

// 挂载
const directivesList = {
  focus,
  isHasButton,
}

// 自动注册
const directives = {
  install: function (app: any) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key]) // 注册
    })
  },
}

// 导出
export default directives
