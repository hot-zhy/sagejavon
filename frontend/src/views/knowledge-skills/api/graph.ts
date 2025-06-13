// src/api/graph.ts
import axios from '@/utils/request'  // 你自定义封装的 axios 实例

export interface KnowledgeGraphVO {
  rootId: string;
  nodes: {
    id: string;
    text: string;
    width: number;
    height: number;
    data?: { explanation?: string }; // 可选字段
  }[];
  lines: {
    from: string;
    to: string;
    text: string;
  }[];
}

export const fetchKnowledgeGraph = async (studentId: string): Promise<KnowledgeGraphVO> => {
  const response = await axios.get('/graph', {
    params: { studentId },
    headers: {
      token: localStorage.getItem('user-token') || '',
    },
  })

  console.log('📦 后端接口返回数据：', response.data)

  // 注意：这里你原来写了 response.data[0]，但其实 data 是 { code, data, message } 格式
  const actualData = response.data.data
  if (!Array.isArray(actualData) || actualData.length === 0) {
    throw new Error('后端返回数据为空或格式不正确')
  }

  return actualData[0] // ✅ 返回第一个图
}

