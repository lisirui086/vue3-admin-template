<template>
  <el-card style="margin: 10px 0">
    <el-form label-width="100">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SKU描述" v-model="spuParams.spuName" />
      </el-form-item>
      <el-form-item label="SKU品牌">
        <el-select placeholder="请选择SKU品牌" v-model="spuParams.tmId">
          <el-option
            v-for="item in trademarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          type="textarea"
          placeholder="请输入SKU描述"
          v-model="spuParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU图片">
        <el-upload
          v-model:file-list="spuImageList"
          :action="setting.fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="handlBeforUpload"
          :on-remove="handleRemove"
          :on-success="handleSucces"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          v-model="saleAttrAndValueName"
          :placeholder="
            unusedSaleAttr.length
              ? `还剩${unusedSaleAttr.length}个未选择`
              : `销售属性已全选`
          "
        >
          <el-option
            v-for="item in unusedSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            :disabled="unusedSaleAttr.length ? false : true"
          ></el-option>
        </el-select>
        <el-button
          @click="addSale"
          :disabled="saleAttrAndValueName ? false : true"
          type="primary"
          icon="Plus"
          style="margin: 10px"
        >
          添加销售属性
        </el-button>
        <el-table border :data="SaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            header-align="center"
          />
          <el-table-column
            label="属性名"
            width="120"
            prop="saleAttrName"
            header-align="center"
          />
          <el-table-column label="属性值" header-align="center">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 0 5px"
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="index"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-model="row.saleAttrValue"
                @blur="toLook(row)"
                v-if="row.flag"
                placeholder="请输入属性值"
                size="small"
                style="width: 100px"
              />
              <el-button
                v-else
                type="success"
                size="small"
                icon="Plus"
                @click="addSaleValue(row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" header-align="center">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="SaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="SaleAttrList.length > 0 ? false : true"
          type="primary"
          @click="saveAttr"
        >
          确定
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, computed, nextTick } from 'vue'

// 引入通用设置
import setting from '@/setting'

// 饿了么的ts类型
import type { UploadProps } from 'element-plus'

// Message 消息提示
import { ElMessage } from 'element-plus'

// 引入 spu api and ts 类型
import {
  reqAllTrademark,
  reqSpuImage,
  reqSpuSaleAttr,
  reqAddOrEditSpu,
  reqAllSaleAttr,
} from '@/api/product/spu/index'
import type {
  AllTrademarkResponse,
  SpuImageListResponse,
  SaleAttrResponse,
  SaleOptionsResponse,
  SpuImage,
  SaleOptions,
  SaleAttr,
  SpuData,
} from '@/api/product/spu/type'
import type { Trademark } from '@/api/product/trademark/type'

// 接收父组件传递的自定义事件
let $emits = defineEmits(['change-sceen'])

// 存储品牌信息
let trademarkList = ref<Trademark[]>([])

// 存储图片
let spuImageList = ref<SpuImage[]>([])

// 存储属性值
let SaleAttrList = ref<SaleAttr[]>([])

// 存储属性
let SaleOptions = ref<SaleOptions[]>([])

// 收集销售属性值
let saleAttrAndValueName = ref<string>('')

// 存储完整的spu信息
let spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  // 品牌id
  tmId: '',
  // 存储属性值
  spuSaleAttrList: [],
  // 存储图片
  spuImageList: [],
})

// 取消按钮
const cancel = () => {
  $emits('change-sceen', { flag: 0, mark: spuParams.value.id ? 'edit' : 'add' })
}

// 获取spu相关的数据：图片，品牌，销售属性
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  // 获取全部品牌数据
  let trademarkRes: AllTrademarkResponse = await reqAllTrademark()
  if (trademarkRes.code == 200) {
    trademarkList.value = trademarkRes.data
  }
  // 获取某个spu下全部图片
  let spuImageRes: SpuImageListResponse = await reqSpuImage(spu.id)
  if (spuImageRes.code == 200) {
    spuImageList.value = spuImageRes.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
    })
  }
  // 获取某个SPU下全部销售属性
  let spuSaleAttrRes: SaleAttrResponse = await reqSpuSaleAttr(spu.id)
  if (spuSaleAttrRes.code == 200) {
    SaleAttrList.value = spuSaleAttrRes.data
  }
  // 获取整个项目的销售属性
  let allSaleAttrRes: SaleOptionsResponse = await reqAllSaleAttr()
  if (allSaleAttrRes.code == 200) {
    SaleOptions.value = allSaleAttrRes.data
  }
}

