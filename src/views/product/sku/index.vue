<template>
  <el-card>
    <!-- SKU表单 -->
    <el-table border style="margin: 10px 0" :data="skuList" height="440">
      <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
      <el-table-column label="名称" prop="skuName" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" prop="skuDesc" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="默认图片" header-align="center" width="130">
        <template #="{ row, $index }">
          <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" fit="fill" />
        </template>
      </el-table-column>
      <el-table-column label="重量(克)" header-align="center" width="80">
        <template #="{ row, $index }">
          <el-text tag="b">{{ row.weight }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="价格(元)" header-align="center" width="80">
        <template #="{ row, $index }">
          <el-text tag="b">{{ row.price }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center">
        <template #="{ row, $index }">
          <el-button @click="updateSkuSale(row, $index)" size="small" :title="row.isSale ? '正常上架' : '已下架状态'"
            :icon="row.isSale ? 'Bottom' : 'Top'" :type="row.isSale ? '' : 'success'"></el-button>
          <el-button @click="ElMessage.warning('API正在开发中...')" size="small" icon="EditPen" type="primary"></el-button>
          <el-button @click="seeSkuInfo(row)" size="small" icon="InfoFilled" type="info"></el-button>
          <el-popconfirm width="220" confirm-button-text="删除" cancel-button-text="取消" icon="InfoFilled"
            icon-color="#626AEF" :title="`确定要删除序号${$index + 1}吗？`" @confirm="deleteSku(row, $index)">
            <template #reference>
              <el-button size="small" icon="Delete" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageData.page" v-model:page-size="pageData.limit" :page-sizes="[5, 10, 15, 20]"
      background="background" layout="prev, pager, next, jumper, ->, sizes, total" :total="pageData.total"
      @current-change="getSkuList" @size-change="handleLimit" />
    <!-- SKU详情抽屉组件 -->
    <el-drawer v-model="drawer" title="SKU详情">
      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfoData.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfoData.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">
            <el-text size="large" type="danger">
              {{ skuInfoData.price }}
            </el-text>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="attr in skuInfoData.skuAttrValueList" :key="attr.attrId">{{ attr.attrName }}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18"><el-tag type="warning" v-for="sale in skuInfoData.skuSaleAttrValueList"
              :key="sale.saleAttrValueId">{{ sale.saleAttrValueName }}</el-tag></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel height="150px" type="card">
              <el-carousel-item v-for="img in skuInfoData.skuImageList" :key="img.id">
                <el-image style="width: 100%; height: 100%" :src="img.imgUrl" fit="cover" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API
import { onMounted, reactive, ref } from 'vue'

// 引入sku相关的api and ts类型
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSaleSku,
  reqSkuInfo,
  reqDeleteSku
} from '@/api/product/sku/index'
import type { SkuResponseData, SkuAllData, SkuInfoResponseData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

// 页码，条数，总条数。分页器相关数据
let pageData = reactive({
  page: 1,
  limit: 10,
  total: 0,
})

// 存储SKU列表数据
let skuList = ref<SkuAllData[]>([])

// 控制抽屉是否展开
let drawer = ref<boolean>(false)

// 存储SKU详情数据
let skuInfoData = ref<SkuAllData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  skuImageList: [],
  skuAttrValueList: [],
  skuSaleAttrValueList: []
})

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

/* 更新sku的上架 | 下架 状态
isSale: 1 | 0, 1是上架状态 0是下架状态 */
const updateSkuSale = async (sku: SkuAllData, index: number) => {
  // index 是从0开始，我们对应表单序号应在index上+1
  index += 1
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

// 查看SKU详情
const seeSkuInfo = async (sku: SkuAllData) => {
  drawer.value = true

  // 发请求
  let res: SkuInfoResponseData = await reqSkuInfo(sku.id)
  if (res.code == 200) {
    skuInfoData.value = res.data
    console.dir(skuInfoData)
  }
}

// 删除SKU
const deleteSku = async (sku: SkuAllData, index: number) => {
  let res = await reqDeleteSku(sku.id)

  // 存储序号和data
  index += 1
  switch (res.code) {
    case 200:
      ElMessage.success(`序号${index} 删除成功`)
      // 获取最新sku列表
      getSkuList()
      break;
    case 201:
      ElMessage.error(`序号${index}是系统数据，不能删除`)
      break;
    default:
      ElMessage.error(`序号${index} 删除失败`)
      break;
  }

}

// 组件挂载完毕后
onMounted(() => {
  getSkuList(skuList.value.length > 1 ? pageData.page : pageData.page -1)
})
</script>
<script lang="ts">
export default {
  name: 'Sku',
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 10px;
}

.el-tag {
  margin: 5px;
}

// 修改了element plus 走马灯下标样式。注意需要做样式渗透

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ff0000;
}

:deep(.el-carousel__indicators) {
  // 指示器
  left: unset;
  transform: unset;
  right: 2%;
}

:deep(.el-carousel__button) {
  // 指示器按钮
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 50%;
  background-color: rgb(255, 0, 0);
}

:deep(.is-active .el-carousel__button) {
  // 指示器激活按钮
  background: green;
}
</style>
