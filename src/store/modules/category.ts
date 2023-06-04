// 创建三级联动组件相关的仓库

import { defineStore } from 'pinia'

// 引入三级联动相关的api接口
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'

// 引入属性管理类型的ts类型
import type { CategoryResponseData } from '@/api/product/attr/type'
import { CategoryState } from './types/type'

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => {
    return {
      // 一级分类
      c1Arr: [],
      // 一级分类的id
      c1Id: '',
      // 二级分类的列表和id
      c2Arr: [],
      c2Id: '',
      // 三级分类的列表和id
      c3Arr: [],
      c3Id: '',
    }
  },
  actions: {
    // 获取一级分类列表数据
    async getC1() {
      let res: CategoryResponseData = await reqC1()
      if (res.code == 200) {
        this.c1Arr = res.data
      }
    },
    // 获取二级分类的列表数据
    async getC2() {
      let res: CategoryResponseData = await reqC2(this.c1Id)
      if (res.code == 200) {
        this.c2Arr = res.data
      }
    },
    // 获取三级分类的列表
    async getC3() {
      let res = await reqC3(this.c2Id)
      if (res.code == 200) {
        this.c3Arr = res.data
      }
    },
  },
  getters: {},
})
