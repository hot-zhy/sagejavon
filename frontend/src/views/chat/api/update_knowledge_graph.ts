// src/components/api/knowledge.ts
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'

/**
 * 更新知识图谱节点宽高（由大模型判断相关知识点）
 * @param studentId 学生 ID
 * @param query 学生提出的问题
 */
function updateKnowledgeNodes(studentId: string, query: string): Promise<AxiosResponse> {
  return request.post('/graph', {
    studentId,
    query
  }, {
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '', // 如需灰度可设置
    }
  })
}

export { updateKnowledgeNodes }
