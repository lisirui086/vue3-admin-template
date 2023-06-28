<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="women">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'

// 引入Echarts
import * as echarts from 'echarts'

// 获取画布节点
let charts = ref()

// 组件挂载完毕后
onMounted(() => {
  // 实例化Echarts
  let myCharts = echarts.init(charts.value)

  // 配置myCharts
  myCharts.setOption({
    title: {
      text: '男女比例',
      left: '40%',
      textStyle: {
        color: '#29fcff',
      },
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 200,
        itemStyle: {
          borderRadius: 20,
          color: '#007afe',
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 20,
      right: 20,
      bottom: 0,
      top: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    color: white;
    font-size: 20px;
    letter-spacing: 5px;
    margin-left: 20px;
  }

  .sex {
    display: flex;
    justify-content: center;

    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: center;

    p:first-child {
      color: #007afe;
      margin-right: 40px;
    }

    :nth-child(2) {
      color: #ff4b7a;
      margin-left: 40px;
    }
  }

  .charts {
    height: 100px;
  }
}
</style>
