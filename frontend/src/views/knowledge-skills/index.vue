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
                style="
                  font-size: 12px;
                  color: #b0bec5;
                  margin-top: 5px;
                  max-width: 120px;
                "
              >
                {{ node.data?.explanation }}
              </div>
            </div>
          </template>
        </RelationGraph>
      </div>

      <!-- 右侧卡片列表展示 -->
      <div
        style="flex: 1; padding: 24px; overflow-y: auto; background: #f9fafb"
      >
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 12px">
          📊 Java Knowledge Graph: Mastery Overview
        </div>
        <div style="font-size: 14px; color: #607d8b; margin-bottom: 20px">
          Each node represents a Java concept. The size of the node indicates
          your mastery level — larger means better.
        </div>

        <!-- 排序后的知识点掌握程度卡片 -->
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div
            v-for="node in sortedNodeList"
            :key="node.id"
            :style="{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              border:
                node.id === selectedNode?.id ? '2px solid #4CAF50' : 'none',
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
              style="
                margin-top: 8px;
                background: #eceff1;
                border-radius: 4px;
                overflow: hidden;
                height: 6px;
              "
            >
              <div
                :style="{
                  width:
                    Math.min(100, Math.round((node.width / 160) * 100)) + '%',
                  height: '100%',
                  background: masteryLevelColor(node.width),
                }"
              />
            </div>
          </div>
        </div>

        <!-- 导出按钮 -->
        <button
          @click="exportPDF"
          style="
            margin-top: 20px;
            padding: 10px 20px;
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 5px;
          "
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
import axios from 'axios'
import { marked } from 'marked'
import html2pdf from 'html2pdf.js'

const graphRef = ref<RelationGraphComponent>()
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
    layoutName: 'center',
    from: 'center',
    min_per_width: 300,
    min_per_height: 200,
  },
  defaultLineColor: '#90A4AE',
  defaultJunctionPoint: 'border',
}
const selectedNode = ref<RGNode | null>(null)
const nodeList = ref<RGNode[]>([])

// 按掌握程度从大到小排序
const sortedNodeList = computed(() =>
  [...nodeList.value].sort((a, b) => (b.width || 0) - (a.width || 0)),
)

// 节点点击事件，右侧卡片高亮
const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
  selectedNode.value = nodeObject
  console.log('onNodeClick:', nodeObject)
}

// 线条点击事件
const onLineClick = (
  lineObject: RGLine,
  linkObject: RGLink,
  $event: RGUserEvent,
) => {
  console.log('onLineClick:', lineObject)
}

/**
 * 调用 ChatGLM 生成 Java 学习建议（Markdown 格式）
 * @param masteryData 字符串，例如 "- OOP: 120/160\n- JVM: 140/160"
 * @returns Markdown 建议内容
 */
