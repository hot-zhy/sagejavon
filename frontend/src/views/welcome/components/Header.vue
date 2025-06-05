<template>
  <div class="indexHeaderContainer" :class="{ active: active }">
    <div class="headerContent">
      <div class="logoBox">
        <span class="logo"></span>
        <span class="title">SageJavon</span>
      </div>
      <div class="nav">
        <div class="navItem" @click="jumpTop" :class="{
          active: activeTab === 'home'
        }">
          首页
        </div>
        <div class="navItem" @click="useOnline">在线使用</div>
        <div class="navItem" @click="jumpClient" :class="{
          active: activeTab === 'client'
        }">
          客户端
        </div>
        <div class="navItem" @click="jumpHelp">使用文档</div>
        <div class="navItem" @click="goToGitHub">
          Github
        </div>
      </div>
      <div class="simple-nav">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import goToGitHub from './api/goToGitHub';

const router = useRouter()
const active = ref(false)
const activeTab = ref('home')
const clientEl = ref(null)

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  clientEl.value = document.querySelector('.placeholder')
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const onScroll = () => {
  active.value = window.scrollY > 0
  let offsetTop = clientEl.value.offsetTop
  if (window.scrollY + window.innerHeight >= offsetTop && window.scrollY <= offsetTop + clientEl.value.offsetHeight) {
    activeTab.value = 'client'
  } else {
    activeTab.value = 'home'
  }
}

const useOnline = () => {
  router.push('/')
}

const jumpHelp = () => {
  router.push('/help/zh/')
}

const jumpDoc = () => {
  router.push('/doc/zh/')
}

const jumpTop = () => {
  window.scrollTo(0, 0)
}

const jumpClient = () => {
  window.scrollTo(0, clientEl.value.offsetTop - 76)
}
</script>

<style lang="less" scoped>
.indexHeaderContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 76px;
  transition: all 0.2s;
  background-color: rgba(255, 255, 255, 0.48);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  z-index: 99;

  &.active {
    background-color: #fff;
    box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.1);
  }

  .headerContent {
    height: 100%;
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;

    .logoBox {
      display: flex;
      align-items: center;

      .logo {
        width: 22px;
        height: 22px;
        background-image: url('../../../assets/sagejavon.png');
        background-size: cover;
        margin-right: 5px;
      }

      .title {
        color: #000;
        font-size: 20px;
      }
    }

    .nav {
      display: flex;
      align-items: center;

      .navItem {
        color: #828f99;
        font-size: 15px;
        transition: all 0.5s;
        margin-right: 40px;
        cursor: pointer;

        &:last-of-type {
          margin-right: 0;
        }

        &.active {
          color: #FC6868;
        }

        &:hover {
          color: #FC6868;
        }

        a {
          text-decoration: none;
          color: #828f99;

          &:hover {
            color: #FC6868;
          }
        }
      }
    }
  }
}

.simple-nav {
  display: none;
}

@media screen and (max-width: 646px) {
  .indexHeaderContainer .headerContent .nav {
    display: none;
  }

  .simple-nav {
    display: block;
  }
}
</style>
