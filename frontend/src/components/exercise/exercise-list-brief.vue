<template>
	<div class="container">
		<div class="question-list">
			<table class="table-class">
				<thead>
					<tr>
						<th>{{ t('questionNumber') }}</th>
						<th>{{ t('questionName') }}</th>
						<th>{{ t('difficulty') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(question, index) in questions" :key="question.id"
						@click="exerciseDetail(question.id, question.type)">
						<td class="text-ellipsis">{{ question.id }}</td>
						<td class="text-ellipsis">{{ question.questionText }}</td>
						<td :class="[difficultyClass(question.difficulty), 'difficulty', 'text-ellipsis']">
    						{{ difficultyKind(question.difficulty) }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import {t as globalT} from '@/locales'
const t = globalT
const router=useRouter()

interface Question {
	id: string;
	name: string;
	difficulty: string;
}

const props = defineProps<{ questions: Question[] }>();

const statusClass = (status: number) => {
	return status === 1 ? 'status-complete' : 'status-pending';
};

const difficultyClass = (difficulty: number) => {
	switch (difficulty) {
		case 3:
			return 'difficulty-ss';
		case 2:
			return 'difficulty-a';
		case 1:
			return 'difficulty-b';
		case 0:
			return 'difficulty-c';
		default:
			return '';
	}
};

const difficultyKind = (difficulty: number) => {
	switch (difficulty) {
		case 3:
			return 'SS';
		case 2:
			return 'A';
		case 1:
			return 'B';
		case 0:
			return 'C';
		default:
			return '';
	}
};

function exerciseDetail(id: number, type: number) {
	console.log(id)
	console.log(type)
	if (type === 0) {
		// 代码题
		router.push({
			path: '/program/detail',
			query: { id: id } // 使用 query 参数传递 id
		});
	}else{
		router.push({
			path:'/choice/detail',
			query: { id: id }
		})
	}

}
</script>

<style scoped>
.container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.question-list {
	width: 100%;
}

.question-list table {
	width: 100%;
	border-collapse: collapse;
	border-radius: 10px;
	overflow: hidden;
	color:#ffffff;
	/* box-shadow: 4px 4px 16px 0px #00000014; */
}

.question-list th,
.question-list td {
	padding: 8px;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.question-list th {
	border-bottom: 2px solid #ddd;
}

.question-list tbody tr:hover {
	background: #FFFFFF4D;
	cursor: pointer;
}

.first-row td {
	border-bottom: 1px solid #ddd;
}

.knowledge-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.knowledge-point {
	background-color: #f0f0f0;
	padding: 2px 4px;
	margin: 2px;
	display: inline-block;
	border-radius: 4px;
	max-width: 100px;
}

.status-complete {
	width: 24px;
	height: 24px;
	background-color: green;
	border-radius: 50%;
	display: inline-block;
	position: relative;
}

.status-complete:after {
	content: '';
	width: 5px;
	height: 10px;
	border: solid white;
	border-width: 0 2px 2px 0;
	display: inline-block;
	position: absolute;
	top: 5px;
	left: 9.5px;
	transform: rotate(45deg);
}

.status-pending {
	width: 24px;
	height: 24px;
	border: 2px solid green;
	border-radius: 50%;
	display: inline-block;
}

.difficulty-ss {
	color: red;
	font-weight: bold;
}

.difficulty-a {
	color: orange;
	font-weight: bold;
}

.difficulty-b {
	color: blue;
	font-weight: bold;
}

.difficulty-c {
	color: green;
	font-weight: bold;
}

.status {
	font-size: 20px;
	color: #00aaff;
}

.difficulty {
	font-size: 18px;
}

.text-ellipsis {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100px;
}
</style>
