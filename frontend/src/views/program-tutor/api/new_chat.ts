import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

function newChat(): Promise<AxiosResponse> {
  // const data = {
  //   nickname: userInfo.nickname,
  //   portrait: userInfo.portrait,
  //   gender: userInfo.gender === 'female' ? 0 : 1,
  // }

  const config = {
    method: 'post',
    url: 'http://localhost:8080/chat',
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('user-token'),
    },
  }

  return axios(config)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      throw error
    })
}

export { newChat }
