<template>
  <div>
    <SelectKey
      label="用户名"
      placeholder="请输入搜索姓名关键字"
      v-model:modelValue="keyword"
      @handler-select="searchKeyword"
    ></SelectKey>
    <el-card style="margin: 10px 0">
      <!-- 操作按钮 -->
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button
        :disabled="selectRoleUserList.length ? false : true"
        @click="openMessageBox"
        type="danger"
      >
        批量删除
      </el-button>
      <!-- 用户列表 -->
      <el-table
        @selection-change="handleSelectionChange"
        :data="userList"
        border
        style="margin: 10px auto; width: 100%"
        height="310"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          width="140"
          label="用户名字"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          width="140"
          label="用户昵称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roleName"
          width="100"
          label="用户角色"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          width="166"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          width="166"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="270">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Place"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="info"
              size="small"
              icon="Edit"
              @click="editUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="250"
              :title="`确定要删除${row.username}吗？`"
              @confirm="removeRole(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
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
        :page-sizes="[5, 7, 15]"
        background="background"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="pageData.total"
        @current-change="getUserList"
        @size-change="handlerLimit"
      />

      <!-- 添加 | 修改用户的抽屉组件 -->
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ userAccount.id ? '修改用户信息' : '新增用户信息' }}</h4>
        </template>
        <template #default>
          <el-form :rules="userRules" ref="userFormRef" :model="userAccount">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                v-model.trim.lazy="userAccount.username"
                placeholder="请填写用户姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input
                v-model.trim.lazy="userAccount.name"
                placeholder="请填写用户昵称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              v-if="!userAccount.id"
            >
              <el-input
                v-model.trim.lazy="userAccount.password"
                placeholder="请填写用户密码"
                clearable
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="saveUserAccount(userFormRef)">
              确定
            </el-button>
          </div>
        </template>
      </el-drawer>

      <!-- 分配角色的抽屉组件 -->
      <el-drawer v-model="setRoledrawer">
        <template #header>
          <h4>分配角色</h4>
        </template>
        <template #default>
          <el-form :model="userAccount">
            <el-form-item label="用户姓名">
              <el-input disabled v-model="userAccount.username" />
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox
                v-model="roleCheckAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="nowRoleList"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="(role, index) in roleList"
                  :key="index"
                  :label="role"
                >
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button>cancel</el-button>
            <el-button type="primary" @click="setRoleSave">保存</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { onMounted, reactive, ref } from 'vue'

// 引入权限管理下的用户模块相关的api and ts类型
import {
  reqAllUser,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveSelectUser,
  reqRemoveUser,
} from '@/api/acl/user/index'
import type {
  UserListResponseData,
  UserData,
  UserRoleResponseData,
  allRole,
  nowRole,
  SetRoleData,
} from '@/api/acl/user/type'

// element plus 相关的ts类型
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

import { nextTick } from 'vue'

// 新增|修改用户表单的节点
let userFormRef = ref<FormInstance>()

// 校验规则
let userRules = reactive<FormRules>({
  username: [
    { required: true, message: '请填写用户昵称', trigger: 'blur' },
    { min: 5, max: 10, message: '长度在5-10个字符之间', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请填写用户姓名', trigger: 'blur' },
    { min: 5, max: 10, message: '长度在5-10个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写用户密码', trigger: 'blur' },
    {
      pattern:
        /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,10}$/,
      message:
        '6-10位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种',
      trigger: 'blur',
    },
  ],
})

// 存储分页器相关的数据
interface PageData {
  page: number
  limit: number
  total: number
}
let pageData = reactive<PageData>({
  page: 1,
  limit: 5,
  total: 0,
})

// 用户列表
let userList = ref<UserData[]>([])

// 控制添加|修改用户、分配角色的抽屉组件展开隐藏
let drawer = ref<boolean>(false)
let setRoledrawer = ref<boolean>(false)

// 用户信息
let userAccount = reactive<UserData>({
  username: '',
  name: '',
  password: '',
  /* 占位用, 后期新增| 修改用户按钮切换,
  导致id数据没有被重置, 抽屉内容不对 */
  id: '',
  phone: '',
  roleName: '',
  updateTime: '',
  createTime: '',
})

// 职位全选
let roleCheckAll = ref<boolean>(false)

// 设置不确定状态，仅负责样式控制
let isIndeterminate = ref<boolean>(true)

// 存储某一用户现有的职位
let nowRoleList = ref<nowRole>([])

// 存储所有职位
let roleList = ref<allRole>([])

// 被选中的管理用户列表
let selectRoleUserList = ref<UserData[]>([])

// 收集搜索栏关键词
let keyword = ref<string>('')

// 获取用户列表
const getUserList = async (pager = 1) => {
  // 默认请求第一页数据
  pageData.page = pager
  // 默认不带关键字
  // keyword.value = word
  // 发请求
  let res: UserListResponseData = await reqAllUser(
    pageData.page,
    pageData.limit,
    keyword.value,
  )
  if (res.code == 200) {
    userList.value = res.data.records.map((item: UserData) => {
      // 遍历对象的每一个键值对
      let transformedItem = Object.entries(item).reduce((acc, [key, value]) => {
        // 判断值是否为空
        let transformedValue =
          value !== '' && value !== null ? value : '暂未分配'
        // 将键值对添加到累积的结果中
        acc[key] = transformedValue
        return acc
      }, {})
      return transformedItem
    })
    // userList.value = res.data.records
    pageData.total = res.data.total
  }
}

