import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

interface UserInfo {
  nickname: string
  portrait: string
  gender: string
}

function updateUserInfoAPI(userInfo: UserInfo): Promise<AxiosResponse> {
  const data = {
    nickname: userInfo.nickname,
    portrait: userInfo.portrait,
    gender: userInfo.gender === 'female' ? 0 : 1,
  }
  console.log(data)

  const config = {
    method: 'post',
    url: 'http://localhost:8080/information',
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('user-token'),
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

export { updateUserInfoAPI }
