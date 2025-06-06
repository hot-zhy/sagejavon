import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

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

// 获取令牌
const token = localStorage.getItem('user-token') || 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MSwiZGV2aWNlSWQiOiIiLCJleHAiOjE3MjMxMjA3MDcsImlhdCI6MTcyMDUyODcwNywidXNlcklkIjoiNjY1NDJjYWE5YTk2ZTgwNGU1OWU1MjYwIiwid2VjaGF0VXNlck1ldGEiOnt9fQ.FUIJhcCv7em8eHMgZgCM7C9SS19Geigv-g6glSkn0WFqdlSs3Rfmhh-ZH4OPubAIqj0sKqdfu6k0_SnuvzbJOA';

function knowledgePoint(query: string): Promise<KnowledgeItem[]> {
  const config = {
    method: 'get',
    url: 'http://localhost:8080/question/knowledge',
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
      'token': token,  
    },
  };

  return axios(config)
    .then((response: AxiosResponse<KnowledgeResponse>) => {
      // 返回响应数据中的知识点列表
      return response.data.data;
    })
    .catch((error: AxiosError) => {
      console.error('获取知识点信息失败:', error);
      throw error;
    });
}

export { knowledgePoint };
