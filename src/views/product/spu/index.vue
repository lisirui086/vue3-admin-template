<template>
  <div>
    <Category :sceen="sceen" />
    <el-card style="margin: 10px 0" v-show="sceen == 0">
      <el-button type="primary" icon="Plus" :disabled="CategoryStore.c3Id ? false : true" @click="addSpu">
        添加SPU
      </el-button>
      <!-- 展示SPU数据列表 -->
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column label="序号" type="index" width="80" header-align="center"></el-table-column>
        <el-table-column label="SKU名称" width="100" header-align="center" prop="spuName"></el-table-column>
        <el-table-column label="SKU描述" header-align="center" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="220" header-align="center">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Plus" size="small" title="添加SKU" @click="addSku(row)"></el-button>
            <el-button type="warning" icon="Edit" size="small" title="修改SKU" @click="editSpu(row)"></el-button>
            <el-button type="info" icon="View" size="small" title="查看SKU列表" @click="showSkuList(row)"></el-button>
            <el-popconfirm width="200" :title="`确定要删除${row.spuName}?`" @confirm="removeSKu(row)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" title="删除SKU"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination :page-sizes="[3, 6, 9]" background layout="prev, pager, next, jumper,->, sizes, total"
        :total="pageData.total" v-model:current-page="pageData.page" v-model:page-size="pageData.limit"
        @size-change="changeSize" @current-change="getHasSpuList" />
    </el-card>
    <AddOrEditSpu v-show="sceen == 1" @change-sceen="changeSceen" ref="spuEl" />
    <AddSku v-show="sceen == 2" @change-sceen="changeSceen" ref="skuEl" />
    <!-- Dialog 对话框 -->
    <el-dialog v-model="dialogTableVisible" :title="`${skuListTitle}的SKU列表`">
      <el-table :data="skuList" border height="360">
        <el-table-column label="SKU名称" prop="skuName" show-overflow-tooltip />
        <el-table-column label="SKU价格(元)" prop="price" />
        <el-table-column label="SKU重量(克)" prop="weight" />
        <el-table-column label="SKU图片">
          <template #="{ row, $index }">
            <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { reactive, ref, watch, onBeforeUnmount } from 'vue'

// 引入 category 仓库
import { useCategoryStore } from '@/store/modules/category'

// 引入spu api 和ts类型
import { reqHasSpu, reqSkuList, reqRemoveSku } from '@/api/product/spu/index'
import type { SpuData, HasSpuResponseData, SkuInfoDataResponse, SkuData } from '@/api/product/spu/type'

// 引入子组件
import AddOrEditSpu from './AddOrEditSpu/index.vue'
import AddSku from './AddSku/index.vue'
import { ElMessage } from 'element-plus'

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

// AddOrEditSpu组件节点 AddSku组件节点
let spuEl = ref<any>()
let skuEl = ref<any>()

// 存储SKU列表数据
let skuList = ref<SkuData[]>([])

// SKU列表对话框 显示|隐藏
let dialogTableVisible = ref<boolean>(false)

// SKU列表标题
let skuListTitle = ref<string>('SKU列表')

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

// 当分页器选择每页展示多少条时
const changeSize = () => {
  getHasSpuList()
}

// 侦听三级id的变化
watch(
  () => CategoryStore.c3Id,
  () => {
    if (!CategoryStore.c3Id) return
    records.value = []
    getHasSpuList()
  },
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
  sceen.value = sonParams.flag
  if (sonParams.mark == 'add') {
    // 添加spu的话，跳转到第一页
    getHasSpuList()
  } else {
    // 更新spu的话,留在当前页
    getHasSpuList(pageData.page)
  }
}

// 添加sku
const addSku = (row: SpuData) => {
  skuEl.value.initReset()
  sceen.value = 2
  skuEl.value.initSkuData(CategoryStore.c1Id, CategoryStore.c2Id, row)
}

// 查看SKU列表
const showSkuList = async (row: SpuData) => {
  let res: SkuInfoDataResponse = await reqSkuList(row.id)
  skuListTitle.value = row.spuName
  if (res.code == 200) {
    skuList.value = res.data
    dialogTableVisible.value = true
  }
}

// 删除SKU
const removeSKu = async (row: SpuData) => {
  let res: any = await reqRemoveSku(row.id)
  skuListTitle.value = row.spuName

  // 判断不同状态码，给用户不同提示
  switch (res.code) {
    case 200:
      ElMessage.success(`已成功删除 ${skuListTitle.value}`)
      getHasSpuList(records.value.length > 1 ? pageData.page : pageData.page - 1)
      break;

    case 201:
      ElMessage.error(`${skuListTitle.value}是${res.data}`)
      break;

    default:
      ElMessage.warning(`${skuListTitle.value}!${res.data}`)
      break;
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
