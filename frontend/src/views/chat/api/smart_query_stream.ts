// src/components/api/rag.ts
import pythonRequest from '@/utils/python-request'
import type { AxiosResponse } from 'axios'

function smartQueryStream(query: string): Promise<AxiosResponse> {
  const data = {
    query,
    user_id: 'a9578288-05d4-4335-8f7e-eb214e9c1efa',
  }

  return pythonRequest.post('/open_kf_api/queries/smart_query_stream', data)
}

export { smartQueryStream }
