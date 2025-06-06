<template>
  <div class="login-container">
    <div class="form-box">
      <h2>{{ t(isLogin ? 'login' : 'register') }}</h2>
      <input v-model="account" type="text" :placeholder="t('accountPlaceholder')" />
      <input v-model="password" type="password" :placeholder="t('passwordPlaceholder')" />
      <input
        v-if="!isLogin"
        v-model="confirmPassword"
        type="password"
        :placeholder="t('confirmPasswordPlaceholder')"
      />

      <button @click="isLogin ? handleLogin() : handleRegister()">
        {{ t(isLogin ? 'login' : 'register') }}
      </button>

      <p class="switch-mode">
        <span>{{ t(isLogin ? 'noAccount' : 'hasAccount') }}</span>
        <a @click="toggleMode">{{ t(isLogin ? 'register' : 'login') }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { t } from '@/locales';
import { useMessage } from 'naive-ui';
import { register, login } from './api';

const message = useMessage();
function warning(content: string) {
  message.warning(content, { closable: true, duration: 3000 });
}
function error(content: string) {
  message.error(content, { closable: true, duration: 3000 });
}
function success(content: string) {
  message.success(content, { closable: true, duration: 3000 });
}

const account = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLogin = ref(true);

function toggleMode() {
  isLogin.value = !isLogin.value;
  confirmPassword.value = ''; // 切换时清空确认密码
}

function validateFields() {
  if (!account.value || !password.value) {
    warning(t('fillAllFields'));
    return false;
  }
  if (!isLogin.value && password.value !== confirmPassword.value) {
    warning(t('passwordMismatch'));
    return false;
  }
  return true;
}

async function handleLogin() {
  if (!validateFields()) return;
  try {
    const res = await login(account.value, password.value);
    if (res.status === 200) {
      success(t('loginSuccess'));
      localStorage.setItem('userInfo', JSON.stringify(res));
      localStorage.setItem('user-token', res.data.data.token);
      localStorage.setItem('user-id', res.data.data.id);
      window.location.href = '/';
    } else {
      error(t('loginFailed'));
    }
  } catch (e) {
    error(t('networkError'));
  }
}

async function handleRegister() {
  if (!validateFields()) return;
  try {
    const res = await register(account.value, password.value);
    if (res.status === 200) {
      success(t('registerSuccess'));
      isLogin.value = true;
      password.value = '';
      confirmPassword.value = '';
    } else {
      error(t('registerFailed'));
    }
  } catch (e) {
    error(t('networkError'));
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
.form-box {
  background: white;
  padding: 32px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 12px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #fc6868;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.switch-mode {
  margin-top: 16px;
  font-size: 14px;
}
.switch-mode a {
  color: #fc6868;
  cursor: pointer;
  margin-left: 8px;
}
</style>
