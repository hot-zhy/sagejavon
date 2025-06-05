<template>
	<div class="container">
		<div v-if="isLoading" class="loading-placeholder">
			Loading data...
			<!-- You can replace this with a spinner or any loading animation -->
		</div>
		<div v-else>
			<div class="hot-question">
				<!-- <div class="hot-icon">
					<img style="width:30px;" :src="iconHistoryRecord" />
				</div> -->
				<!-- <div class="hot-title">Java基础章节划分</div> -->
				<div class="chapter-container">
					<div class="chapter-items">
						<div class="column">
							<li v-for="(chapter, index) in chapters.slice(0, 7)" :key="index" class="chapter-item"
								@click="goChapter(chapter)">
								{{ chapter }}
							</li>
						</div>
						<div class="column">
							<li v-for="(chapter, index) in chapters.slice(7, 12)" :key="index + 7" class="chapter-item"
								@click="goChapter(chapter)">
								{{ chapter }}
							</li>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { hotChoice } from '../api/hot_question';
import iconHistoryRecord from '../images/history-record.png'
import { NList, NListItem, NThing, NSpace, NTag } from 'naive-ui';
import { useRouter } from 'vue-router';

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

const chapters = ref<string[]>([
	"Java概述",
	"Java环境搭建和程序初体验",
	"java初体验",
	"Java类基础知识",
	"Java常用类",
	"Java异常和异常处理",
	"Java数据结构",
	"Java文件读写",
	"Java案例实践和总结",
	"package、import和classpath",
	"static、final和常量设计",
	"其他",
	"面向对象和类",
]);

const router = useRouter()

const questions = ref<Question[]>([]);
const isLoading = ref(false); // Track loading state

const currentPage = ref(1);
const pageSize = 6; // Adjust as per your pagination needs

onMounted(async () => {
	await fetchData(currentPage.value); // Fetch initial data based on currentPage
});

function goChapter(chapter: string) {
	router.push({
		path: '/chapter/exercise',
		query: { chapter: chapter }
	});
}



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
	width: 100%;
	height: 100%;
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


.chapter-container {
	display: flex;
	/* 使用 Flexbox 创建两列 */
	justify-content: center;
	align-items: center;
	align-content: center;
	justify-items: center;
}

.column {
	margin: 30px 15px;
	/* 调整列间距 */
}

.chapter-items {
	display: flex;
	justify-content: center;
	align-content: center;
	justify-items: center;
	align-items: center;
}

.chapter-item {
	background-color: rgba(255, 255, 255, 0.1);
	color: #ffffff;
	/* 半透明背景 */
	border-radius: 5px;
	/* 圆角 */
	padding: 10px 10px 10px 10px;
	/* 内边距 */
	margin-bottom: 10px;
	/* 列间间距 */
	list-style-type: none;
	/* 去掉点 */
}
</style>
