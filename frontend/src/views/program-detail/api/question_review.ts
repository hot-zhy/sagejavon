// src/components/api/question.ts
import  javaRequest  from '@/utils/request';
import type { AxiosResponse } from 'axios';

interface ReviewResponse {
  data: number;
  code: string;
  message: string;
  resolve: string | null;
}

// 提交问题评价
export async function reviewQuestion(
  exerciseId: number,
  review: number
): Promise<AxiosResponse<ReviewResponse>> {
  return javaRequest.post('/question/review', null, {
    params: {
      exerciseId: exerciseId,
      review: review
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
