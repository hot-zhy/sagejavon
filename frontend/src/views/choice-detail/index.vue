<template>
  <div class="full-height">
    <div class="container">
      <div class="tabs">
        <div @click="activeTab = 'content'" :class="{ active: activeTab === 'content' }" class="circle-flex">
          <div class="circle">
            <svg t="1727006416906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1530" width="200" height="200">
              <path
                d="M755.2 716.8h-512v64h512V716.8z m-256-384h-256v64h256V332.8zM115.2 76.8v896h768V76.8h-768zM819.2 908.8H179.2v-768h640v768z m-225.28-384H243.2V588.8h350.72v-64z"
                fill="#cdcdcd" p-id="1531"></path>
            </svg>
          </div>
          <div @click="activeTab = 'history'" :class="{ active: activeTab === 'history' }" class="title">
            题目内容
          </div>
        </div>
        <div @click="activeTab = 'history'" :class="{ active: activeTab === 'history' }" class="circle-flex">
          <div class="circle">
            <!-- <svg t="1727007113440" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6521" width="200" height="200">
              <path
                d="M511.998 64C264.574 64 64 264.574 64 511.998S264.574 960 511.998 960 960 759.422 960 511.998 759.422 64 511.998 64z m353.851 597.438c-82.215 194.648-306.657 285.794-501.306 203.579S78.749 558.36 160.964 363.711 467.621 77.917 662.27 160.132c168.009 70.963 262.57 250.652 225.926 429.313a383.995 383.995 0 0 1-22.347 71.993z"
                fill="#cdcdcd" p-id="6522"></path>
              <path
                d="M543.311 498.639V256.121c0-17.657-14.314-31.97-31.97-31.97s-31.97 14.314-31.97 31.97v269.005l201.481 201.481c12.485 12.485 32.728 12.485 45.213 0s12.485-32.728 0-45.213L543.311 498.639z"
                fill="#cdcdcd" p-id="6523"></path>
            </svg> -->
          </div>
          <!-- <div class="title">
            历史记录
          </div> -->
        </div>
        <div @click="activeTab = 'solution'" :class="{ active: activeTab === 'solution' }" class="circle-flex">
          <!-- <div class="circle">
            <svg t="1727007243618" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="8443" width="200" height="200">
              <path
                d="M807.4564678 468.81301111A370.17150787 370.17150787 0 1 1 546.41250447 214.10038521l16.66541724-47.79441479A421.0907471 421.0907471 0 0 0 451.90722275 151.44333648C219.54817106 151.44333648 31.25778198 339.7741004 31.25778198 572.09277725s188.29038908 420.64944077 420.64944077 420.64944077 420.64944077-188.33076391 420.64944077-420.64944077c0-42.34569001-6.24964883-83.20877856-17.90764763-121.78834154l-47.19254809 18.5085754z m-335.51863229-66.98278976c7.45150438 0 14.7828232 0.56055293 21.95452059 1.6018481l16.66541725-47.95403624a200.30894452 200.30894452 0 1 0 157.4430764 155.44029679l-47.51366887 18.58838612a150.23194313 150.23194313 0 1 1-148.54934537-127.67649477zM992.74221802 218.62706145H805.57293483V31.25778198L754.61519866 82.81738486v0.24037112L619.08532906 218.62706145h-0.36055666v150.99249234L431.87660997 556.30903373l35.81529524 35.81529524 186.84816243-186.72797686h151.03286719v-0.19999628l0.16056038 0.19999627 135.68949103-135.65005516-0.15962143-0.19999625h0.15962143L992.74221802 218.66743629zM788.0662187 351.75228101h-115.81943866V235.89340647L756.69872792 151.44333648v115.81943866H872.55666352l-84.49044482 84.48950587z"
                p-id="8444" fill="#cdcdcd"></path>
            </svg>
          </div>
          <div class="title">
            正确题解
          </div> -->
        </div>
      </div>
      <div class="content">
        <div class="navigation previous" v-if="activeTab === 'content'">
          <button @click="previousQuestion" class="nav-button">
            <img :src="iconLeftArrow" />
          </button>
        </div>
        <div class="navigation next" v-if="activeTab === 'content'">
          <button @click="nextQuestion" class="nav-button">
            <img :src="iconRightArrow" />
          </button>
        </div>
        <div v-if="activeTab === 'content'" class="content-navigation">
          <!-- 题目加载中 -->
          <div v-if="isLoading" class="editor">
            Loading...
          </div>
          <!-- 题目加载完毕 -->
          <div class="question-detail" v-else-if="choiceDetail">
            <div>
              <div class="sub-section">
                <span class="tag">{{ choiceDetail.difficulty }}</span>
                <span class="knowledge-point" v-for="(
                        knowledge, index
                      ) in choiceDetail.knowledgeConcept" :key="index">
                  <i class="icon-tag"></i> {{ knowledge.knowledge }}
                </span>
              </div>
              <v-md-preview :text="choiceDetail.questionText"></v-md-preview>
              <div class="choices">
                <div :class="{
                  'choices-item': true,
                  'correct-choice':
                    choiceDetail.choice === 'A' &&
                    choiceDetail.score === 1,
                  'wrong-choice':
                    choiceDetail.choice === 'A' &&
                    choiceDetail.score === 0,
                }" @click="submitChoice('A')">
                  <span class="option">A.</span> {{ choiceDetail.choiceA }}
                </div>
                <div :class="{
                  'choices-item': true,
                  'correct-choice':
                    choiceDetail.choice === 'B' &&
                    choiceDetail.score === 1,
                  'wrong-choice':
                    choiceDetail.choice === 'B' &&
                    choiceDetail.score === 0,
                }" @click="submitChoice('B')">
                  <span class="option">B.</span> {{ choiceDetail.choiceB }}
                </div>
                <div :class="{
                  'choices-item': true,
                  'correct-choice':
                    choiceDetail.choice === 'C' &&
                    choiceDetail.score === 1,
                  'wrong-choice':
                    choiceDetail.choice === 'C' &&
                    choiceDetail.score === 0,
                }" @click="submitChoice('C')">
                  <span class="option">C.</span> {{ choiceDetail.choiceC }}
                </div>
                <div :class="{
                  'choices-item': true,
                  'correct-choice':
                    choiceDetail.choice === 'D' &&
                    choiceDetail.score === 1,
                  'wrong-choice':
                    choiceDetail.choice === 'D' &&
                    choiceDetail.score === 0,
                }" @click="submitChoice('D')">
                  <span class="option">D.</span> {{ choiceDetail.choiceD }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-else>没有更多题目了~</div> -->
        </div>
        <!-- <div v-if="activeTab === 'history'">
          <p>这里显示历史记录...</p>
        </div>
        <div v-if="activeTab === 'solution'">
          <p>这里显示正确题解...</p>
        </div> -->
      </div>
    </div>
  </div>
  ​ <!-- 点赞和踩按钮 -->
  <div class="feedback-buttons">
    <button @click="toggleLike" :class="{ liked: isLiked }" class="feedback-button">
      <span class="icon">👍</span>
      <span>推荐的题目很有用~</span>
    </button>
    <button @click="toggleDislike" :class="{ disliked: isDisliked }" class="feedback-button">
      <span class="icon">👎</span>
      <span>不喜欢本道推荐题目</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { choiceDetails } from "./api/choice_detail";
import { questionSelect } from "./api/question_select";
import iconLeftArrow from "./images/left-arrow.png";
import iconRightArrow from "./images/right-arrow.png";
import { reviewQuestion } from './api/question_review';

const route = useRoute();
const router = useRouter();
const questionId = ref(Number(route.query.id));
const activeTab = ref("content");
const choiceDetail = ref<Choice>({
  choiceA: "",
  choiceB: "",
  choiceC: "",
  choiceD: "",
  difficulty: 0,
  id: 0,
  knowledgeConcept: [],
  questionText: "",
  score: 0,
  choice: ""
});
const isLoading = ref(false); // Track loading state

const getChoiceDetail = async (id: any) => {
  isLoading.value = true;
  try {
    const res = await choiceDetails(id);
    // console.log('API Response:', res);
    if (res.status === 200) {
      choiceDetail.value = res.data.data;
      exerciseId.value = choiceDetail.value.id; // 题目数据获取后赋值
    } else {
      console.error('Error response status:', res.status);
    }
  } catch (err) {
    console.error('获取选择题详情失败:', err);
  } finally {
    isLoading.value = false;
  }
};


getChoiceDetail(questionId.value);

export interface Choice {
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  difficulty: number;
  id: number;
  knowledgeConcept: KnowledgeConcept[];
  questionText: string;
  score: number; // Add score property to Choice interface
  choice: string;
}

export interface KnowledgeConcept {
  knowledge: string;
  knowledgeId: number;
}

function submitChoice(choice: string) {
  const request = {
    choice: choice,
    id: questionId.value,
  };

  questionSelect(request)
    .then((response) => {
      console.log("提交成功:", response.data);
      // Update choiceDetail with the received data
      choiceDetail.value.score = response.data.data.score;
      choiceDetail.value.choice = choice;
    })
    .catch((error) => {
      console.error("提交失败:", error);
      // Handle error
    });
}

function previousQuestion() {
  const prevId = getPreviousQuestionId(questionId.value);
  if (prevId) {
    questionId.value = prevId;
    getChoiceDetail(prevId);
    router.push({
      path: "/choice/detail",
      query: { id: prevId },
    });
  }
}

function nextQuestion() {
  const nextId = getNextQuestionId(questionId.value);
  if (nextId) {
    questionId.value = nextId;
    getChoiceDetail(nextId);
    router.push({
      path: "/choice/detail",
      query: { id: nextId },
    });
  }
}

// Dummy functions to get the previous and next question IDs
// Replace these with your actual logic to get the correct IDs
function getPreviousQuestionId(currentId: number) {
  return currentId - 1; // Example logic
}

function getNextQuestionId(currentId: number) {
  return currentId + 1; // Example logic
}

const isLiked = ref(false);
const isDisliked = ref(false);
async function toggleLike() {
  if (isDisliked.value) {
    await submitReview(0); // 先取消踩
    isDisliked.value = false;
  }
  await submitReview(isLiked.value ? 0 : 1); // 点赞或取消点赞
}

async function toggleDislike() {
  if (isLiked.value) {
    await submitReview(0); // 先取消点赞
    isLiked.value = false;
  }
  await submitReview(isDisliked.value ? 0 : -1); // 踩或取消踩
}

const exerciseId = ref<number>(choiceDetail.value.id); // 确保从题目数据中获取 ID

// 提交评价
async function submitReview(reviewType: number) {
  // 检查 exerciseId 是否定义
  if (typeof exerciseId.value === 'undefined' || exerciseId.value === null) {
    console.error("exerciseId is undefined");
    return;
  }
  if (typeof reviewType !== "number") {
    console.error("Invalid reviewType", reviewType);
    return;
  }

  try {
    const response = await reviewQuestion(exerciseId.value.toString(), reviewType);
    console.log(reviewType)
    console.log(exerciseId.value.toString())
    console.log(response)
    if (response && response.status === 200) {
      console.log("评价成功:", response.data);
      if (reviewType === 1) {
        isLiked.value = true;
        isDisliked.value = false;
      } else if (reviewType === -1) {
        isLiked.value = false;
        isDisliked.value = true;
      } else {
        isLiked.value = false;
        isDisliked.value = false;
      }
    } else {
      console.error("评价失败:", response?.data || '未知错误');
    }
  } catch (error) {
    console.error("提交评价失败:", error.message);
  }
}
</script>

<style scoped lang="less">
.full-height {
  overflow-y: scroll;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f7f7f7;

  .container {
    background-color: white;
    border-radius: 10px;
    overflow: scroll;
    height: 90%;
    width: 80%;
    min-width: 560px;
    max-width: 800px;
    min-height: 650px;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;

    .tabs {
      width: 100%;
      height: 35px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0 10px;
      column-gap: 12px;
      background-color: #fafafa;

      .circle-flex {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 4px;
        line-height: 1.5;
        cursor: pointer;

        .circle {
          width: 20px;
          height: 20px;

          svg {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          font-size: 14px;
          transition: background-color 0.3s;
          color: var(--second-text-color);
        }

        &.active {
          .circle svg path {
            fill: var(--theme-orange);
          }

          .title {
            color: var(--first-text-color);
          }
        }
      }

    }

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .content-navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .editor {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d3d1d1;
        }

        .question-detail {
          padding: 0 12px;
          box-sizing: border-box;
          width: 80%;
        }
      }

      .navigation {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &.previous {
          left: 12px;
        }

        &.next {
          right: 12px;
        }

        .nav-button {
          padding: 6px 4px;
          border-radius: 8px;
          background-color: #052350;
          border: none;
          cursor: pointer;
          align-items: center;
          transition: background-color 0.3s;

          &:hover {
            background-color: #b0aeae;
          }
        }
      }
    }
  }
}