// 修改一页展示多少条数据
const handlerLimit = () => {
  getUserList()
}

// 添加用户
const addUser = () => {
  // 打开抽屉
  drawer.value = true
  // 清空数据
  Object.assign(userAccount, {
    username: '',
    name: '',
    password: '',
    id: '',
    phone: '',
    roleName: '',
    updateTime: '',
    createTime: '',
  })
  // 重置该表单项，将其值重置为初始值，并移除校验结果
  nextTick(() => {
    userFormRef.value.clearValidate('username')
    userFormRef.value.clearValidate('name')
    userFormRef.value.clearValidate('password')
  })
}

// 修改用户信息
const editUser = (user: UserData) => {
  // 打开抽屉组件
  drawer.value = true
  // 与抽屉表单的数据合并
  Object.assign(userAccount, user)
  // 节点创建完毕后再执行
  nextTick(() => {
    userFormRef.value.clearValidate('username')
    userFormRef.value.clearValidate('name')
  })
}

// 保存按钮
const saveUserAccount = async (formEl: FormInstance | undefined) => {
  // 有无节点
  if (!formEl) return
  // 是否通过全部校验规则
  await formEl.validate()
  /* 通过全部校验规则后发请求
  是否有 userAccount内是否有id
  有id -> 修改 | 无id -> 新增 */
  let res = await reqAddOrUpdateUser(userAccount)
  if (res.code == 200) {
    ElMessage.success(
      userAccount.id
        ? `${userAccount.username},修改成功`
        : `${userAccount.username},创建成功`,
    )
  } else if (res.data == '系统数据，不能操作') {
    ElMessage.error('你的权限不够,不能修改!')
  } else {
    ElMessage.error(
      userAccount.id
        ? `${userAccount.username},修改失败`
        : `${userAccount.username},创建失败`,
    )
  }
  drawer.value = false
  // getUserList(userAccount.id ? pageData.page : 1)
  // 浏览器自动刷新
  window.location.reload()
}

// 分配角色
const setRole = async (user: UserData) => {
  // 合并参数
  Object.assign(userAccount, user)
  // 发请求
  let res: UserRoleResponseData = await reqAllRole(userAccount.id as number)
  if (res.code == 200) {
    nowRoleList.value = res.data.assignRoles
    roleList.value = res.data.allRolesList
    // 开启抽屉组件
    setRoledrawer.value = true
  }
}

// 全选按钮
const handleCheckAllChange = (val: boolean) => {
  nowRoleList.value = val ? roleList.value : []
  isIndeterminate.value = false
}

// 选项组复选框
const handleCheckedCitiesChange = (value: string[]) => {
  // 全选按钮被勾凭已选择的长度等于所有职位的长度
  roleCheckAll.value = value.length === roleList.value.length
  // 已选和所有不相等那就显示不确定样式
  isIndeterminate.value = value.length !== roleList.value.length
}

// 保存按钮
const setRoleSave = async () => {
  // 整理分配的职位数据
  let newRoleList: SetRoleData = {
    userId: userAccount.id as number,
    roleIdList: nowRoleList.value.map((item) => item.id as number),
  }

  let res = await reqSetUserRole(newRoleList)
  if (res.code == 200) {
    ElMessage.success(`${userAccount.username}角色分配成功`)
    getUserList(pageData.page)
    setRoledrawer.value = false
  } else {
    ElMessage.error(`${userAccount.username}角色分配失败`)
  }
}

// 删除某一个管理用户
const removeRole = async (user: UserData) => {
  let res = await reqRemoveUser(user.id as number)
  switch (res.code) {
    case 200:
      ElMessage.success(`${user.username} 删除成功`)
      getUserList(userList.value.length > 1 ? pageData.page : pageData.page - 1)
      break
    case 201:
      ElMessage.warning(`${user.username}是${res.data}`)
      break
    default:
      ElMessage.warning(`${user.username} 删除失败`)
      break
  }
}

// 被选中的管理用户
const handleSelectionChange = (val: UserData[]) => {
  selectRoleUserList.value = val
}

// 打开消息弹框
const openMessageBox = async () => {
  ElMessageBox.confirm('危险操作！批量删除操作不可逆，请再次确认', '警告！', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(async () => {
      let idList: number[] = selectRoleUserList.value.map(
        (item) => item.id as number,
      )
      let result = await reqRemoveSelectUser(idList)
      switch (result.code) {
        case 200:
          ElMessage.success(`删除成功`)
          getUserList(
            userList.value.length > 1 ? pageData.page : pageData.page - 1,
          )
          break
        case 201:
          ElMessage.warning(`${result.data}`)
          break
        default:
          ElMessage.warning(`删除失败`)
          break
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消操作',
      })
    })
}

// 通过搜索栏搜索
const searchKeyword = () => {
  getUserList()
}

// 组件挂载完毕后
onMounted(() => {
  getUserList()
})
</script>
<script lang="ts">
export default {
  name: 'User',
}
</script>

<style scoped lang="scss"></style>
