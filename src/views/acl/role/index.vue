<template>
  <SelectKey
    label="职位搜索"
    placeholder="请输入职位"
    v-model:modelValue="keyword"
    @handler-select="searchKeyword"
  ></SelectKey>
  <!-- 表格 -->
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="Plus" @click="addRole">新增职位</el-button>
    <el-table border style="margin: 10px 0" :data="roleList" height="310">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        label="ID"
        align="center"
        width="80"
        prop="id"
      ></el-table-column>
      <el-table-column
        label="职位名称"
        align="center"
        width="150"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="170"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        width="170"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            icon="SetUp"
            size="small"
            @click="setPower(row)"
          >
            分配权限
          </el-button>
          <el-button
            type="info"
            icon="EditPen"
            size="small"
            @click="editRole(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            width="220"
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="#626AEF"
            :title="`确定要删除${row.roleName}吗？`"
            @confirm="removeRole(row)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.limit"
      :page-sizes="[5, 10, 15]"
      background="background"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="pageData.total"
      @current-change="getRoleList"
      @size-change="handlerLimit"
    />
  </el-card>
  <!-- 添加|修改角色的对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="newRole.id ? '修改职位' : '新增职位'"
    width="30%"
  >
    <el-form :rules="rules" ref="ruleFormRef" :model="newRole">
      <el-form-item label="职位名称" prop="roleName">
        <el-input
          v-model.trim.lazy="newRole.roleName"
          placeholder="请输入职位"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRole(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 分配权限的抽屉组件 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <el-tree
        ref="treeEL"
        :data="permisstionList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectArrr"
        :props="TreeProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>取消</el-button>
        <el-button type="primary" @click="savePerisstion">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
// 组合式API
import { onMounted, reactive, ref, nextTick } from 'vue'

// 引入角色管理模块相关api and ts类型
import {
  reqAllRole,
  reqAddOrEditRole,
  reqAllPermisstion,
  reqSetPermisstion,
  reqRemoveRole,
} from '@/api/acl/role/index'
import type {
  AllRoleResponseData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'
import type { NowUserRoleData } from '@/api/acl/user/type'

// element plus 相关的ts类型
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

interface paginationData {
  page: number
  limit: number
  total: number
}

interface newRoleData {
  roleName: string
  id: string | number
  oldRoleName: string
}

// 分页器相关的数据
let pageData = reactive<paginationData>({
  page: 1,
  limit: 5,
  total: 1,
})

// 存储获取到的角色列表
let roleList = ref<NowUserRoleData[]>([])

// 获取搜索栏关键字
let keyword = ref<string>('')

// 控制新增|修改角色对话框显示和隐藏
let dialogVisible = ref<boolean>(false)

// 收集添加|修改职位
let newRole = reactive<newRoleData>({
  roleName: '',
  id: '',
  oldRoleName: '',
})

// 需要校验的节点
let ruleFormRef = ref<FormInstance>()

// 控制分配权限抽屉组件的显示|隐藏
let drawer = ref<boolean>(false)

// 收集职位列表
let permisstionList = ref<MenuList>([])

// 收集被选中的职位
let selectArrr = ref<any>([])

// 树形控件的
let TreeProps = {
  children: 'children',
  label: 'name',
}

// 树形控件的节点
let treeEL = ref<any>()

// 校验规则
const rules = reactive<FormRules>({
  roleName: [
    { required: true, message: '请输入职位名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2-10个字符之间', trigger: 'blur' },
  ],
})

// 获取角色分页列表
const getRoleList = async (pager = 1) => {
  // 默认是获取第一页数据
  pageData.page = pager
  let res: AllRoleResponseData = await reqAllRole(
    pageData.page,
    pageData.limit,
    keyword.value,
  )
  if (res.code == 200) {
    roleList.value = res.data.records
    pageData.total = res.data.total
  }
}

// 每页获取多少条数据
const handlerLimit = () => {
  getRoleList()
}

// 通过职位名称关键词获取相关角色列表
const searchKeyword = () => {
  getRoleList()
}

// 新增职位
const addRole = () => {
  dialogVisible.value = true
  // 清空数据
  Object.assign(newRole, {
    id: '',
    createTime: '',
    updateTime: '',
    roleName: '',
    remark: '',
    oldRoleName: '',
  })
  // 清空校验
  nextTick(() => {
    ruleFormRef.value.clearValidate('roleName')
  })
}

// 修改职位
const editRole = (role: NowUserRoleData) => {
  dialogVisible.value = true
  // 合并数据
  Object.assign(newRole, role)
  newRole.oldRoleName = role.roleName
  // 清空校验
  nextTick(() => {
    ruleFormRef.value.clearValidate('roleName')
  })
}

// 保存角色
const saveRole = async (formEl: FormInstance | undefined) => {
  // 判断校验表单是否存在，是否全部通过校验
  if (!formEl) return
  await formEl.validate()

  // 整理参数
  const { oldRoleName } = newRole
  delete newRole.oldRoleName
  // 发请求，如果老职位名称没变（即为没有修改职位名称，不发请求并提示）
  if (oldRoleName !== newRole.roleName) {
    let res = await reqAddOrEditRole(newRole)
    switch (res.code) {
      case 200:
        ElMessage.success(
          newRole.id
            ? `${oldRoleName}已成功修改为${newRole.roleName}`
            : `${newRole.roleName}新增成功`,
        )
        dialogVisible.value = false
        getRoleList(newRole.id ? pageData.page : 1)
        break
      case 201:
        ElMessage.warning('你的权限不够，不能修改此职位')
        dialogVisible.value = false
        break
      default:
        ElMessage.error(newRole.id ? `修改失败` : `新增失败`)
        break
    }
  } else {
    ElMessage.warning('职位名称无变化')
  }
}

// 分配权限按钮
const setPower = async (role: NowUserRoleData) => {
  drawer.value = true
  Object.assign(newRole, role)
  let res: MenuResponseData = await reqAllPermisstion(role.id as number)
  if (res.code == 200) {
    permisstionList.value = res.data
    selectArrr.value = filterSelectArr(permisstionList.value, [])
  }
}

// 递归获取最后一层被选中的职位
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

// 保存
const savePerisstion = async () => {
  let id = newRole.id
  // 获取子节点
  let childrenArr = treeEL.value.getCheckedKeys()
  let fatherArr = treeEL.value.getHalfCheckedKeys()
  // 合并
  fatherArr.push(...childrenArr)
  let res = await reqSetPermisstion(id as number, fatherArr)
  if (res.code == 200) {
    drawer.value = false
    ElMessage.success('角色分配成功')
    window.location.reload()
  } else {
    ElMessage.error('角色分配失败')
  }
}

// 删除职位
const removeRole = async (role: NowUserRoleData) => {
  let res = await reqRemoveRole(role.id as number)
  switch (res.code) {
    case 200:
      ElMessage.success(`${role.roleName}删除成功`)
      getRoleList(roleList.value.length > 1 ? pageData.page : pageData.page - 1)
      break
    case 201:
      ElMessage.warning(`${role.roleName}是${res.data}`)
      getRoleList(pageData.page)
      break
    default:
      ElMessage.error(`${role.roleName}删除失败`)
      break
  }
}

// 组件挂载完毕后
onMounted(() => {
  getRoleList()
})
</script>
<script lang="ts">
export default {
  name: 'Role',
}
</script>

<style scoped lang="scss"></style>
