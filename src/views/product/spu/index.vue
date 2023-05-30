<template>
  <div>
    <Category :sceen="sceen" />
    <el-card style="margin: 10px 0;">
      <el-button type="primary" icon="Plus">添加SPU</el-button>
      <el-table style="margin: 10px 0;" border>
        <el-table-column label="序号" type="index" width="80" header-alig="center"></el-table-column>
        <el-table-column label="SKU名称" width="100" header-alig="center"></el-table-column>
        <el-table-column label="SKU描述" header-alig="center"></el-table-column>
        <el-table-column label="操作" width="180" header-alig="center"></el-table-column>
      </el-table>
      <el-pagination
      page-sizes="[3, 6, 9]"
      background
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="pageData.total"
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.limit"
    />
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { reactive, ref, watch } from 'vue'

// 引入 category 仓库
import { useCategoryStore } from '@/store/modules/category'

// 引入spu api 和ts类型
import { reqHasSpu } from '@/api/product/spu/index'
import type { HasSpuResponseData, SpuData } from '@/api/product/spu/type'

let CategoryStore = useCategoryStore()

// 用于切换 展示SPU数据列表 / 修改SPU数据列表 场景
let sceen = ref<number>(0)

// 定义分页器相关数据
let pageData = reactive({
  page: 1,
  limit: 3,
  total: 0
})

// 存储SPU数据
let records = ref<SpuData[]>([])

// 获取最新的SPU数据列表
const getHasSpuList = async () => {
  let res: HasSpuResponseData = await reqHasSpu(pageData.page, pageData.limit, CategoryStore.c3Id)
  // console.log(res)
  if (res.code == 200) {
    records.value = res.data.records
  }
}

// 侦听三级id的变化
watch(() => CategoryStore.c3Id, () => {
  getHasSpuList()
})

// 组件挂载完毕后
/* onMounted(() => {
  getHasSpuList()
}) */



</script>

<script lang="ts">
export default {
  name: 'Spu',
}
</script>

<style scoped lang="scss"></style>
