<template>
	<div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { fetchPersonStudy } from '../api/person-study';
import { useI18n } from 'vue-i18n';  // 引入国际化

const { t } = useI18n();  // 使用t函数获取翻译

const chartRef = ref<HTMLElement | null>(null);
const chartData = ref<{ dates: string[], values: number[] }>({ dates: [], values: [] });

onMounted(async () => {
  try {
    const data = await fetchPersonStudy();
    const dates = Object.keys(data.solveNumbersPerDay).sort();  // Sort dates if needed
    const values = dates.map(date => data.solveNumbersPerDay[date]);
    chartData.value = { dates, values };

    if (chartRef.value) {
      const myChart = echarts.init(chartRef.value);

      const option = {
        xAxis: {
          type: 'category',
          data: chartData.value.dates,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 9,
          interval: 3,
          splitLine: { lineStyle: { type: 'dashed' } }
        },
        grid: {
          top: '10%',
          bottom: '10%',
          left: '10%',
          right: '10%',
          height: '70%',
          width: '80%'
        },
        series: [
          {
            data: chartData.value.values,
            type: 'line',
            showSymbol: false,
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#00FF00' },
                { offset: 0.5, color: '#FFFF00' },
                { offset: 1, color: '#FF0000' }
              ])
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'none' },
          formatter: function (params: any[]) {
            let content = `<div style="padding: 5px 10px; background-color: #fff; border-radius: 5px;">`;
            params.forEach(function (item) {
              content += `${item.axisValue} ${t('completedQuestions', { data: item.data })}`;
              if (item.data >= 5) {
                content += ` ${t('excellent')}`;
              } else if (item.data >= 3) {
                content += ` ${t('goodJob')}`;
              } else if (item.data >= 1) {
                content += ` ${t('keepGoing')}`;
              } else {
                content += ` ${t('dontForget')}`;
              }
              content += `<br>`;
            });
            content += `</div>`;
            return content;
          },
          textStyle: { color: '#000', fontSize: 14, fontFamily: 'Arial' },
          padding: 10
        }
      };

      myChart.setOption(option);

      // Resize chart with window resize
      window.addEventListener('resize', () => {
        myChart.resize();
      });

      // Clean up when component is unmounted
      onUnmounted(() => {
        window.removeEventListener('resize', () => {
          myChart.resize();
        });
        myChart.dispose();
      });
    }
  } catch (error) {
    console.error('Failed to fetch person study data:', error);
  }
});
</script>
