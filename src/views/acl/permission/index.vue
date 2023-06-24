<template>
  <el-card>
    <!-- 菜单表格 -->
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称" prop="name" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button
            @click="addMenu(row)"
            size="small"
            type="primary"
            :disabled="row.level == 4 ? true : false"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            size="small"
            type="info"
            :disabled="row.level == 1 ? true : false"
            @click="editMenu(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            width="220"
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="red"
            :title="`确定要删除${row.name}吗？`"
            @confirm="removeMenu(row)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
                :disabled="row.level == 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 添加|修改菜单项的对话框 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="menuData.id ? `修改${oldOb.oldName}` : '新增'"
    width="450"
  >
    <el-form
      label-width="100"
      :model="menuData"
      :rules="Menurules"
      ref="MenuEl"
    >
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMenu(MenuEl)">
          {{ menuData.id ? '修改' : '添加' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// 引入组合式API
import { onMounted, reactive, ref } from 'vue'

// 引入菜单管理模块相关的api and ts类型
import {
  reqAllPermisstion,
  reqAddOrEditPermisstion,
  reqRemoveMenu,
} from '@/api/acl/menu'
import type {
  MenuResponseData,
  MenuList,
  MenuParams,
  MenuData,
} from '@/api/acl/menu/type'

// 引入element plus 相关的ts
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { nextTick } from 'vue'

// 存储菜单列表
let menuList = ref<MenuList>([])

// 添加|修改菜单项的对话框显示或隐藏
let dialogFormVisible = ref<boolean>(false)

// 收集新增|修改菜单的数据
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})

// 备份数据
let oldOb = reactive<{ oldName: string; oldCode: string }>({
  oldName: '',
  oldCode: '',
})

// 表格节点El
let MenuEl = ref<FormInstance>()

// 校验规则
const Menurules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入职位名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2-10字之间', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入权限值', trigger: 'blur' },
    {
      pattern: /^[0-9a-zA-Z.]{2,50}$/,
      message: '由数字、26个英文字母或者下划线组成,长度在2-50字之间',
      trigger: 'blur',
    },
  ],
})

// 获取菜单列表
const getMenuList = async () => {
  let res: MenuResponseData = await reqAllPermisstion()
  if (res.code == 200) {
    menuList.value = res.data
  }
}

// 备份menuData
const copyMenuData = () => {
  // 存储是否修改值了，没有修改值不发请求
  oldOb = {
    oldName: menuData.name,
    oldCode: menuData.code,
  }
}

// 添加菜单项
const addMenu = (menu: MenuData) => {
  dialogFormVisible.value = true
  // 清空数据
  Object.assign(menuData, {
    code: '',
    level: 0,
    name: '',
    pid: 0,
    id: '',
  })
  // 删除id，防止上次操作时点编辑时保留了id
  delete menuData.id

  // 整理参数
  menuData.level = Number(menu.level + 1)
  menuData.pid = menu.id

  // 备份
  copyMenuData()

  // 清除上次遗留校验提示
  nextTick(() => {
    MenuEl.value.clearValidate('code')
    MenuEl.value.clearValidate('name')
  })
}

// 修改菜单项
const editMenu = (menu: MenuData) => {
  dialogFormVisible.value = true
  // 合并数据
  Object.assign(menuData, menu)

  // 备份
  copyMenuData()

  // 清除上次遗留校验提示
  nextTick(() => {
    MenuEl.value.clearValidate('code')
    MenuEl.value.clearValidate('name')
  })
}

// 保存按钮
const saveMenu = async (formEl: FormInstance | undefined) => {
  // 判断是否全部通过校验
  if (!formEl) return
  await formEl.validate()

  // 没有做修改不让发请求
  if (oldOb.oldCode == menuData.code && oldOb.oldName == menuData.name) {
    ElMessage.warning('请对职位名称或权限值作改动再保存')
  } else {
    let res = await reqAddOrEditPermisstion(menuData)
    switch (res.code) {
      case 200:
        if (menuData.id) {
          ElMessage.success(
            oldOb.oldName !== menuData.name
              ? `${oldOb.oldName}已成功修改为${menuData.name}`
              : `${oldOb.oldCode}已成功修改为${menuData.code}`,
          )
        } else {
          ElMessage.success(`${menuData.name}新增成功`)
        }
        dialogFormVisible.value = false
        getMenuList()
        break
      case 201:
        ElMessage.warning(`${oldOb.oldName}是${res.data}`)
        dialogFormVisible.value = false
        getMenuList()
        break
      default:
        ElMessage.error(
          menuData.id ? `${oldOb.oldName}修改失败` : `${oldOb.oldName}新增失败`,
        )
        break
    }
  }
}

// 删除菜单
const removeMenu = async (menu: MenuData) => {
  let res = await reqRemoveMenu(menu.id)
  switch (res.code) {
    case 200:
      ElMessage.success(`${menu.name}已成功删除`)
      getMenuList()
      break
    case 201:
      ElMessage.warning(`${menu.name}是${res.data}`)
      break
    default:
      ElMessage.warning(`${menu.name}删除失败`)
      break
  }
}

// 组件挂载完毕后
onMounted(() => {
  getMenuList()
})
</script>
<script lang="ts">
export default {
  name: 'Permission',
}
</script>

<style scoped lang="scss"></style>
