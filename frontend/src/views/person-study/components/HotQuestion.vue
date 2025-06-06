<template>
	<div class="container">
		<div v-if="isLoading" class="loading-placeholder">
			Loading data...
			<!-- You can replace this with a spinner or any loading animation -->
		</div>
		<div v-else>
			<div class="hot-question">
				<div class="hot-icon">
					<img style="width:30px;" :src="iconHotQuestion" />
				</div>
				<div class="hot-title">{{ t('hot_question') }}</div>
			</div>
			<exercise-list-brief :questions="questions"></exercise-list-brief>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import exerciseListBrief from '@/components/exercise/exercise-list-brief.vue';
import { hotChoice } from '../api/hot_question';
import iconHotQuestion from '../images/hot-question.png'
import { t as globalT } from '@/locales';
const t= globalT

interface KnowledgeConcept {
	knowledgeId: number;
	knowledge: string;
}

interface Question {
	id: string;
	questionText: string;
	knowledgeConcept: KnowledgeConcept[];
	done: string;
	difficulty: string;
	type: number;
}

const questions = ref<Question[]>([]);
const isLoading = ref(false); // Track loading state

const currentPage = ref(1);
const pageSize = 6; // Adjust as per your pagination needs

onMounted(async () => {
	await fetchData(currentPage.value); // Fetch initial data based on currentPage
});

async function fetchData(pageNum: number) {
	isLoading.value = true; // Set loading state while fetching data
	try {
		const query = {
			pageNum,
			pageSize,
			type: 1,
			difficultyOrder: 0
		};
		const response = await hotChoice(query);
		console.log(response)
		questions.value = response.data.data.exerciseList; // Update questions with fetched data
		currentPage.value = pageNum; // Update current page
	} catch (error) {
		console.error('Error fetching questions:', error);
		// Handle error as needed (e.g., show error message to user)
	} finally {
		isLoading.value = false; // Reset loading state
	}
}


</script>
<style lang="scss" scoped>
.container {
	padding: 10px;
	/* Ensure container stretches to full viewport height */
}


.loading-placeholder {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
	/* Adjust height based on your design */
	font-size: 1.5rem;
	color: #555;
	/* Placeholder text color */
}

.hot-question {
	display: flex;
	justify-content: center;
	align-content: center;
	padding: 2px;
}

.hot-title {
	color: #ffffff;
	align-content: center;
	font-size: 24px;
	padding-left: 8px;
}

.hot-icon {
	align-content: center;
}
</style>
