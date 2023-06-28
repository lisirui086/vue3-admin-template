<template>
  <div class="box9">
    <img
      src="@/assets/images/error_images/404.png"
      alt="抱歉，这个页面已经被外星人绑架了"
    />
    <span>
      抱歉，这个页面已经被外星人绑架了，页面将在{{ num }}秒后跳转至首页
    </span>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 引入路由
import { useRouter } from 'vue-router'

// 定时器和总计时
let timer = null
let num = ref(5)

// 实例化
let $router = useRouter()

// 组件挂载完毕后
onMounted(() => {
  // 定时器
  timer = setInterval(() => {
    num.value--
    if (num.value <= 0) {
      $router.push('/')
    }
  }, 1000)
})

// 组件卸载前
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<script lang="ts">
export default {
  name: 'Notfound',
}
</script>

<style scoped lang="scss">
.box9 {
  height: 100vh;
  width: 100vw;
  background-color: #29fcff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  img {
    width: 800px;
    height: 400px;
    -webkit-user-drag: none;
  }

  span {
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>
