<template>
  <el-card style="margin: 10px 0">
    <el-form
      label-width="100"
      :rules="rules"
      ref="ruleFormRef"
      :model="skuParams"
    >
      <el-form-item label="SKU名称" prop="skuName">
        <el-input
          placeholder="SKU名称"
          v-model.trim="skuParams.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input-number
          v-model="skuParams.price"
          :min="1"
          :max="999999"
          value-on-clear="min"
        />
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input-number
          v-model="skuParams.weight"
          :min="1"
          :max="100000"
          value-on-clear="min"
        />
      </el-form-item>
      <el-form-item label="SKU描述" prop="skuDesc">
        <el-input
          placeholder="SKU描述"
          type="textarea"
          v-model.trim="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline="true" label-width="80">
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option
                v-for="attr in item.attrValueList"
                :key="attr.id"
                :label="attr.valueName"
                :value="`${item.id}:${attr.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline="true" label-width="80">
          <el-form-item
            v-for="item in saleAttr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select placeholder="请选择" v-model="item.saleIdAndValueId">
              <el-option
                v-for="sale in item.spuSaleAttrValueList"
                :key="sale.id"
                :label="sale.saleAttrValueName"
                :value="`${item.id}:${sale.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imageList" height="250" ref="imgTabelEl">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="图片" width="130">
            <template #="{ row, $index }">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.imgUrl"
                fit="fill"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template #="{ row, $index }">
              <pre>{{ row.imgName }}</pre>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template #="{ row, $index }">
              <el-button type="primary" @click="handleSetImage(row)">
                设为默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku(ruleFormRef)">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, reactive } from 'vue'

// 引入spu api 和ts类型
import type {
  SpuData,
  SpuImageListResponse,
  SaleAttrResponse,
  SpuImage,
  SaleAttr,
  SkuData,
  SkuSale,
  SkuAttr,
} from '@/api/product/spu/type'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqSpuImage, reqSpuSaleAttr, reqAddSku } from '@/api/product/spu/index'
import { reqAttr } from '@/api/product/attr/index'

// 饿了么ts类型
import { ElMessage, FormInstance, FormRules } from 'element-plus'

// 接收父组件传递的自定义事件
let $emits = defineEmits(['change-sceen'])

// 存储照片列表
let imageList = ref<SpuImage[]>([])

// 存储所有销售属性
let saleAttr = ref<SaleAttr[]>([])

// 存储平台属性列表
let attrArr = ref<Attr[]>([])

// 图片表格节点
let imgTabelEl = ref<any>('')

// 整个表单节点
let ruleFormRef = ref<FormInstance>()

// 表单校验规则
let rules = reactive<FormRules>({
  skuName: [
    { required: true, message: '请输入SKU名称', trigger: 'blur' },
    { min: 2, max: 10, message: '名称长度在2-10个字符之间', trigger: 'blur' },
  ],
  skuDesc: [
    { required: true, message: '请输入SKU描述', trigger: 'blur' },
    { min: 2, max: 100, message: '描述长度在2-100字符之间', trigger: 'blur' },
  ],
})

// 存储SKU整体数据
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuDefaultImg: '',
  skuSaleAttrValueList: [],
})

// 取消按钮回调
const cancel = () => {
  $emits('change-sceen', { flag: 0, mark: '' })
}

// 当前SKU组件
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
  // 收集数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId

  // 发请求获取平台属性、spu照片、spu销售属性
  let spuImageRes: SpuImageListResponse = await reqSpuImage(spu.id)
  let spuSaleAttrRes: SaleAttrResponse = await reqSpuSaleAttr(spu.id)
  let attrRes: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)

  // 存储
  if (spuImageRes.code == 200) imageList.value = spuImageRes.data
  if (spuSaleAttrRes.code == 200) saleAttr.value = spuSaleAttrRes.data
  if (attrRes.code == 200) attrArr.value = attrRes.data
}

// 设置默认图片
const handleSetImage = (img: SpuImage) => {
  // 排它思想
  imageList.value.forEach((item: SpuImage) => {
    imgTabelEl.value.toggleRowSelection(item, false)
  })

  // 被选中的勾选
  img.select = true
  imgTabelEl.value.toggleRowSelection(img, true)

  skuParams.skuDefaultImg = img.imgUrl
}

// 保存SKU
const saveSku = async (formEl: FormInstance | undefined) => {
  // 节点是否存在
  if (!formEl) return
  // 是否通过校验
  await formEl.validate()

  // 整理参数，平台属性和销售属性
  skuParams.skuSaleAttrValueList = saleAttr.value.reduce(
    (perv: SkuSale[], next: SaleAttr) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        perv.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return perv
    },
    [],
  )

  skuParams.skuAttrValueList = attrArr.value.reduce(
    (perv: SkuAttr[], next: Attr) => {
      if (next.attrIdAndValueId) {
        let [attrId, valueId] = next.attrIdAndValueId.split(':')
        perv.push({
          attrId,
          valueId,
        })
      }
      return perv
    },
    [],
  )

  // 发请求
  let res = await reqAddSku(skuParams)
  if (res.code == 200) {
    ElMessage.success('新增SKU成功')
    $emits('change-sceen', { flag: 0, mark: '' })
  } else {
    ElMessage.error('新增SKU失败')
  }
}

// 重置表单数据
const initReset = () => {
  // 清空数据
  Object.assign(skuParams, {
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    // 价格和重量
    price: 1,
    weight: 1,
    skuDesc: '',
    skuAttrValueList: [],
    skuDefaultImg: '',
    skuSaleAttrValueList: [],
  })
}

// 对外暴露
defineExpose({
  initSkuData,
  initReset,
})
</script>

<script lang="ts">
export default {
  name: 'AddSku',
}
</script>

<style scoped lang="scss"></style>
