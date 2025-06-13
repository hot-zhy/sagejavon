// src/components/api/record.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

function codeRecordDetail(recordId: number): Promise<AxiosResponse> {
  return javaRequest.get('/question/code/record/detail', {
    params: { recordId },
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { codeRecordDetail };
