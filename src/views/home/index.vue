<template>
  <el-card>
    <!-- 欢迎语 -->
    <div class="person">
      <el-avatar shape="circle" :size="100" :src="userStore.avatar" />
      <div class="bottom">
        <h3 class="title">{{ hoursMsg }}呀！{{ userStore.username }}</h3>
        <span class="welcome">欢迎使用{{ setting.projectName }}</span>
      </div>
    </div>
  </el-card>
  <!-- SVG图片 -->
  <div class="svgSolt">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
// 引入pinia、用户相关的小仓库
import { useUserStore } from '@/store/modules/user'

// 引入时间段函数
import useHours from '@/hooks/useHours'

// 引入项目名称
import setting from '@/setting'

// 实例化
let userStore = useUserStore()

// 获取当前时间段文字
let hoursMsg = useHours()
</script>

<script lang="ts">
export default {
  name: 'Home',
}
</script>

<style scoped lang="scss">
.person {
  display: flex;

  .bottom {
    margin-left: 50px;
    line-height: 50px;

    .title{
      font-size: 30px;
      font-weight: 500;
    }

    .welcome {
      font-style: italic;
      color: rgb(35, 152, 199);
    }
  }
}
.svgSolt {
  display: flex;
  justify-content: center;
}
</style>
