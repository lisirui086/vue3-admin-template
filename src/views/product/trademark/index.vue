<template>
  <el-card class="box-card">
    <!-- 添加品牌 -->
    <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <!-- 数据表格 -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" align="center" prop="tmName">
        <template #="{ row, $index }">
          <pre style="color:darkblue">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{ row, $index }">
          <el-image style="width: 50px; height:50px;" fit="fill" :src="row.logoUrl" alt="row.tmName" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{ row, $index }">
          <el-button type="warning" icon="EditPen" @click="editTrademark(row)"></el-button>
          <el-popconfirm width="220" confirm-button-text="确定" cancel-button-text="取消" icon="DeleteFilled"
            icon-color="red" :title="`确定要删除${row.tmName}吗？`" @confirm="removeTrademark(row)">
            <template #reference>
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageDate.pageNo" v-model:page-size="pageDate.limit" :page-sizes="[3, 6, 9, 15]"
      layout="prev, pager, next, jumper, ->, total, sizes" :total="pageDate.total" background
      @size-change="handleSizeChange" @current-change="getHasTrademark" />
    <!-- 添加/修改品牌 -->
    <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <!-- 表单 -->
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="ruleFormRef">
        <el-form-item label="品牌名称" label-width="120px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="120px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess" :show-file-list="false">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="upload(ruleFormRef)">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API
import { reactive, onMounted, ref, nextTick } from 'vue'

// 引入tradmark api
import { reqHasTrademark, reqAddOrEditTrademark, reqRemoveTrademark } from '@/api/product/trademark/index'

// 引入trademark， element-plus ts类型
import type { Records, TrademarkResponseData, Trademark } from '@/api/product/trademark/type'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'

// 
import { ElMessage } from 'element-plus'

// 存储当前页，每页记录数
let pageDate = reactive({
  pageNo: 1,
  limit: 3,
  total: 0
})

// 存储表格数据
let trademarkArr = ref<Records>([])

// 控制对话框的显示和隐藏
let dialogVisible = ref<boolean>(false)

// 收集添加/修改表单信息
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: ''
})

// 获取添加/修改表单节点
let ruleFormRef = ref<FormInstance>()

// 添加/修改品牌校验
const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: '请填写品牌名称', trigger: 'blur' },
    { min: 2, max: 8, message: '品牌名称在2-8个字之间', trigger: 'blur' },
  ],
  logoUrl: [
    { required: true, message: '请上传品牌LOGO', trigger: 'change' }
  ]
})

// 获取当前页数据、点第几页获取第几页数据
const getHasTrademark = async (pager = 1) => {
  pageDate.pageNo = pager
  let res: TrademarkResponseData = await reqHasTrademark(pageDate.pageNo, pageDate.limit)
  if (res.code === 200) {
    pageDate.total = res.data.total
    trademarkArr.value = res.data.records
  }
}

// 修改每页展示几条数据
const handleSizeChange = () => {
  getHasTrademark()
}

// 添加品牌
const addTrademark = async () => {
  // 展示对话框
  dialogVisible.value = true
  // 清空表单内容
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  // 防止用户 点过修改后点添加，导致合并参数时有id
  trademarkParams.id = 0
  // 清空校验规则
  nextTick(() => {
    ruleFormRef.value.resetFields()
  })
}

// 修改品牌
const editTrademark = (row: Trademark) => {
  // 展示对话框
  dialogVisible.value = true
  // 将row内对应数据给trademarkParams
  Object.assign(trademarkParams, row)
  // 清空校验规则
  nextTick(() => {
    ruleFormRef.value.clearValidate('logoUrl')
    ruleFormRef.value.clearValidate('tmName')
  })
}

// 图片上传前检查
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 限制图片类型
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('图片文件不能超过4M')
      return false
    }
  } else {
    ElMessage.error('仅支持上传图片类型的文件')
    return false
  }
}

// 上传图片成功后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // 将图片地址存储
  if (response.code == 200) {
    trademarkParams.logoUrl = response.data
    ElMessage.success('上传成功')
    // 假如有校验提示 则清除
    ruleFormRef.value.clearValidate('logoUrl')
  } else {
    ElMessage.error('上传失败')
  }
}

// 取消按钮
const cancel = () => {
  dialogVisible.value = false
}

// 上传按钮
const upload = async (formEl: FormInstance | undefined) => {
  // 判断节点是否存在
  if (!formEl) return
  // 判断校验是否全部通过
  await formEl.validate()
  let res = await reqAddOrEditTrademark(trademarkParams)
  if (res.code == 200) {
    // 提示添加/修改成功
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
    // 再次获取已有品牌，添加品牌操作则跳转到第1页，修改品牌则在当前页
    getHasTrademark(trademarkParams.id ? pageDate.pageNo : 1)
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失败' : '添加品牌失败')
  }
  // 关闭对话框
  dialogVisible.value = false
}

// 删除品牌
const removeTrademark = async (row: Trademark) => {
  let res = await reqRemoveTrademark(row.id)
  if (res.code == 200) {
    ElMessage.success(`删除品牌 ${row.tmName} 成功`)
  } else {
    ElMessage.error(`删除品牌 ${row.tmName} 失败`)
  }
  // 重新获取最新已有品牌列表
  getHasTrademark(trademarkArr.value.length > 1 ? pageDate.pageNo : pageDate.pageNo - 1)
}

// 组件挂载完毕后
onMounted(() => {
  getHasTrademark()
})



</script>
<script lang="ts">
export default {
  name: 'Trademark',
}
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
