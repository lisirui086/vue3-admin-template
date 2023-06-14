<template>
  <div class="container">
    <!-- 数据大屏展示区域，画布 -->
    <div class="screen" ref="sceneDom">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">左侧</div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'

// 引入子组件
import Top from './components/top/index.vue'

// 画布节点
let sceneDom = ref()

// 定义大屏缩放比例

function getScale(w = 1920, h = 1080) {
  let ww = window.innerWidth / w
  let hh = window.innerHeight / h
  return ww < hh ? ww : hh
}

// 组件挂载完毕后
onMounted(() => {
  sceneDom.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 侦听视口变化
window.onresize = () => {
  sceneDom.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

</script>
<script lang="ts">
export default {
  name: 'Screen',
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    // 基点
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .left {
        flex: 1;
      }
      .center {
        flex: 2;
      }

      .right {
        flex: 1;
      }
    }
  }
}
</style>