const getJavaStudyAdviceFromGLM = async (
  masteryData: string,
): Promise<string> => {
  const prompt = `The following list contains a student's mastery scores on various Java topics (full score: 160). As an expert programming tutor, please:\n\n1. Identify the student's weak areas based on the scores.\n2. Provide targeted study suggestions to improve those areas.\n3. Recommend high-quality learning resources (e.g., LeetCode problems, Java official docs, YouTube/Bilibili videos, etc.)\n4. Format the response in **Markdown**, including clear sections such as: **Mastery Summary**, **Weakness Analysis**, **Personalized Suggestions**, and **Recommended Resources**.\n\n${masteryData}`
  try {
    const res = await axios.post(
      'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      {
        model: 'glm-4-flashx',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 6e5294aa63fa49d186f994c849e1def8.detSDLFawmdzZKV2`,
        },
      },
    )
    return (
      res.data?.choices?.[0]?.message?.content ||
      '⚠️ No content returned from model.'
    )
  } catch (error) {
    console.error('❌ Failed to call ChatGLM:', error)
    return '⚠️ Failed to fetch AI suggestions.'
  }
}

const exportPDF = async () => {
  const studentData = sortedNodeList.value
    .map((node) => `- ${node.text}: ${Math.round(node.width)} / 160`)
    .join('\n')
  const markdownAdvice = await getJavaStudyAdviceFromGLM(studentData)
  const markdown = `# 📘 Java Knowledge Report\n\n## ## 📌 AI-Powered Learning Suggestions:\n\n${markdownAdvice}`
  const html = marked(markdown)
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

// 显示图谱
const showGraph = async () => {
  // 后续改为调用后端接口，后端接口已经写好：http://localhost:8080/graph 算法端是OK的

  const __graph_json_data: RGJsonData = {
    rootId: '1',
    nodes: [
      // Java 编程基础
      { id: '1', text: 'Java Programming', width: 160, height: 160 },
      { id: '2', text: 'OOP', width: 140, height: 140 },
      { id: '3', text: 'Inheritance', width: 120, height: 120 },
      { id: '4', text: 'Polymorphism', width: 100, height: 100 },
      { id: '5', text: 'Encapsulation', width: 130, height: 130 },
      { id: '6', text: 'Abstraction', width: 110, height: 110 },
      { id: '7', text: 'Interfaces', width: 100, height: 100 },

      // 异常处理与集合框架
      { id: '8', text: 'Exception Handling', width: 150, height: 150 },
      { id: '9', text: 'Collections Framework', width: 140, height: 140 },
      { id: '10', text: 'Generics', width: 110, height: 110 },

      // 并发编程与线程
      { id: '11', text: 'Concurrency', width: 90, height: 90 },
      { id: '12', text: 'Multithreading', width: 120, height: 120 },

      // Java 8 特性与新特性
      { id: '13', text: 'Lambda Expressions', width: 130, height: 130 },
      { id: '14', text: 'Streams', width: 120, height: 120 },
      { id: '15', text: 'Optional Class', width: 110, height: 110 },

      // JDK 与 JVM 相关知识
      { id: '16', text: 'JVM', width: 140, height: 140 },
      { id: '17', text: 'Garbage Collection', width: 130, height: 130 },

      // 常见设计模式
      { id: '18', text: 'Singleton Pattern', width: 120, height: 120 },
      { id: '19', text: 'Factory Pattern', width: 120, height: 120 },

      // 其他 Java 基础
      { id: '20', text: 'File I/O', width: 140, height: 140 },
      { id: '21', text: 'Unit Testing', width: 130, height: 130 },
    ],
    lines: [
      // 基本编程与 OOP
      { from: '1', to: '2', text: 'includes' },
      { from: '2', to: '3', text: 'has' },
      { from: '2', to: '4', text: 'supports' },
      { from: '2', to: '5', text: 'supports' },
      { from: '2', to: '6', text: 'supports' },
      { from: '2', to: '7', text: 'has' },

      // 异常处理与文件 I/O
      { from: '1', to: '8', text: 'handles' },
      { from: '1', to: '9', text: 'uses' },
      { from: '9', to: '10', text: 'has' },
      { from: '10', to: '11', text: 'supports' },

      // 并发编程
      { from: '11', to: '12', text: 'includes' },

      // Java 8 新特性
      { from: '13', to: '14', text: 'transforms to' },
      { from: '14', to: '15', text: 'enhances' },

      // JVM 与垃圾回收
      { from: '16', to: '17', text: 'manages' },

      // 设计模式
      { from: '18', to: '19', text: 'implements' },

      // 测试与文件操作
      { from: '20', to: '21', text: 'verifies' },
    ],
  }

  nodeList.value = __graph_json_data.nodes

  const graphInstance = graphRef.value?.getInstance()
  if (graphInstance) {
    await graphInstance.setJsonData(__graph_json_data)
    await graphInstance.moveToCenter()
    await graphInstance.zoomToFit()
  }
}

// 根据掌握程度返回颜色
const masteryLevelColor = (score: number) => {
  if (score >= 140) {
    return '#4CAF50' // 绿色
  } else if (score >= 110) {
    return '#FFC107' // 黄色
  } else {
    return '#EF5350' // 红色
  }
}

// // 导出PDF功能
// const exportPDF = () => {
//   const doc = new jsPDF()

//   // 添加标题
//   doc.setFontSize(22)
//   doc.text('Java Knowledge Mastery Report', 14, 22)

//   // 添加节点信息
//   let y = 30
//   sortedNodeList.value.forEach((node) => {
//     doc.setFontSize(14)
//     doc.text(`${node.text}: ${Math.round(node.width)} / 160`, 14, y)
//     y += 10
//   })

//   // 保存PDF
//   doc.save('knowledge_report.pdf')
// }

onMounted(() => {
  showGraph()
})
</script>

<style scoped lang="scss"></style>
