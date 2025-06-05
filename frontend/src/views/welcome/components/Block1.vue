<template>
  <div ref="overlay" class="overlay" v-show="isLogin" @click="cancel"></div>
  <div ref="signInContainer" class="sign-in-container" v-show="isLogin">
    <div class="close-btn" @click="cancel">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M15.449 0.31347C15.031 -0.104491 14.3534 -0.10449 13.9354 0.313471L7.88132 6.36765L2.06458 0.550824C1.64662 0.132863 0.968982 0.132863 0.551027 0.550824C0.133072 0.968785 0.133073 1.64644 0.551028 2.0644L6.36777 7.88122L0.313466 13.9356C-0.104489 14.3536 -0.104489 15.0312 0.313466 15.4492C0.731421 15.8671 1.40906 15.8671 1.82702 15.4492L7.88132 9.3948L14.173 15.6865C14.5909 16.1045 15.2686 16.1045 15.6865 15.6865C16.1045 15.2686 16.1045 14.5909 15.6865 14.173L9.39487 7.88122L15.449 1.82704C15.8669 1.40908 15.8669 0.731432 15.449 0.31347Z"
          fill="#181818" />
      </svg>
    </div>
    <div class="header">Welcome to SageJavon.</div>
    <div class="notice">登录即为同意<a>用户协议</a>与<a>隐私政策</a></div>
    <!-- 登录 -->
    <NInput round size="large" v-model:value="account" type="text" maxlength="40" placeholder="输入邮箱">
      <template #prefix>
        <svg t="1724903266291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4519" width="24" height="24">
          <path
            d="M846.367347 820.244898H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837V287.346939c0-45.97551 37.616327-83.591837 83.591837-83.591837h668.734694c45.97551 0 83.591837 37.616327 83.591837 83.591837v449.306122c0 45.97551-37.616327 83.591837-83.591837 83.591837zM177.632653 245.55102c-22.987755 0-41.795918 18.808163-41.795918 41.795919v449.306122c0 22.987755 18.808163 41.795918 41.795918 41.795919h668.734694c22.987755 0 41.795918-18.808163 41.795918-41.795919V287.346939c0-22.987755-18.808163-41.795918-41.795918-41.795919H177.632653z"
            fill="#8a8a8a" p-id="4520"></path>
          <path
            d="M512 610.742857c-21.420408 0-42.840816-8.359184-59.036735-24.555102L121.730612 254.955102c-8.359184-8.359184-8.359184-21.420408 0-29.779592 8.359184-8.359184 21.420408-8.359184 29.779592 0l331.232653 331.232653c16.195918 16.195918 42.840816 16.195918 59.036735 0l328.620408-328.620408c8.359184-8.359184 21.420408-8.359184 29.779592 0 8.359184 8.359184 8.359184 21.420408 0 29.779592l-328.620408 328.620408c-16.718367 16.718367-38.138776 24.555102-59.559184 24.555102z"
            fill="#8a8a8a" p-id="4521"></path>
        </svg>
        <div style="width: 4px;"></div>
      </template>
    </NInput>
    <NInput round size="large" v-model:value="verifyCode" type="text" maxlength="6" placeholder="输入验证码">
      <template #prefix>
        <svg t="1724903385096" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6457" width="24" height="24">
          <path
            d="M753.845117 371.674021l-17.46272 0 0-83.669608c0-59.275012-22.62837-115.203812-63.715137-157.482731-42.170448-43.394323-99.369172-67.291592-161.058163-67.291592-126.040624 0-224.772276 98.731652-224.772276 224.7733l0 83.669608-16.680914 0c-62.788022 0-113.688295 50.900274-113.688295 113.688295L156.467611 842.961784c0 62.788022 50.900274 113.688295 113.688295 113.688295l483.690234 0c62.788022 0 113.688295-50.900274 113.688295-113.688295L867.534436 485.362316C867.532389 422.574295 816.633139 371.674021 753.845117 371.674021zM328.176344 288.005436c0-102.858646 80.573083-183.432753 183.431729-183.432753 50.423413 0 97.093339 19.447934 131.410935 54.762231 33.547047 34.519188 52.021817 80.214926 52.021817 128.670521l0 83.669608L328.176344 371.675044 328.176344 288.005436zM826.191842 842.961784c0 39.956014-32.390711 72.346725-72.346725 72.346725L270.154883 915.308509c-39.956014 0-72.346725-32.390711-72.346725-72.346725L197.808158 485.362316c0-39.956014 32.390711-72.346725 72.346725-72.346725l483.690234 0c39.956014 0 72.346725 32.390711 72.346725 72.346725L826.191842 842.961784z"
            fill="#8a8a8a" p-id="6458"></path>
          <path
            d="M509.932921 580.446905c-11.416004 0-20.670785 9.254781-20.670785 20.670785l0 109.554138c0 11.414981 9.254781 20.670785 20.670785 20.670785 11.416004 0 20.670785-9.254781 20.670785-20.670785L530.603707 601.116667C530.602683 589.701686 521.348925 580.446905 509.932921 580.446905z"
            fill="#8a8a8a" p-id="6459"></path>
        </svg>
        <div style="width: 4px;"></div>
      </template>
      <template #suffix>
        <button class="get-code-btn" :disabled="countdown > 0" @click="verifyCode_signIn()">
          {{
            countdown > 0
              ? `${countdown} 秒`
              : "获取验证码"
          }}
        </button>
      </template>
    </NInput>
    <div class="button-container">
      <button class="login-button button" @click="signIn(signInType)">
        登录
      </button>
    </div>
  </div>
  <div class="block1Container" :style="{ height: height + 'px' }">
    <div class="placeholder"></div>
    <div class="blockContent">
      <!-- 内容的头部 -->
      <div class="content-header">
        <div class="infoBox">
          <!-- 文字盒子 -->
          <div class="txtBox">
            <div class="txt1">SageJavon</div>
            <div class="txt2">专注于Java知识的一款课程小助手</div>
            <div class="txt3">Java学习，一聊即通</div>
          </div>
          <!-- 按钮盒子 -->
          <div class="btnBox">
            <button class="btn main" @click="useOnline">开始使用SageJavon</button>
            <button class="btn" @click="jumpDoc">使用文档</button>
            <button class="btn" @click="goToGitHub">GitHub</button>
          </div>
        </div>
        <div class="picBox">
          <div class="animation1"></div>
          <div class="animation2"></div>
          <div class="animation3"></div>
          <div class="pic"></div>
        </div>
      </div>
      <!-- 卡片式特性介绍 -->
      <div class="card-container">
        <div v-for="item in cardContent" :key="item.id" class="card">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import goToGitHub from "./api/goToGitHub";

