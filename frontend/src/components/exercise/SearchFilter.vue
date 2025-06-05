<template>
  <div class="search-filter">
    <div class="search">
      <label class="filter-conditions">筛选条件</label>
      <select v-model="selectedDifficulty" class="exercise-difficulty">
        <option value="" disabled class="default-option">题目难度</option>
        <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty">
          {{ difficulty }}
        </option>
      </select>
      <select v-model="selectedKnowledgePoint" class="knowledge-point" @change="addKnowledge">
        <option value="" disabled selected class="default-option">知识点</option>
        <option v-for="point in points" :key="point.knowledgeId" :value="point.knowledge">
          {{ point.knowledge }}
        </option>
      </select>

      <label class="keyword">题目关键词</label>
      <div class="search-input-container">
        <input v-model="keyword" type="text" class="input" placeholder="输入内容..." />
        <img src="@/icons/搜索.png" alt="Search" class="search-icon" @click="search" />
      </div>
    </div>
    <div class="selected-conditions">
      <label>已选择条件</label>
      <div class="tags">
        <span v-for="(item, index) in selectedKnowledge" :key="index" class="tag">
          {{ item }} <span class="remove-tag" @click="removeKnowledge(index)">×</span>
        </span>
      </div>
    </div>
    <div class="results">
      <label>共计 {{ resultsCount }} 条结果</label>
      <button @click="clearAll" class="clear-button">
        <img src="@/icons/垃圾桶.png" alt="Clear All" class="clear-icon" />
        清除所有条件
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { knowledgePoint } from './api/knowledge_point';

const emit = defineEmits(['update:filters', 'search']);

const difficulties = ref(['易', '中', '难']);
const points = ref<KnowledgeItem[]>([]);
const selectedDifficulty = ref('');
const selectedKnowledgePoint = ref('');

const keyword = ref('');
const selectedKnowledge = ref<string[]>([]);
const resultsCount = ref(0);
const isLoading = ref(false);

const addKnowledge = () => {
  if (selectedKnowledgePoint.value && !selectedKnowledge.value.includes(selectedKnowledgePoint.value)) {
    selectedKnowledge.value.push(selectedKnowledgePoint.value);
    selectedKnowledgePoint.value = '';
  }
};

const removeKnowledge = (index: number) => {
  selectedKnowledge.value.splice(index, 1);
};

const clearAll = () => {
  selectedDifficulty.value = '';
  selectedKnowledge.value = [];
  keyword.value = '';
  emit('update:filters', { difficulty: '', knowledge: [], keyword: '' });
};

const search = () => {
  const filters = {
    difficulty: selectedDifficulty.value,
    knowledge: selectedKnowledge.value,
    keyword: keyword.value,
  };
  emit('update:filters', filters);
  emit('search');
};

interface KnowledgeItem {
  knowledgeId: number;
  knowledge: string;
}

interface ApiResponse {
  data: KnowledgeItem[];
  code: string;
  message: string;
  resolve: string;
}

onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  isLoading.value = true;
  try {
    const res = await knowledgePoint('some-query');
    points.value = res;
  } catch (err) {
    console.error('Failed to fetch knowledge points:', err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}

.search-filter {
  background-color: #fff;
  /* padding: 5px; */
  padding: 0;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* margin: 20px 20px 10px 20px; */
  margin: 0;
}

.filter-conditions,
.selected-conditions,
.results {
  margin-bottom: 20px;
  font-size: 1vw;
}

.filter-conditions label,
.selected-conditions label,
.results label {
  margin-right: 10px;
  font-weight: bold;
  font-size: 1vw;
  margin-left: 20px;
}

.filter-conditions button {
  padding: 5px 10px;
}

.selected-conditions {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-right: 15px;
  align-items: center;
}

.tag {
  background-color: #e0e0e0;
  color: #000;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 10px;
}

.remove-tag {
  cursor: pointer;
  margin-left: 5px;
  color: #000;
}

.results {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-button {
  background-color: transparent;
  color: #007bff;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}

.clear-button:hover {
  color: #0056b3;
}

.clear-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.clear-icon {
  width: 40px;
  height: 40px;
  margin-right: 2px;
}

.search-input-container {
  position: relative;
  display: inline-block;
  margin-left: 15px;
}

.search-icon {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.exercise-difficulty,
.knowledge-point,
.input {
  color: grey;
  border: 1.8px solid gainsboro;
  background-color: white;
  appearance: none;
  padding: 2px 40px 2px 10px;
  margin-right: 30px;
}

.exercise-difficulty option:disabled,
.knowledge-point option:disabled {
  color: gray;
}

.exercise-difficulty::-ms-expand,
.knowledge-point::-ms-expand {
  display: none;
}

.exercise-difficulty {
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: calc(100% - 5px) center;
  margin-left: 15px;
}

.knowledge-point {
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: calc(100% - 5px) center;
}
</style>
