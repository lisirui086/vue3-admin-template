<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="total">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- Echarts图形图表的画布 -->
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'

// 引入Echarts、echarts-liquidfill（水球图）
import * as echarts from 'echarts';
import 'echarts-liquidfill'

// 画布节点
let charts = ref()


// 组件挂载完毕后
onMounted(() => {
  // 实例化画布
  let myCharts = echarts.init(charts.value)

  // 设置实例的配置项
  myCharts.setOption({
    // 标题组件
    // X and Y轴组件
    // 系列：决定展示何种图形图表
    series: [{
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      waveAnimation: true,
      animationDuration: 3,
      animationFurationUpdate: 1,
      radius: '80%'
    }],
    // 布局组件
  })
})




// 游客统计
let people = ref('215908人')
</script>

<style scoped lang='scss'>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
      letter-spacing: 10px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png);
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 18px;

      span {
        color: rgb(30, 255, 0);
      }
    }
  }

  .total {
    margin-top: 45px;
    display: flex;
    padding: 10px;

    span {
      flex: 1;
      height: 97px;
      text-align: center;
      line-height: 97px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: $screen-font-color;
      font-size: 40px;
      font-weight: 10px;
      margin: 5px;
    }
  }

  .echarts {
    height: 230px;
  }
}
</style>