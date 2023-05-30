<template>
  <div>
    <Category :sceen="sceen" />
    <el-card style="margin: 10px 0;">
      <template v-if="sceen === 0">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性</el-button>
        <!-- 展示属性值列表 -->
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column label="属性名称" width="150" align="center" prop="attrName" />
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin: 0 5px" class="ml-2" type="info" v-for="item in row.attrValueList" :key="item.id">{{
                item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #="{ row, $index }">
              <el-button type="warning" icon="EditPen" size="small" @click="editAttr(row)"></el-button>
              <el-popconfirm :title="`确定要删除 ${row.attrName} `" width="180"  @confirm="deleteAttr(row)">
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 展示 添加/修改 属性值列表 -->
      <template v-if="sceen === 1">
        <el-form inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性值名称" v-model.lazy.trim="attrParams.attrName" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" :disabled="attrParams.attrName ? false : true" @click="addAttrValue">
          添加属性值
        </el-button>
        <el-button @click="cancelAttr">取消</el-button>
        <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column type="index" label="序号" width="80" header-align="center" />
          <el-table-column label="属性值" header-align="center">
            <template #="{ row, $index }">
              <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toText(row, $index)"
                placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
              <el-text v-else @click="toEdit(row, $index)" class="mx-1" type="primary">{{ row.valueName }}</el-text>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #="{ row, $index }">
              <el-button type="danger" size="small" icon="Delete" @click="removeAttr(row, $index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttr" :disabled="disabled ? true : false">保存</el-button>
        <el-button @click="cancelAttrValue">取消</el-button>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { watch, ref, reactive, computed, nextTick, onBeforeUnmount } from 'vue'

// 引入category 小仓库
import { useCategoryStore } from '@/store/modules/category'

// 引入category api 和ts类型
import { reqAttr, reqAddOrEditAttr, reqRemoveAttr } from '@/api/product/attr/index'
import type { AttrResponseData, Attr, attrValueList } from '@/api/product/attr/type'

// Message 消息提示
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()

// 控制显示属性值列表 or 显示添加/修改属性值列表
let sceen = ref<number>(0)

// 收集新增的属性数据
let attrParams = reactive<Attr>({
  // 新增的属性名称
  attrName: '',
  // 新增的属性值数组
  attrValueList: [],
  // 三级分类的ID
  categoryId: '',
  // 代表的是三级分类
  categoryLevel: 3,
})

// 存储属性值数组
let attrArr = ref<Attr[]>([])

// 存储input节点
let inputArr = ref<any[]>([])

// 通过一二三级分类id获取属性值列表
const getAttr = async () => {
  // 解构一二三级分类id
  const { c1Id, c2Id, c3Id } = categoryStore
  // 优化： 防止重选一二级分类id时，发请求
  if (c1Id !== '' && c2Id !== '' && c3Id !== '') {
    let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (res.code == 200) {
      attrArr.value = res.data
    }
  }
}

// 侦听三级分类的id
watch(() => categoryStore.c3Id, () => {
  // 清除当前的属性列表
  attrArr.value = []
  // 获取最新的属性列表
  getAttr()
})

// 添加属性按钮
const addAttr = () => {
  sceen.value = 1

  // 合并参数
  Object.assign(attrParams, {
    // 新增的属性名称
    attrName: '',
    // 新增的属性值数组
    attrValueList: [],
    // 三级分类的ID
    categoryId: categoryStore.c3Id,
    // 代表的是三级分类
    categoryLevel: 3,
  })
}

// 编辑/修改属性按钮
const editAttr = (attr: attrValueList) => {
  sceen.value = 1
  // 将attr的值都存入attrParams内
  // 注意 Object.assign 为 浅拷贝
  // 这里实际上需要深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(attr)))
}

// 添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true // 控制每个属性值的编辑/查看模式
  })

  nextTick(() => {
    // 自动获取焦点
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 取消添加的属性
const cancelAttr = () => {
  sceen.value = 0
}

// 取消添加的属性值
const cancelAttrValue = () => {
  sceen.value = 0
}

// 保存按钮
const saveAttr = async () => {
  let res: AttrResponseData = await reqAddOrEditAttr(attrParams)
  if (res.code == 200) {
    // 切换场景，提示信息，重新获取属性列表
    sceen.value = 0
    ElMessage.success(attrParams.id ? '修改属性值成功' : '添加属性值成功')
    getAttr()
  } else {
    ElMessage.error(attrParams.id ? '修改属性值失败' : '添加属性值失败')
  }
}

// 进入文本模式
const toText = (attr: attrValueList, index: number) => {

  // 清除空属性值
  if (attr.valueName.trim() == '') {
    // 删除空的属性值输入框
    attrParams.attrValueList.splice(index, 1)
    ElMessage.warning('属性值不能为空')
    return
  }

  // 不允许有重复的属性值
  let repeat = attrParams.attrValueList.find(item => {
    // 当前失去焦点的属性值对象从当前数组排除判断
    if (item != attr) {
      return item.valueName === attr.valueName
    }
  })

  if (repeat) {
    // 删除空的属性值输入框
    attrParams.attrValueList.splice(index, 1)
    ElMessage.warning('属性值不能重复')
    return
  }
  attr.flag = false
}

// 进入编辑模式
const toEdit = (attr: attrValueList, index: number) => {
  attr.flag = true
  // 获取焦点
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

// 删除属性值
const removeAttr = (attr: attrValueList, index: number) => {
  attrParams.attrValueList.splice(index, 1)
  ElMessage.success(`属性值：${attr.valueName}删除成功`)
}

// 删除整个属性
const deleteAttr = async (attr: Attr) => {
  let res: any = await reqRemoveAttr(attr.id)
  if (res.code == 200) {
    ElMessage.success(`属性：${attr.attrName} 已被删除`)
    getAttr()
  } else {
    ElMessage.warning(`属性：${attr.attrName} 删除失败`)
  }
}

// 控制保存按钮是否可用
const disabled = computed(() => {
  if (attrParams.attrValueList.length > 0) {
    let res = attrParams.attrValueList.find(attr => {
      return attr.valueName.trim() == ''
    })
    return res
  } else {
    return true
  }
})

// 组件销毁前
onBeforeUnmount(() => {
  // 重置 category 小仓库收集到的抒情
  categoryStore.$reset()
})

</script>
<script lang="ts">
export default {
  name: 'Attr',
}
</script>

<style scoped lang="scss"></style>
