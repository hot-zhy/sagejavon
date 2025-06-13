// src/components/api/user.ts
import  javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

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

// 获取个人学习数据的函数
export function fetchPersonStudy(): Promise<PersonStudyData> {
  return javaRequest.get('/homepage', {
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
    }
  })
  .then((response: AxiosResponse<PersonStudyResponse>) => {
    console.log('API Response:', response);
    return response.data.data;
  })
  .catch((error) => {
    console.error('Failed to fetch person study data:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      config: error.config,
      data: error.response?.data,
    });
    throw error;
  });
}
