import axios from "axios";

function signInByVerifyCode(account, verifyCode) {
  const data = JSON.stringify({
    authType: "email",
    authId: account,
    verifyCode,
    appId: 12138,
  });

  const config = {
    method: "post",
    url: "https://api.xhpolaris.com/meowchat/auth/sign_in",
    headers: {
      "X-Xh-Env": "prod",
      "X-Xh-Lane": "",
      "Content-Type": "application/json",
    },
    data,
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export { signInByVerifyCode };
