// 重新引入Pinia，用户仓库
import pinia from '@/store'
import { useUserStore } from '@/store/modules/user'

let userStore = useUserStore(pinia)

const isHasButton = {
  // 获取对应的用户仓库
  // 全局自定义指令：实现按钮的权限
  mounted(el: any, options: any) {
    if (!userStore.buttons.includes(options.value)) {
      el.parentNode.removeChild(el)
    }
  },
}

export default isHasButton