const isLogin = ref(false);
const router = useRouter();
const height = ref(0);
const cardContent = [
  {
    id: 1,
    title: "😁智能聊天对话",
    desc: "基于先进的人工智能技术，为您提供实时互动交流，解答Java学习中的疑惑，让学习更轻松。",
  },
  {
    id: 2,
    title: "😉知识图谱导航",
    desc: "内置完整Java课程知识图谱，帮助您构建系统化学习体系，快速掌握Java编程要点。",
  },
  {
    id: 3,
    title: "🥰个性化学习计划",
    desc: "根据您的做题情况，智能调整学习计划，实现量身定制的学习路径，提高学习效率。",
  },
  {
    id: 4,
    title: "😮代码解释与修复",
    desc: "轻松解析复杂代码，提供专业建议，助您快速定位问题，提升编程技能。",
  },
];
import {
  NButton,
  NConfigProvider,
  NForm,
  NFormItemRow,
  NInput,
  NTabPane,
  NTabs,
  useMessage,
} from "naive-ui";
import { signInByVerifyCode } from "./api/signIn/sign_in_by_verifyCode";
import { signInByPassword } from "./api/signIn/sign_in_by_password";
import { sendVerifyCode } from "./api/signIn/send_verify_code";
import { getUserInfo } from "./api/info/get_user_info";
const themeOverrides = {
  common: {
    primaryColor: "#000",
    primaryColorHover: "#000",
  },
};
const message = useMessage();
const account = ref("");
const password = ref("");
const verifyCode = ref("");
const showVerifyCode = ref(false);
const signInType = ref("verifyCode");
const user = ref(null);
console.log(localStorage.getItem("userInfo"));
// 验证码倒计时
// 在setup中定义一个ref用于存储倒计时剩余时间
const countdown = ref(0);

