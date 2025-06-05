<template>
	<!-- 知识图谱 -->
	<div class="echart-container" ref="echart"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { chartData as rawChartData } from './chartData';
import { masteryToColor } from './utils/masteryToColor';
import type { RawNode, RawEdge } from './types/chartDataType';
import { setNodePosition } from './utils/setNodePosition';

const echart = ref(null)
let echartInstance: echarts.ECharts;

const chartData = setNodePosition(rawChartData)

const initChart = () => {
	echartInstance = echarts.init(echart.value)
	echartInstance.setOption({
		title: {
			text: '知识图谱'
		},
		animationDurationUpdate: 1000,
		animationEasingUpdate: 'quinticInOut',
		series: [
			{
				type: 'graph',
				legendHoverLink: true,
				draggable: true,
				edgeSymbol: ['none', 'arrow'],
				edgeSymbolSize: [0, 8],
				cursor: 'pointer',
				layout: 'none',
				data: chartData.nodes.map((node: RawNode) => {
					return {
						x: node.x,
						y: node.y,
						id: node.id,
						name: node.name,
						symbolSize: 50,
						itemStyle: {
							color: masteryToColor(node.mastery)
						}
					};
				}),
				label: {
					show: true,
					position: 'inside',
					width: 80,
					overflow: 'breakAll',
					ellipsis: '...',
				},
				edges: chartData.edges.map((edge: RawEdge) => {
					return {
						source: edge.source,
						target: edge.target,
					};
				}),
				emphasis: {
					focus: 'none',
				},
				roam: true,
				lineStyle: {
					width: 1,
					curveness: 0,
					opacity: 0.9
				},
			}
		],
		toolbox: {
			show: true,
			orient: 'vertical',
			top: 'auto',
			right: 'auto',
			feature: {
				saveAsImage: {
					type: 'png',
					show: true
				},
				restore: {
					show: true
				},

			}
		}
	}, true);
}

onMounted(() => {
	initChart()
	echartInstance.on('click', (params) => {
		// 此处添加点击事件
		console.log(params)
	})
	// console.log(echartInstance.getOption())
})

window.addEventListener('resize', () => {
	echartInstance?.resize()
})
</script>

<style scoped>
.echart-container {
	margin: 0;
	/* 移除外边距 */
	width: 100%;
	/* 设置宽度为100% */
	height: 100%;
	/* 设置高度为100% */
}
</style>