// src/components/api/review.ts
import  javaRequest  from '@/utils/request';
import type { AxiosResponse } from 'axios';

interface ReviewResponse {
  data: number;          // 评价结果
  code: string;          // 响应码
  message: string;       // 响应消息
  resolve: string | null;// 解析结果
}

// 提交问题评价
export async function reviewQuestion(
  exerciseId: number,
  review: number
): Promise<AxiosResponse<ReviewResponse>> {
  return javaRequest.post('/question/review', null, {
    params: {
      exerciseId: exerciseId,
      review: review,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
