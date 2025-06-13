// src/components/api/user.ts
import javaRequest from '@/utils/request'
import type { AxiosResponse } from 'axios'

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

  return javaRequest.post('/information', data, {
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': ''
    }
  })
}

export default updateUserInfoAPI
