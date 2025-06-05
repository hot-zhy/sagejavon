import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

// 个人学习数据接口
interface PersonStudyData {
  selectNumber: number;
  codeNumber: number;
  latestTime: null | string;
  solveDays: number;
  solveQuestions: number;
  solveNumbersPerDay: { [key: string]: number };
}

// API 响应结构接口
interface PersonStudyResponse {
  data: PersonStudyData;
  code: string;
  message: string;
  resolve: null | string;
}

// 从 localStorage 获取 token，若未设置则使用默认 token
const token = localStorage.getItem('user-token') || 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MSwiZGV2aWNlSWQiIiwiZXhwIjoxNzIzMTIwNzA3LCJpYXQiOjE3MjA1Mjg3MDcsInVzZXJJZCI6IjY2NTQyY2FhOWE5NmU4MDRlNTllNTI2MCIsIndlY2h0VXNlck1ldGEiOnt9fQ.FUIJhcCv7em8eHMgZgCM7C9SS19Geigv-g6glSkn0WFqdlSs3Rfmhh-ZH4OPubAIqj0sKqdfu6k0_SnuvzbJOA';

// 获取个人学习数据的函数
export function fetchPersonStudy(): Promise<PersonStudyData> {
  const config = {
    method: 'get',
    url: 'https://api.xhpolaris.com/sagejavon/homepage',
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
      'token': token,
    },
  };

  return axios(config)
    .then((response: AxiosResponse<PersonStudyResponse>) => {
      console.log('API Response:', response); // 输出整个响应对象
      return response.data.data; // 提取并返回 PersonStudyData
    })
    .catch((error: AxiosError) => {
      console.error('Failed to fetch person study data:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        config: error.config,
        data: error.response?.data
      });
      throw error;
    });
}
