<template>
  <div class="question-hover">
    <div v-if="show" class="floating-box">
      <div @click="handleClose" class="close-forever">不再显示</div>
      <div class="content">
        <h3 class="header">We need your feedback.</h3>
        <p v-if="props.index === 0">我们希望了解你对于Java知识问答模块的评估和建议。点击下方按钮参与问卷。</p>
        <p v-if="props.index === 1">我们希望了解你对于Java自适应学习模块的评估和建议。点击下方按钮参与问卷。</p>
        <p v-if="props.index === 2">我们希望了解你对于大模型评分模块的评估和建议。点击下方按钮参与问卷。</p>
        <p v-if="props.index === 3">我们希望了解你对于编程导师模块的评估和建议。点击下方按钮参与问卷。</p>
        <button class="participate-btn" @click="openModal">参与问卷</button>
      </div>
    </div>
    <div v-if="show" class="questionnaire-icon">
      <svg t="1725119288593" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="4324" width="32" height="32">
        <path
          d="M895.946667 734.048l1.066666 1.013333a29.824 29.824 0 0 1 0 43.413334l-162.261333 152.96a31.925333 31.925333 0 0 1-22.762667 8.704 31.925333 31.925333 0 0 1-22.773333-8.704l-93.184-87.84a29.824 29.824 0 0 1 0-43.413334l1.077333-1.013333a32 32 0 0 1 43.904 0l70.976 66.901333 140.053334-132.021333a32 32 0 0 1 43.904 0zM768 85.333333c64.8 0 117.333333 52.533333 117.333333 117.333334v394.666666a32 32 0 0 1-64 0V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h234.666667a32 32 0 0 1 0 64H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334zM554.666667 544a32 32 0 0 1 0 64H341.333333a32 32 0 0 1 0-64z m128-170.666667a32 32 0 0 1 0 64H341.333333a32 32 0 0 1 0-64z"
          fill="#ffffff" p-id="4325"></path>
      </svg>
    </div>
  </div>
  <!-- 模态框 -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>问卷调查</h2>
      <p>请填写以下问卷以帮助我们改进服务：</p>
      <iframe :src="iframeSrc" width='560' height='540' frameborder='0' style='overflow:auto'></iframe>
      <div @click="closeModal" class="modal-close-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M15.449 0.31347C15.031 -0.104491 14.3534 -0.10449 13.9354 0.313471L7.88132 6.36765L2.06458 0.550824C1.64662 0.132863 0.968982 0.132863 0.551027 0.550824C0.133072 0.968785 0.133073 1.64644 0.551028 2.0644L6.36777 7.88122L0.313466 13.9356C-0.104489 14.3536 -0.104489 15.0312 0.313466 15.4492C0.731421 15.8671 1.40906 15.8671 1.82702 15.4492L7.88132 9.3948L14.173 15.6865C14.5909 16.1045 15.2686 16.1045 15.6865 15.6865C16.1045 15.2686 16.1045 14.5909 15.6865 14.173L9.39487 7.88122L15.449 1.82704C15.8669 1.40908 15.8669 0.731432 15.449 0.31347Z"
            fill="#181818" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

// 定义 props 接收 index 参数
const props = defineProps<{
  index: number;
}>();

const show = ref(true);
if (sessionStorage.getItem('questionnaire-show') !== null) {
  show.value = false;
}
const isModalOpen = ref(false);

// 计算 iframe 的 src
const iframeSrc = computed(() => {
  // 根据 index 参数生成 iframe src
  // 这里假设不同 index 对应不同的 URL
  const baseUrls = [
    'https://www.wjx.cn/vm/PBcmk6d.aspx?width=750&source=iframe&s=t', // index 0
    'https://www.wjx.cn/vm/P7HaK0m.aspx?width=750&source=iframe&s=t', // index 1
    'https://www.wjx.cn/vm/mouLxO3.aspx?width=750&source=iframe&s=t', // index 2
    'https://www.wjx.cn/vm/eLDkbEY.aspx?width=750&source=iframe&s=t'
    // 根据实际情况添加更多的 URL
  ];
  return baseUrls[props.index] || baseUrls[0]; // 默认返回第一个 URL
});

const handleClose = () => {
  show.value = false;
  sessionStorage.setItem('questionnaire-show', 'false');
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style lang="less" scoped>
* {
  --shadow: 4px 4px 12px rgba(0, 0, 0, 0.16);
}

.question-hover {
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 16px;
  z-index: 100;
}

.questionnaire-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--theme-orange);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: var(--shadow);

  &:hover {
    background-color: var(--theme-orange-hover);
  }
}

.floating-box {
  display: none;
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 20px 16px 24px;
  box-shadow: var(--shadow);
  z-index: 100;
  width: 320px;
  box-sizing: border-box;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
  }

  h3.header {
    width: 100%;
    text-align: center;
    color: var(--second-text-color);
    letter-spacing: 0.36px;
    font-weight: 400;
    font-size: 16px;
  }

  p {
    margin: 8px 0 12px;
    color: var(--first-text-color);
    text-align: center;
    font-size: 16px;
    letter-spacing: -0.2px;
  }

  .close-forever {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 11px;
    color: var(--third-text-color);
    cursor: pointer;
    text-decoration-line: underline;

    &:hover {
      color: var(--second-text-color);
    }
  }

  button.participate-btn {
    background-color: var(--theme-orange);
    border: none;
    color: white;
    padding: 6px;
    margin-bottom: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
    width: 72%;
    height: 32px;
    border-radius: 16px;

    &:hover {
      background-color: var(--theme-orange-hover);
    }
  }
}

.question-hover:hover .floating-box {
  display: block;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 82vw;
  max-width: 600px;
  max-height: 92vh;
  position: relative;

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 6px;
  }

  p {
    font-size: 16px;
    letter-spacing: 0.8px;
  }

  iframe {
    border: none;
    margin-top: 12px;
  }
}

.modal-close-btn {
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 20px;
}
</style>