const overlay = ref(null)
const signInContainer = ref(null)

onMounted(() => {
  window.addEventListener("resize", onResize);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

const onResize = () => {
  height.value = window.innerHeight;
};

const useOnline = () => {
  if (localStorage.getItem("user-token")) {
    router.push("/chat");
  } else {
    isLogin.value = true;
    setTimeout(() => {
      overlay.value.classList.add("overlay-blur");
      signInContainer.value.classList.add("sign-in-appear");
    }, 0);
  }
};

const jumpDoc = () => {
  router.push("/doc/zh/");
};

// 定义一个函数用于启动倒计时
function startCountdown() {
  countdown.value = 60; // 设置倒计时初始值为60秒
  const timer = setInterval(() => {
    countdown.value--; // 每秒减少一秒
    if (countdown.value <= 0) clearInterval(timer); // 当倒计时结束时清除定时器
  }, 1000);
}
// 监听countdown的变化，当倒计时结束时将showVerifyCode设置为true
watch(countdown, (val) => {
  if (val === 0) showVerifyCode.value = true;
});

function warning(content) {
  message.warning(content, { closabale: true, duration: 3e3 });
}

function error(content) {
  message.error(content, { closabale: true, duration: 3e3 });
}

function success(content) {
  message.success(content, { closabale: true, duration: 3e3 });
}

// 注册事件：检查账号是否合法，发送验证码，注册并登录
async function register() {
  const validateResult = __validateAccount(account.value);
  if (validateResult !== "合法") {
    account.value = "";
    // alert(validateResult)
    warning(validateResult);
    return;
  }

  showVerifyCode.value = true;

  sendVerifyCode(account.value)
    .then((res) => {
      // console.log(res)
      if (res.status === 200) showVerifyCode.value = true;
      //   alert('验证码发送失败，请稍后再试')
      else error("验证码发送失败，请稍后再试");
    })
    .catch(() => {
      // console.log(err)
      // alert('验证码发送失败，请稍后再试')
      error("验证码发送失败，请稍后再试");
    });
}

// 通过验证码注册并登录，将user缓存到localStorage
async function registerVerify() {
  const validateResult = __validateVerifyCode(verifyCode.value);
  if (validateResult !== "合法") {
    verifyCode.value = "";
    // alert(validateResult)
    warning(validateResult);
    return;
  }
  signInByVerifyCode(account.value, verifyCode.value)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        user.value = res;
        localStorage.setItem("userInfo", JSON.stringify(res));
        // 登录成功，返回首页
        window.location.href = "/";
      } else {
        // alert('验证码错误，请重新输入')
        error("验证码错误，请重新输入");
      }
    })
    .catch(() => {
      //   console.log(err)
      //   alert('验证码错误，请重新输入')
      error("验证码错误，请重新输入");
    })
    .finally(() => {
      verifyCode.value = "";
    });
}

// 修改发送验证码的函数，使其在发送验证码时启动倒计时
async function verifyCode_signIn() {
  const validateResult = __validateAccount(account.value);
  if (validateResult !== "合法") {
    warning(validateResult);
    return;
  }

  sendVerifyCode(account.value)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        success("验证码发送成功，请注意查收");
        startCountdown(); // 发送验证码成功后启动倒计时
      } else {
        error("您发送的太过频繁，请稍候再试");
      }
    })
    .catch(() => {
      error("验证码发送失败，请稍后再试");
    });
}
// 登录事件：根据登录方式，调用相应的登录函数
async function signIn(type) {
  const validateResult = __validateAccount(account.value);
  if (validateResult !== "合法") {
    account.value = "";
    // alert(validateResult)
    warning(validateResult);
    return;
  }

  let res = null;
  if (type === "verifyCode") {
    const validateResult = __validateVerifyCode(verifyCode.value);
    if (validateResult !== "合法") {
      verifyCode.value = "";
      //   alert(validateResult)
      warning(validateResult);
      return;
    }
    res = signInByVerifyCode(account.value, verifyCode.value);
  }

  res
    .then((res) => {
      // console.log(res);
      if (res.userId) {
        user.value = res;
        localStorage.setItem("user-token", res.accessToken);
        localStorage.setItem("user-id", res.userId);
        getUserInfo()
          .then((userInfoRes) => {
            console.log(userInfoRes);
            if (userInfoRes.status === 200) {
              console.log(userInfoRes.data.data);
              // 在这里处理获取到的用户信息
              localStorage.setItem(
                "userInfo",
                JSON.stringify(userInfoRes.data.data)
              );
            }
          })
          .catch((err) => {
            // 在这里处理获取用户信息失败的情况
            console.log(err);
          });
        // 调用 getUserInfo 获取用户信息
        // 登录成功，返回首页
        router.push("/chat");
      } else {
        //   alert(res.msg)
        error(res.msg);
      }
    })
    .catch(() => {
      // console.log(err)
      // alert('登录失败，请稍后再试')
      error("登录失败，请稍后再试");
    });
}

