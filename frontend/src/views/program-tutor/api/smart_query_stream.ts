import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

function smartQueryStream(query: string): Promise<AxiosResponse> {
  const data = {
    query,
    user_id: 'a9578288-05d4-4335-8f7e-eb214e9c1efa',
  }

  console.log(data)

  const config = {
    method: 'post',
    url: 'http://127.0.0.1:7000/open_kf_api/queries/smart_query_stream',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJleHAiOjE3MTc3Mzg0Mjl9.o7fh59s5cUZQONB_tSylMWqDIsrc3YJDbzOb0nSjt2g',
    },
    data,
  }

  return axios(config)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      throw error
    })
}

export { smartQueryStream }
