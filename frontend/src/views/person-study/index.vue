<template>
  <div class="person-study-container">
    <QuestionHover :index="1" />
    <div class="card choice-question">
      <MainCard :image="iconSelect" title="选择题" :description="choiceDescription" @click="navigateChoice"></MainCard>
    </div>
    <div class="card code-question">
      <MainCard :image="iconCode" title="代码题" :description="codeDescription" @click="navigateProgram"></MainCard>
    </div>
    <div class="card history" @click="navigateHistory">
      <MainCard :image="iconHistory" title="历史记录" :description="historyDescription"></MainCard>
    </div>
    <div class="card hot-question">
      <HotQuestion />
    </div>
    <div class="card recent-record">
      <HistoryRecord />
    </div>
    <div class="card daily-recommendation" @click="navigateRecommend">
      <DailyRecoCard />
    </div>
    <div class="card statistics">
      <div class="statistics-row">
        <div class="statistics-col-4">
          <div
            style="display: flex; flex-direction: row; column-gap: 0.8rem; align-items: center; justify-content: center;">
            <img class="statistics-img" :src="iconDays" />
            <div class="statistics-text">连续打卡</div>
          </div>
          <div class="statistics-number">{{ solveDays }}</div>
        </div>
        <div class="statistics-col-4">
          <div class="statistics-number">{{ solveQuestions }}</div>
          <div
            style="display: flex; flex-direction: row; column-gap: 0.8rem; align-items: center; justify-content: center;">
            <div class="statistics-text">完成题目</div>
            <img class="statistics-img" :src="iconComplete" />
          </div>
        </div>
      </div>
    </div>
    <div class="card line-chart">
      <Echart />
    </div>
  </div>

</template>

<script setup>
import QuestionHover from '@/components/question-list/QuestionHover.vue'
import { ref, onMounted } from 'vue';
import MainCard from "@/views/person-study/components/MainCard.vue";
import DailyRecoCard from "@/views/person-study/components/DailyRecoCard.vue";
import iconSelect from "./images/select-question.png"
import iconCode from "./images/code-question.png"
import iconHistory from "./images/history.png"
import iconDays from "./images/days.png"
import iconComplete from "./images/complete-exercises.png"
import { useRouter } from 'vue-router'
import Echart from "./components/Echart.vue"
import HotQuestion from "./components/HotQuestion.vue"
import HistoryRecord from "./components/HistoryRecord.vue"
import { fetchPersonStudy } from './api/person-study';

//响应数据初始态 
const choiceDescription = ref('加载中...');
const codeDescription = ref('加载中...');
const historyDescription = ref('加载中...');
const solveDays = ref('加载中...');
const solveQuestions = ref('加载中...');

const router = useRouter()
function navigateProgram() {
  router.push('/program/exercise')
}
function navigateChoice() {
  router.push('/choice/exercise')
}
function navigateRecommend() {
  router.push('/recommend/exercise')
}
//TODO:合并筛选和历史记录
// function navigateHistory () {
//   router.push('/history')
// }
function navigateHistory() {
  router.push('/program/history')
}

onMounted(async () => {
  try {
    const data = await fetchPersonStudy();
    choiceDescription.value = `共收录${data.codeNumber}道选择题`;
    codeDescription.value = `共收录${data.selectNumber}道代码题`;
    historyDescription.value = `共收录${data.solveQuestions}条历史记录`;
    solveDays.value = padNumber(data.solveDays);
    solveQuestions.value = padNumber(data.solveQuestions);
  } catch (error) {
    choiceDescription.value = '数据加载失败';
    codeDescription.value = '数据加载失败';
    historyDescription.value = '数据加载失败';
    solveDays.value = '数据加载失败';
    solveQuestions.value = '数据加载失败';
  }
});

function padNumber(num) {
  const numStr = num.toString();
  if (numStr.length >= 4) {
    return numStr;
  }
  return numStr.padStart(4, '0');
}

</script>

<style scoped>
* {
  --theme-blue: #052350;
  --card-radius: 16px;
  --card-background-color: linear-gradient(108.33deg, #0A368D 0%, #052B75 101.33%);
  --daily-card-background-clolor: linear-gradient(90deg, #074CB5 0%, #0CD089 100%);
}

.person-study-container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(32, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 2rem 2rem;
}

.card {
  background: var(--card-background-color);
  border-radius: var(--card-radius);
  transition: all 0.1s ease-in-out;
}

.card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 4px 4px 12px rgba(5, 38, 137, 0.5);
}

.choice-question,
.code-question,
.history {
  grid-column-start: span 8;
}

.hot-question {
  grid-column: span 8;
  grid-row: span 2;
}

.recent-record {
  grid-column: span 10;
  grid-row: span 2;
}

.daily-recommendation {
  grid-column: span 14;
  background: var(--daily-card-background-clolor);
}

.statistics {
  grid-column: span 7;
}

.line-chart {
  grid-column: span 15;
}

/* 数据统计处 */
.statistics-row {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.statistics-col-4 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.statistics-img {
  width: 40px;
}

.statistics-text {
  font-size: 20px;
  color: #fff;
}

.statistics-number {
  font-family: "Legend";
  font-weight: bold;
  font-size: 36px;
  background: linear-gradient(78.09deg, #1E7AFF -10.56%, #15FFAC 134.74%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2px;
}

@media screen and (max-width: 1354px) {
  .statistics-text {
    display: none;
  }
}

@media screen and (max-width: 900px) {
  .person-study-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
    padding: 2rem 1rem;
  }

  .card {
    display: flex;
    flex-direction: column;
  }

  .card:not(.hot-question, .recent-record) {
    min-height: 240px;
  }

  .statistics-text {
    display: block;
  }
}
</style>
