<template>
  <div class="container">
    <!-- 数据大屏展示区域，画布 -->
    <div class="screen" ref="sceneDom">
      <!-- 数据大屏顶部 -->
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'

// 引入子组件
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Couter from './components/couter/index.vue'

// 画布节点
let sceneDom = ref()

// 定义大屏缩放比例

function getScale(w = 1920, h = 1080) {
  let ww = window.innerWidth / w
  let hh = window.innerHeight / h
  return ww < hh ? ww : hh
}

// 计算视口宽高
let handlerSize = () => {
  if (sceneDom.value) {
    sceneDom.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
  }
}

// 组件挂载完毕后
onMounted(() => {
  handlerSize()
})

// 侦听视口变化
window.addEventListener('resize', handlerSize)
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

  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
        display: flex;
        height: 1040px;
        flex-direction: column;

        .tourist {
          flex: 1.5;
        }

        .age {
          flex: 1;
        }

        .sex {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;

        .map {
          flex: 3;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;

        .rank {
          flex: 1.5;
        }

        .year {
          flex: 1;
        }

        .couter {
          flex: 1;
        }
      }
    }
  }
}
</style>
