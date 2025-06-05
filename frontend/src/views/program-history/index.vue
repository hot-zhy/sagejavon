<template>
	<search-history @update:query="handleSearch"></search-history>
	<div class="full-height">
		<div class="container">
		<div v-if="isLoading" class="loading-placeholder">
			Loading data...
			<!-- You can replace this with a spinner or any loading animation -->
		</div>
		<div v-else>
			<history-list :records="records"></history-list>
		</div>
	</div>
	<div class="sticky-pagination" v-if="!isLoading && records.length > 0">
		<n-pagination v-model:page="currentPage" :page-count="totalPages" show-quick-jumper
			@update:page="handlePaginationChange"></n-pagination>
	</div>
	</div>
</template>

<script setup lang="ts">
import SearchHistory from '@/components/exercise/SearchHistory.vue';
import { ref, onMounted, computed } from 'vue';
import historyList from '@/components/exercise/history-list.vue';
import { recordProgram } from './api/record_program';
import { NPagination } from 'naive-ui';

interface KnowledgeConcept {
	knowledgeId: number;
	knowledge: string;
}


export interface ExerciseRecordList {
	difficulty: number;
	exerciseId: number;
	knowledgeConcept: KnowledgeConcept[];
	questionText: string;
	recordId: number;
	score: number;
	submitTime: string;
	type: number;
}

const records = ref<ExerciseRecordList[]>([]);
const isLoading = ref(false); // Track loading state

const currentPage = ref(1);
const pageSize = 10; // Adjust as per your pagination needs
const pages=ref(10)

onMounted(async () => {
	await fetchData(currentPage.value); // Fetch initial data based on currentPage
});

async function fetchData(pageNum: number) {
	isLoading.value = true; // Set loading state while fetching data
	try {
		const query = {
			pageNum,
			pageSize,
		};
		const response = await recordProgram(query);
		records.value = response.data.data.exerciseRecordList; // Update questions with fetched data
		currentPage.value = pageNum; // Update current page
		pages.value=response.data.data.pages
	} catch (error) {
		console.error('Error fetching questions:', error);
		// Handle error as needed (e.g., show error message to user)
	} finally {
		isLoading.value = false; // Reset loading state
	}
}

function handlePaginationChange(pageNum: number) {
	fetchData(pageNum); // Trigger fetchData when pagination changes
}

// Computed property for total pages
const totalPages = computed(() => pages.value);

</script>



<style lang="scss" scoped>
.full-height {
  height: 100vh; /* Ensure full viewport height */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column; /* Stack children vertically */
  margin-top: -30px;
}

.container {
  flex: 1; /* Take remaining space */
  padding: 20px;
  width: 100vw;
  display: flex;
//   justify-content: flex-start; /* Center content horizontally */
  align-items: flex-start; /* Center content vertically */
  box-sizing: border-box;
}

.sticky-pagination {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #f7f7f7;
  padding: 10px 20px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  /* Ensure pagination is above other content */
}

.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height based on your design */
  font-size: 1.5rem;
  color: #555; /* Placeholder text color */
}
</style>
