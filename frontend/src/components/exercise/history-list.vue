<template>
	<div class="container">
		<div class="question-list">
			<table class="table-class">
				<thead>
					<tr>
						<th>结果</th>
						<th>题目编号</th>
						<th>题目名称</th>
						<th>知识点</th>
						<th >源代码</th>
						<th>提交时间</th>
						<th>难度</th>
						<th>类型</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(record, index) in records" :key="record.exerciseId">
						<td  class="score-cell">
							<div :class="getScoreClass(record.score)" class="score-div">{{record.score}}</div>
						</td>
						<td class="text-ellipsis">{{ record.exerciseId }}</td>
						<td class="text-ellipsis">{{ record.questionText }}</td>
						<td class="knowledge-container">
							<div v-for="point in record.knowledgeConcept" :key="point"
								class="knowledge-point text-ellipsis">
								{{ point.knowledge }}
							</div>
						</td>
						<td>
							<div class="check-source" v-if="record.type!=1" @click="checkSourceCode(record.exerciseId)">查看源码</div>
							<div v-else>无</div>
						</td>
						<td>
							{{ formatTime(record.submitTime)}}
						</td>
						<td :class="difficultyClass(record.difficulty)" class="difficulty text-ellipsis">
							{{ difficultyKind(record.difficulty) }}
						</td>
						<td>
							{{ record.type === 1 ? '选择题' : '代码题' }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<NModal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="答题记录" size="huge" :bordered="false" :segmented="segmented">

			<n-tabs type="segment" animated>
				<n-tab-pane name="chap1" tab="题目">
					<v-md-preview :text="recordDetail.questionText"></v-md-preview>
				</n-tab-pane>
				<n-tab-pane name="chap3" tab="建议">
				<v-md-preview :text="recordDetail.suggestion"></v-md-preview>
				</n-tab-pane>
				<n-tab-pane name="chap2" tab="正确答案">
				<monacoEditor v-model="recordDetail.correctAnswer" :language="language" width="100%" height="300px"
					@editor-mounted="editorMounted"></monacoEditor>
				</n-tab-pane>
			</n-tabs>
		</NModal>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {codeRecordDetail} from './api/code_record_detail';
import { NModal,NTabs,NTabPane } from 'naive-ui';
import monacoEditor from '../../views/program-detail/components/monacoEditor.vue';
const language = ref('java')
const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
	console.log('editor实例加载完成', editor)
}
const bodyStyle = ref({
	width: '700px',
})
const segmented = ref({
	content: 'soft',
	footer: 'soft'
})
const showModal = ref(false)
const router=useRouter()
interface Record {
	exerciseId: string;
	questionText: string;
	knowledgeConcept: {
		knowledgeId: string;
		knowledge: string;
	};
	score: string;
	submitTime: string;
	difficulty: string;
	type: number;
}
const recordDetail=ref({})
function getScoreClass(score: number) {
	if (score === 100) {
	return 'score-100';
	} else if (score === 0) {
	return 'score-0';
	} else {
	return 'score-other';
	}
}
function formatTime(time: string) {
	const event = (new Date(time)).toLocaleDateString()+' '+(new Date(time)).toLocaleTimeString()
	return event
}

function checkSourceCode(id){
	codeRecordDetail(id)
		.then((response) => {
			showModal.value=true
			recordDetail.value=response.data.data

		})
		.catch((error) => {
			console.error('提交失败:', error);
			// Handle error
		});
}
const props = defineProps<{ records: Record[] }>();
const statusClass = (status: string) => {
	return status === '完成' ? 'status-complete' : 'status-pending';
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
.check-source{
	color:#0063D7;
	cursor: pointer;
	
}
.check-source:hover{
	cursor:pointer
}
.score-cell {
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: bold;
}

.score-div{
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	color: white;
	font-weight: bold;
}

.score-100 {
  background-color: #49B812;

}

.score-0 {
  background: #E81609;
}

.score-other {
  background: #EEB900;
  color: white;
}
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
	background-color: #ffffff;
	box-shadow: 4px 4px 16px 0px #00000014;
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
	background-color: #f5f5f5;
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