// 账号的合法性检查：邮箱格式
function __validateAccount(account) {
  let res = "";
  if (account === null || account.trim() === "") res = "请输入账号";

  const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/;
  if (pattern.test(account)) res = "合法";
  else res = "账号格式不正确";

  return res;
}

// 密码的合法性检查：密码长度、是否包含数字、是否包含字母、是否包含特殊字符
function __validatePassword(password) {
  let res = "";
  if (password === null || password.trim() === "") res = "请输入密码";

  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[0-9a-zA-Z\W]{8,20}$/;
  if (pattern.test(password)) res = "合法";
  else res = "密码格式不正确";

  return res;
}

// 验证码的合法性检查：6位数字
function __validateVerifyCode(verifyCode) {
  let res = "";
  if (verifyCode === null || verifyCode.trim() === "") res = "请输入验证码";

  const pattern = /^\d{6}$/;
  if (pattern.test(verifyCode)) res = "合法";
  else res = "验证码格式不正确";

  return res;
}

function cancel() {
  account.value = "";
  verifyCode.value = "";

  user.value = null;
  overlay.value.classList.remove("overlay-blur");
  signInContainer.value.classList.remove("sign-in-appear");
  isLogin.value = false;
}
</script>

<style lang="less" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  backdrop-filter: blur(0px);
  opacity: 0;
  transition: backdrop-filter 320ms ease-out,
    opacity 280ms;
}

.overlay.overlay-blur {
  opacity: 1;
  backdrop-filter: blur(8px);
}

.sign-in-container {
  transition: all 280ms cubic-bezier(0.430, 0.010, 0.000, 1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50vh) scale(0.1);
  z-index: 1000;
  width: 360px;
  height: 400px;
  background-color: rgba(255, 255, 255);
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }

  .header {
    width: 100%;
    text-align: center;
    color: #808080;
    letter-spacing: 0.36px;
    font-weight: 400;
    font-size: 16px;
  }

  .notice {
    position: absolute;
    bottom: 6px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #B3B3B3;
    font-size: 11px;
    letter-spacing: 0.2px;

    a {
      font-size: 11px;
      color: #5390e5;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .get-code-btn {
    position: relative;
    border: 0px;
    font-size: 14px;
    color: #808080;
  }

  .get-code-btn::before {
    content: "|";
    position: absolute;
    left: -25%;
    font-size: 18px;
    color: #D9D9D9;
    pointer-events: none;
  }

  .get-code-btn:hover {
    color: #36AD6A;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .login-button {
      width: 72%;
      background-color: #fa6e2d;
      border: 0px;
      color: white;
    }

    .login-button:hover {
      background-color: #e3672e;
    }

    .button {
      border-radius: 18px;
      padding: 4px 0;
      height: 36px;
    }
  }
}

.sign-in-container.sign-in-appear {
  transform: translate(-50%, -50%) scale(1);
}

