<template>
  <el-card>
    <!-- SKU表单 -->
    <el-table border style="margin: 10px 0" :data="skuList" height="440">
      <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
      <el-table-column label="名称" prop="skuName" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" prop="skuDesc" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="默认图片" header-align="center" width="130">
        <template #="{row, $index}">
          <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill" />
        </template>
      </el-table-column>
      <el-table-column label="重量(克)" header-align="center" width="80">
        <template #="{row, $index}">
          <el-text tag="b">{{ row.weight }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="价格(元)" header-align="center" width="80">
        <template #="{row, $index}">
          <el-text tag="b">{{ row.price }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center">
        <template #="{row, $index}">
          <el-button @click="updateSkuSale(row, $index)" size="small" :title="row.isSale ? '正常上架' : '已下架状态'" :icon="row.isSale ? 'Bottom' : 'Top'" :type="row.isSale ? '' : 'success'"></el-button>
          <el-button @click="ElMessage.warning('API正在开发中...')" size="small" icon="EditPen" type="primary"></el-button>
          <el-button size="small" icon="InfoFilled" type="info"></el-button>
          <el-button size="small" icon="Delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.limit"
      :page-sizes="[10, 15, 20]"
      background="background"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="pageData.total"
      @current-change="getSkuList"
      @size-change="handleLimit"
    />
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API
import { onMounted, reactive, ref } from 'vue'

// 引入sku相关的api and ts类型
import { reqSkuList, reqSaleSku, reqCancelSaleSku } from '@/api/product/sku/index'
import type { SkuResponseData, SkuAllData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus';

// 页码，条数，总条数。分页器相关数据
let pageData = reactive({
  page: 1,
  limit: 10,
  total: 0
})

// 存储SKU列表数据
let skuList = ref<SkuAllData[]>([])

// 获取sku列表
const getSkuList = async (pager = 1) => {
  // 默认请求第一页的数据
  pageData.page = pager
  // 发请求
  let res: SkuResponseData = await reqSkuList(pageData.page, pageData.limit)

  // 状态码成功则存储数据
  if (res.code == 200) {
    pageData.total = res.data.total

    skuList.value = res.data.records
  }
}

// 修改每页获取多少条数据
const handleLimit = () => {
  getSkuList()
}

// 更新sku的上架 | 下架 状态
// isSale: 1 | 0, 1是上架状态 0是下架状态
const updateSkuSale = async (sku: SkuAllData, index: number) => {
  // index 是从0开始，我们对应表单序号应在index上+1
  index+=1
  // 通过sale判断调用上架 | 下架 接口
  if (sku.isSale == 1) {
    // 目前该商品处于 上架阶段，我们把它下架
    let res = await reqCancelSaleSku(sku.id)
    if (res.code == 200) {
      ElMessage.success(`序号:${index}:下架成功`)
    } else {
      ElMessage.error(`序号:${index}:下架成功`)
    }
  } else {
    // 目前该商品处于 下架阶段，我们把它上架
    let res = await reqSaleSku(sku.id)
    if (res.code == 200) {
      ElMessage.success(`序号:${index}:上架成功`)
    } else {
      ElMessage.error(`序号:${index}:下架成功`)
    }
  }
  // 获取最新sku列表
  getSkuList()
}

// 组件挂载完毕后
onMounted(() => {
  getSkuList()
})

</script>
<script lang="ts">
export default {
  name: 'Sku',
}
</script>

<style scoped lang="scss"></style>
