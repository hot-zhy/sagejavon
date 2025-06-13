// src/components/api/tutor.ts
import pythonRequest from '@/utils/python-request';
import type { AxiosResponse } from 'axios';

export function fetchProgramTutor(message: string): Promise<AxiosResponse<any>> {
  return pythonRequest.post('/open_kf_api/urls/get_program_tutor', {
    question: message
  });
}
