// 密码登录逻辑待完善及测试

import axios from 'axios'

function signInByPassword(account, password) {
  const data = JSON.stringify({
    authType: 'email',
    authId: account,
    password,
    appId: 1,
  })

  const config = {
    method: 'post',
    url: 'https://api.xhpolaris.com/meowchat/auth/sign_in',
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
    },
    data,
  }

  return axios(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export { signInByPassword }