.block1Container {
  background-color: #f0f9fa;
  border-radius: 0 0 0 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  .placeholder {
    height: 76px;
    width: 100%;
    margin-bottom: 24px;
    flex-shrink: 0;
  }

  .blockContent {
    width: 100%;
    max-width: 1140px;
    padding: 0 32px 48px;

    .content-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: stretch;

      .infoBox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .txtBox {
          max-width: 524px;

          .txt1 {
            font-family: "Punctuation SC", "Inter", ui-sans-serif, system-ui, "Noto Sans SC", "Heiti SC", "Microsoft YaHei", "DengXian", sans-serif;
            font-weight: 700;
            line-height: 72px;
            font-size: 56px;
            background: linear-gradient(93.62deg, #F37676 4.09%, #FBCD2C 108.47%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .txt2 {
            letter-spacing: 2px;
            font-family: "Punctuation SC", "Inter", ui-sans-serif, system-ui, "Noto Sans SC", "Heiti SC", "Microsoft YaHei", "DengXian", sans-serif;
            font-weight: 700;
            line-height: 64px;
            font-size: 56px;
            color: #3e3e3e;
          }

          .txt3 {
            font-size: 24px;
            line-height: 36px;
            margin-top: 12px;
            color: #656565;
          }
        }

        .btnBox {
          display: flex;
          margin-top: 24px;
          column-gap: 12px;

          .btn {
            height: 40px;
            padding: 0 24px;
            cursor: pointer;
            letter-spacing: 2%;
            color: #fff;
            background-color: var(--theme-orange);
            border: none;
            font-weight: 500;
            font-size: 16px;
            border-radius: 22px;
            transition: all 0.2s;
          }

          .btn:not(.main) {
            color: #474747;
            background-color: #00000012;
          }

          .btn:hover {
            background-color: var(--theme-orange-hover);
          }

          .btn:not(.main):hover {
            background-color: #00000020;
          }

        }
      }

      .picBox {
        position: relative;

        .pic {
          width: 320px;
          height: 300px;
          background-image: url("../../../assets/sagejavon.png");
          background-size: cover;
        }

        .animation1 {
          position: absolute;
          right: -50px;
          bottom: 86px;
          width: 38px;
          height: 38px;
          border: 7px solid #f5828b;
          border-radius: 50%;
          animation-name: zoom1;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          box-shadow: 0 12px 50px 0 rgba(0, 0, 0, 0.14);
        }

        .animation2 {
          position: absolute;
          top: -60px;
          right: 60px;
          border-radius: 50%;
          background-color: #1ea59a;
          box-shadow: 0 20px 30px 0 rgba(48, 61, 114, 0.4);
          width: 25px;
          height: 25px;
          animation: spin 2s infinite alternate;
          bottom: 60px;
        }

        .animation3 {
          border-radius: 50%;
          background-color: #25233a;
          box-shadow: 0 20px 30px 0 rgba(245, 130, 139, 0.4);
          position: absolute;
          width: 25px;
          height: 25px;
          bottom: 50px;
          left: 0px;
          animation: spin 3s infinite alternate;
        }
      }
    }

    .card-container {
      width: 100%;
      margin-top: 64px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;

      .card {
        background-color: #ffffffee;
        min-height: 100px;
        border-radius: 12px;
        color: #3e3e3e;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 16px;

        .card-title {
          letter-spacing: 2%;
          color: #222222;
          font-size: 20px;
          font-weight: 600;
        }

        .card-desc {
          color: #808080;
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
  }
}

@keyframes zoom1 {
  0% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1.5);
  }
}

@keyframes spin {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(32px);
  }
}

@media screen and (max-width: 1346px) {
  .block1Container {
    border-radius: 0;
  }
}

@media screen and (max-width: 856px) {
  .block1Container .blockContent {
    .card-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .content-header {
      flex-direction: column;
      align-items: center;

      .picBox {
        order: 1;
      }

      .infoBox {
        order: 2;
        align-items: center;
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 552px) {
  .block1Container .blockContent {
    .content-header {
      .infoBox {
        .txtBox {

          .txt1,
          .txt2 {
            font-size: 42px;
            line-height: 56px;
          }

          .txt3 {
            font-size: 18px;
            line-height: 24px;
          }
        }

        .btnBox {
          flex-wrap: wrap;
          justify-content: center;
          row-gap: 16px;

          .btn {
            flex-shrink: 0;
          }
        }
      }
    }

    .card-container {
      display: flex;
      flex-direction: column;
    }
  }

}

@media screen and (max-width: 436px) {
  .block1Container .blockContent .content-header {
    .infoBox {
      .txtBox {

        .txt1,
        .txt2 {
          font-size: 36px;
          line-height: 48px;
          letter-spacing: 0;
        }

        .txt3 {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }

    .picBox {
      .pic {
        width: 280px;
        height: 260px;
      }
    }
  }
}
</style>
