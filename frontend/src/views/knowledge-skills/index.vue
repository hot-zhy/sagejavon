<template>
  <div>
    <div style="height: calc(100vh); display: flex">
      <!-- 左侧知识图谱 -->
      <div style="width: 80vw">
        <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          @node-click="onNodeClick"
          @line-click="onLineClick"
        >
          <template #node="{ node }">
            <div
              :style="{
                width: node.width + 'px',
                height: node.height + 'px',
                background: '#2E3A47',
                color: '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '14px',
                boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
                padding: '10px',
              }"
            >
              <strong>{{ node.text }}</strong>
              <div
                style="font-size: 12px; color: #b0bec5; margin-top: 5px; max-width: 120px"
              >
                {{ node.data?.explanation }}
              </div>
            </div>
          </template>
        </RelationGraph>
      </div>

      <!-- 右侧卡片列表展示 -->
      <div style="flex: 1; padding: 24px; overflow-y: auto; background: #f9fafb">
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 12px">
          📊 Java Knowledge Graph: Mastery Overview
        </div>
        <div style="font-size: 14px; color: #607d8b; margin-bottom: 20px">
          Each node represents a Java concept. The size of the node indicates your mastery level — larger means better.
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px">
          <div
            v-for="node in sortedNodeList"
            :key="node.id"
            :style="{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              border: node.id === selectedNode?.id ? '2px solid #4CAF50' : 'none',
            }"
          >
            <div style="font-weight: bold; color: #2e3a47; font-size: 16px">
              🧠 {{ node.text }}
            </div>
            <div style="font-size: 13px; color: #455a64; margin-top: 4px">
              Mastery Score:
              <strong>{{ Math.round((node.width / 160) * 100) }}</strong> / 100
            </div>
            <div
              style="margin-top: 8px; background: #eceff1; border-radius: 4px; overflow: hidden; height: 6px"
            >
              <div
                :style="{
                  width: Math.min(100, Math.round((node.width / 160) * 100)) + '%',
                  height: '100%',
                  background: masteryLevelColor(node.width),
                }"
              />
            </div>
          </div>
        </div>

        <button
          @click="exportPDF"
          style="margin-top: 20px; padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 5px"
        >
          Export Report as PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { jsPDF } from 'jspdf'
import RelationGraph, {
  RGJsonData,
  RGNode,
  RGLine,
  RGLink,
  RGUserEvent,
  RGOptions,
  RelationGraphComponent,
} from 'relation-graph-vue3'
import html2pdf from 'html2pdf.js'
import { marked } from 'marked'
import { fetchKnowledgeGraph } from './api/graph'

const graphRef = ref<RelationGraphComponent>()
const nodeList = ref<RGNode[]>([])
const selectedNode = ref<RGNode | null>(null)

const graphOptions: RGOptions = {
  debug: true,
  defaultNodeBorderWidth: 0,
  defaultNodeColor: '#2E3A47',
  defaultNodeBorderColor: '#90A4AE',
  defaultNodeFontColor: '#ffffff',
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineShape: 1,
  layout: {
    layoutName: 'force',       // ✅ 自动布局模式
    defSpringLen: 180,         // 节点间距
    maxLayoutTimes: 1000,
  },
  defaultLineColor: '#90A4AE',
  defaultJunctionPoint: 'border',
}

const sortedNodeList = computed(() =>
  [...nodeList.value].sort((a, b) => (b.width || 0) - (a.width || 0)),
)

const onNodeClick = (node: RGNode, $event: RGUserEvent) => {
  selectedNode.value = node
}

const onLineClick = (line: RGLine, link: RGLink, $event: RGUserEvent) => {
  console.log('Line clicked:', line)
}

const masteryLevelColor = (score: number) => {
  if (score >= 140) return '#4CAF50'
  else if (score >= 110) return '#FFC107'
  else return '#EF5350'
}

const getJavaStudyAdviceFromGLM = async (masteryData: string): Promise<string> => {
  const prompt = `The following list contains a student's mastery scores on various Java topics (full score: 160)...\n\n${masteryData}`
  try {
    const res = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 6e5294aa63fa49d186f994c849e1def8.detSDLFawmdzZKV2',
      },
      body: JSON.stringify({
        model: 'glm-4-flashx',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false,
      }),
    })
    const result = await res.json()
    return result?.choices?.[0]?.message?.content || '⚠️ No content returned from model.'
  } catch (e) {
    return '⚠️ Failed to fetch AI suggestions.'
  }
}

const exportPDF = async () => {
  const studentData = sortedNodeList.value
    .map((node) => `- ${node.text}: ${Math.round(node.width)} / 160`)
    .join('\n')
  const markdown = await getJavaStudyAdviceFromGLM(studentData)
  const html = marked(`# 📘 Java Knowledge Report\n\n## 📌 AI-Powered Learning Suggestions\n\n${markdown}`)
  const container = document.createElement('div')
  container.innerHTML = html
  container.style.padding = '20px'
  document.body.appendChild(container)

  html2pdf()
    .set({
      margin: 1,
      filename: 'java_learning_report.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    })
    .from(container)
    .save()
    .then(() => document.body.removeChild(container))
}

const showGraph = async () => {
  try {
    const studentId = localStorage.getItem('user-id') || 'demo-student'
    const graphData = await fetchKnowledgeGraph(studentId)

    // 确保每个节点至少有宽高，避免无法显示
    const patchedNodes = graphData.nodes.map((node) => ({
      ...node,
      width: node.width || 140,
      height: node.height || 120,
      x: 0, // force布局可省略
      y: 0,
      data: node.data || {},
    }))

    const jsonData: RGJsonData = {
      rootId: graphData.rootId,
      nodes: patchedNodes,
      lines: graphData.lines,
    }

    nodeList.value = patchedNodes
    const graphInstance = graphRef.value?.getInstance()
    if (graphInstance) {
      await graphInstance.setJsonData(jsonData)
      await graphInstance.moveToCenter()
      await graphInstance.zoomToFit()
    }
  } catch (error) {
    console.error('图谱加载失败：', error)
  }
}

onMounted(() => {
  showGraph()
})
</script>

<style scoped lang="scss"></style>
