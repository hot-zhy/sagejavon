// src/components/api/knowledge.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

// 知识点项接口
interface KnowledgeItem {
  knowledgeId: number;
  knowledge: string;
}

// API响应数据结构接口
interface KnowledgeResponse {
  data: KnowledgeItem[];
  code: string;
  message: string;
  resolve: string | null;
}

function knowledgePoint(query: string): Promise<KnowledgeItem[]> {
  return javaRequest.get('/question/knowledge', {
    params: { query },
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  })
    .then((response: AxiosResponse<KnowledgeResponse>) => {
      return response.data.data;
    })
    .catch((error: AxiosError) => {
      console.error('获取知识点信息失败:', error);
      throw error;
    });
}

export { knowledgePoint };
