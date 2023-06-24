<template>
  <div class="box6">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="info">
      <span>排名</span>
      <span>景区</span>
      <span>人流量</span>
    </div>
    <div class="main">
      <!-- 名次 -->
      <div class="presence">
        <span v-for="(item, index) in 5" :key="index">No.{{ item }}</span>
      </div>
      <!-- 景区 -->
      <!-- 柱状图 -->
      <div class="charts" ref="charts"></div>
    </div>
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

  // 数据源、景区名
  let data = [70, 34, 60, 78, 69]
  let titlename = ['衡山', '日月潭', '西湖', '长白山', '故宫']
  let valdata = [683, 234, 234, 523, 345]
  let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']

  // 配置项
  let option = {
    // backgroundColor: '#0e2147',
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        // 是否是反向坐标轴。
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bolder',
          // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
          formatter: function (value: string) {
            return [
              value
            ]
          }
        }
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 18,
            color: '#fff'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        type: 'bar',
        name: '条',
        // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
        yAxisIndex: 0,
        data: data,
        barWidth: 18,
        barGap: 0,
        barCategoryGap: '1%',
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: function (params: any) {
              let num = myColor.length
              return myColor[params.dataIndex % num]
            }
          }
        },
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{c}%',
            color: '#fff',
            fontSize: 18
          }
        }
      },
      {
        name: '框',
        type: 'bar',
        yAxisIdnex: 1,
        barGap: '-100%',
        data: [100, 100, 100, 100, 100],
        barWidth: 18,
        itemStyle: {
          normal: {
            color: 'none',
            borderColor: '#00c1de',
            borderWidth: 3,
            barBorderRadius: 15,
          }
        }
      }
    ],
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: -5,
      bottom: 0,
      containLabel: true
    }
  }

  myCharts.setOption(option)
})
</script>

<style scoped lang='scss'>
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px;

  .title {
    color: white;
    font-size: 20px;
    letter-spacing: 5px;
    margin-left: 15px;
  }

  .info {
    background: url(../../images/rankingChart-bg.png) no-repeat;
    background-size: 100% 100%;
    height: 30px;
    width: 95%;
    position: relative;
    top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    left: 10px;

    span {
      color: orange;
      font-size: 20px;
      font-weight: 900;
      font-family: "Gill Sans", sans-serif;
      flex: 1;
    }

    span:nth-last-child(-n+2) {
      margin-left: -100px;
    }

    
  }
  

  .main {
    display: flex;
    flex-direction: row;
    position: relative;
    top: 100px;
    width: 100%;
    height: 100%;

    .presence {
      flex: 1;
      display: flex;
      flex-direction: column;

      span {
        margin: 17px;
        font-size: 20px;
        background: url(../../images/line-bg.png) no-repeat;
        background-size: 80px 80px;
        color: white;
        text-align: center;
        display:block;
      }

      span:nth-child(-n+3){
        color: red;
        font-weight: bold;
      }
    }


    .charts {
      flex: 3;
      height: calc(100% - 150px);
    }

  }


}
</style>