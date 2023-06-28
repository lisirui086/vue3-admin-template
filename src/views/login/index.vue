<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录表单 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="loginRules"
          ref="ruleFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到劲桦运营管理平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-from-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="loading"
              @click="login(ruleFormRef)"
            >
              登录
            </el-button>
          </el-from-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { reactive, ref } from 'vue'

// 引入element-plus图标
import { User, Lock } from '@element-plus/icons-vue'

// 引入User仓库
import { useUserStore } from '@/store/modules/user'

// 引入路由
import { useRouter, useRoute } from 'vue-router'

// 引入element-plus的插件
import { ElNotification } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'

// 引入判断时间段函数
import useHours from '@/hooks/useHours.js'

// 实例化路由
let $router = useRouter()
let $route = useRoute()
let redirect = $route.query.redirect

// 实例化user仓库
let userStore = useUserStore()

const hoursMsg = useHours()

// 收集登录表单的账号密码
let loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})

let ruleFormRef = ref<FormInstance>()

// 自定义校验规则 用户名 密码
const validateUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('用户名长度在5-10个字符间'))
  }
}

const validatePassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码长度在6-10个字符间'))
  }
}

// 登录表单校验规则
const loginRules = reactive<FormRules>({
  username: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassWord, trigger: 'blur' }],
})

// 控制登录按钮是否显示加载中效果 默认不显示
let loading = ref(false)

// 登录按钮回调
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 通知仓库发请求
  // 请求成功 -> 首页展示数据的地方
  // 请求失败 -> 弹出登录失败信息
  await formEl.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    redirect ? $router.push((redirect as string)) : $router.push({path: '/'})
    ElNotification({
      type: 'success',
      title: hoursMsg,
      message: '欢迎回来',
      duration: 1500,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: `${error.message}`,
      duration: 1500,
    })
  } finally {
    loading.value = false
  }
}
</script>

<script lang="ts">
export default {
  name: 'Login',
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
