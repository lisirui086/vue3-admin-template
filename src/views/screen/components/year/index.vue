<template>
  <div class="box7">
    <div class="title">
      <p>年度游客量对比</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'

// 引入Echarts
import * as echarts from 'echarts'

// 画布节点
let charts = ref()

// 组件挂载完毕后
onMounted(() => {
  // 实例化
  let myCharts = echarts.init(charts.value)

  // 配置项
  let option = {
    // 标题组件
    title: {
      text: '散点图',
      left: '40%',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 20,
      right: 20,
      top: 0,
      bottom: 20,
    },
    series: {
      type: 'scatter',
      data: [33, 88, 44, 25, 46, 37, 15],
      symbol: 'diamond',
      symbolSize: 18,
      label: {
        show: true,
        position: 'top',
        color: 'white',
      },
    },
  }

  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .title {
    color: white;
    font-size: 20px;
    letter-spacing: 5px;
    margin-left: 20px;
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