// 控制放大照片的对话框显示 or 隐藏
let dialogVisible = ref<boolean>(false)

// 存放预览照片地址
let dialogImageUrl = ref<string>('')

// 点击照片墙的预览回调
const handlePictureCardPreview = (uploadFile: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = uploadFile.url
}

// 文件上传前的回调
const handlBeforUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('图片大小不超过4MB')
      return false
    }
  } else {
    ElMessage.error('仅支持上传png,jpeg,gif图片类型文件')
    return false
  }
}

// 照片移除时的回调
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // console.dir(uploadFiles.length)
  if (uploadFile.status == 'success') return ElMessage.success('移除成功')
}

// 照片上传成功的回调
const handleSucces: UploadProps['onSuccess'] = (response, uploadFile) => {
  if (response.code == 201) {
    ElMessage.error('图片上传失败')
  }
}

// 计算出当前SPU还未拥有的销售属性
let unusedSaleAttr = computed(() => {
  let unusedSale = SaleOptions.value.filter((item) => {
    return SaleAttrList.value.every((item1) => {
      return item1.saleAttrName != item.name
    })
  })
  return unusedSale
})

// 添加属性
const addSale = () => {
  // 切割并解构
  const [baseSaleAttrId, saleAttrName] = saleAttrAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  SaleAttrList.value.push(newSaleAttr)
  // 清空选择的
  saleAttrAndValueName.value = ''
}

// 添加属性值
const addSaleValue = (sale: SaleAttr) => {
  sale.flag = true
}

// 切换到查看模式
const toLook = (sale: SaleAttr) => {
  // 解构
  const { baseSaleAttrId, saleAttrValue } = sale

  // 组合成新的值
  let newSaleAttrValueName = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue,
  }

  // 不允许有空值
  if (saleAttrValue.trim() == '') {
    // saleAttrValue.split(index, 1)
    ElMessage.warning('属性值不能为空')
    return
  }

  // 不允许有重复值
  let repeat = sale.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    ElMessage.warning('属性值不能重复')
    return
  }

  // 追加到数组内
  sale.spuSaleAttrValueList.push(newSaleAttrValueName)

  // 变成查看模式
  sale.flag = false
  nextTick(() => {
    sale.saleAttrValue = ''
  })
}

// 保存按钮的回调
const saveAttr = async () => {
  // 整理参数
  // 照片墙数据,饿了么组件要求参数名为name, url,与后台数据不一致,所以需要转化
  spuParams.value.spuImageList = spuImageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })

  // 整理销售属性
  spuParams.value.spuSaleAttrList = SaleAttrList.value

  // 发请求
  let result = await reqAddOrEditSpu(spuParams.value)

  // 是否成功
  if (result.code == 200) {
    ElMessage.success(spuParams.value.id ? '更新SPU成功' : '新增SPU成功')
    $emits('change-sceen', {
      flag: 0,
      mark: spuParams.value.id ? 'edit' : 'add',
    })
  } else {
    ElMessage.error(spuParams.value.id ? '更新SPU失败' : '新增SPU失败')
  }
}

// 添加一个新的spu初始化方法
const initAddSpu = async (c3Id: number | string) => {
  // 重置初始值
  Object.assign(spuParams.value, {
    spuName: '',
    description: '',
    category3Id: '',
    // 品牌id
    tmId: '',
    // 存储属性值
    spuSaleAttrList: [],
    // 存储图片
    spuImageList: [],
    id: '',
  })

  spuImageList.value = []

  SaleAttrList.value = []

  saleAttrAndValueName.value = ''

  spuParams.value.category3Id = c3Id
  // 获取全部品牌数据
  let trademarkRes: AllTrademarkResponse = await reqAllTrademark()
  if (trademarkRes.code == 200) {
    trademarkList.value = trademarkRes.data
  }
  // 获取整个项目的销售属性
  let allSaleAttrRes: SaleOptionsResponse = await reqAllSaleAttr()
  if (allSaleAttrRes.code == 200) {
    SaleOptions.value = allSaleAttrRes.data
  }
}

//对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<script lang="ts">
export default {
  name: 'AddOrEditSpu',
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
