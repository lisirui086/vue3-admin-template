<template>
  <div>
    <Category :sceen="sceen" />
    <el-card style="margin: 10px 0" v-show="sceen == 0">
      <el-button type="primary" icon="Plus" :disabled="CategoryStore.c3Id ? false : true"
        @click="addSpu">添加SPU</el-button>
      <!-- 展示SPU数据列表 -->
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column label="序号" type="index" width="80" header-align="center"></el-table-column>
        <el-table-column label="SKU名称" width="100" header-align="center" prop="spuName"></el-table-column>
        <el-table-column label="SKU描述" header-align="center" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="220" header-align="center">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Plus" size="small" title="添加SKU"></el-button>
            <el-button type="warning" icon="Edit" size="small" title="修改SKU" @click="editSpu(row)"></el-button>
            <el-button type="info" icon="View" size="small" title="查看SKU列表"></el-button>
            <el-button type="danger" icon="Delete" size="small" title="删除SKU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination :page-sizes="[3, 6, 9]" background layout="prev, pager, next, jumper,->, sizes, total"
        :total="pageData.total" v-model:current-page="pageData.page" v-model:page-size="pageData.limit"
        @size-change="getHasSpuList" @current-change="getHasSpuList" />
    </el-card>
    <AddOrEditSpu v-show="sceen == 1" @change-sceen="changeSceen" ref="spuEl" />
    <AddSku v-show="sceen == 2" />
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { reactive, ref, watch, onBeforeUnmount } from 'vue'

// 引入 category 仓库
import { useCategoryStore } from '@/store/modules/category'

// 引入spu api 和ts类型
import { reqHasSpu } from '@/api/product/spu/index'
import type {
  SpuData,
  HasSpuResponseData
} from '@/api/product/spu/type'

// 引入子组件
import AddOrEditSpu from './AddOrEditSpu/index.vue'
import AddSku from './AddSku/index.vue'

let CategoryStore = useCategoryStore()

// 用于切换 展示SPU数据列表 / 修改SPU数据列表 场景
let sceen = ref<number>(0)

// 定义分页器相关数据
let pageData = reactive({
  page: 1,
  limit: 3,
  total: 0,
})

// 存储SPU数据
let records = ref<SpuData[]>([])

// AddOrEditSpu组件节点
let spuEl = ref<any>()

// 获取最新的SPU数据列表
const getHasSpuList = async (pager = 1) => {
  pageData.page = pager
  let res: HasSpuResponseData = await reqHasSpu(
    pageData.page,
    pageData.limit,
    CategoryStore.c3Id,
  )
  if (res.code == 200) {
    records.value = res.data.records
    pageData.total = res.data.total
  }
}

// 侦听三级id的变化
watch(
  () => CategoryStore.c3Id,
  () => {
    if (!CategoryStore.c3Id) return
    records.value = []
    getHasSpuList()
  }
)

// 添加 or 修改 SPU
const addSpu = () => {
  sceen.value = 1
  spuEl.value.initAddSpu(CategoryStore.c3Id)
}

// 修改 SPU
const editSpu = (row: SpuData) => {
  sceen.value = 1
  spuEl.value.initHasSpuData(row)
}

// 父子通信
const changeSceen = (sonParams: any) => {
  console.log(sonParams)
  sceen.value = sonParams.flag
  if (sonParams.mark == 'add') {
    // 添加spu的话，跳转到第一页
    getHasSpuList()
  } else {
    // 更新spu的话,留在当前页
    getHasSpuList(pageData.page)
  }
}

// 组件销毁前
onBeforeUnmount(() => {
  CategoryStore.$reset()
})

</script>

<script lang="ts">
export default {
  name: 'Spu',
}
</script>

<style scoped lang="scss"></style>
