// 获取当前时间的函数

// 引入组合式API
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 时间库
import * as dayjs from 'dayjs'

export default function useNowDate() {
  let nowTime = ref(dayjs().format('YYYY-DD-MM HH:mm:ss'))

  // 定时器
  let timer = null
  
  // 组件挂载完毕后
  onMounted(() => {
    if (nowTime !== null || nowTime !== undefined) {
      timer = setInterval(() => {
        nowTime.value = dayjs().format('YYYY-DD-MM HH:mm:ss')
      }, 1000)
    }
  })

  // 组件卸载前
  onBeforeUnmount(() => {
    // 清除定时器
    clearInterval(timer)
  })
  return nowTime
}
