// 关于layout组件相关配置仓库
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      // 是否展开 收缩
      fold: false,
      // 是否刷新
      refresh: false,
    }
  },
})
