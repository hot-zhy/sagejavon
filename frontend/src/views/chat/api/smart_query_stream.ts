// src/components/api/rag.ts
import pythonRequest from '@/utils/python-request'
import type { AxiosResponse } from 'axios'

function smartQueryStream(query: string): Promise<AxiosResponse> {
  const data = {
    query,
    user_id: '9ddc73e1-4992-4618-9e58-5bdf57bf3b91',
  }

  return pythonRequest.post('/open_kf_api/queries/smart_query_stream', data)
}

export { smartQueryStream }