.sub-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  /* Adds space between the two elements */

  .tag,
  .knowledge-point {
    background-color: #f5f5f5;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
  }

  .knowledge-point {
    display: flex;
    align-items: center;
    color: var(--second-text-color);

    .icon-tag {
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-right: 5px;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23666" d="M21.41 11.58l-9-9A2 2 0 0010.34 2H4a2 2 0 00-2 2v6.34a2 2 0 00.58 1.42l9 9a2 2 0 002.83 0l6.34-6.34a2 2 0 000-2.83zM6.5 8.5A1.5 1.5 0 118 7a1.5 1.5 0 01-1.5 1.5z"/></svg>') no-repeat center center;
      background-size: contain;
    }
  }
}

.choices {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .choices-item {
    box-sizing: border-box;
    border-radius: 20px;
    padding: 8px;
    padding-left: 12px;
    cursor: pointer;

    &:hover {
      background-color: #f2f1f1;
    }
  }

  .option {
    font-weight: 600;
    margin-right: 10px;
  }

  .correct-choice {
    background: linear-gradient(87.37deg,
        rgb(197, 250, 214) 2.19%,
        rgba(255, 255, 255, 0.2) 15.05%);
    /* Light green for correct choice */
  }

  .wrong-choice {
    background: linear-gradient(87.37deg,
        rgb(255, 213, 211) 2.19%,
        rgba(255, 255, 255, 0.2) 15.05%);
    /* Light red for wrong choice */
  }
}

.feedback-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;

  /* 确保按钮在最上层 */
  .feedback-button {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
      border-color: #ccc;
    }

    .icon {
      margin-right: 8px;
    }

    &.liked {
      border-color: #4caf50;
      color: #4caf50;
    }

    &.disliked {
      border-color: #f44336;
      color: #f44336;
    }
  }
}
</style>
