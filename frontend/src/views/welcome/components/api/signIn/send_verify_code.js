import axios from 'axios'

function sendVerifyCode(account) {
  const data = JSON.stringify({
    authType: 'email',
    authId: account,
  })

  const config = {
    method: 'post',
    url: 'https://api.xhpolaris.com/meowchat/auth/send_verify_code',
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
    },
    data,
  }

  return axios(config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export { sendVerifyCode }
