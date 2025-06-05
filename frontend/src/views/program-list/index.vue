<template>
	<div>
		这是推荐的代码题列表
		<NButton type="primary" @click="navigateDetail">点击查看代码题详情</NButton>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {NButton} from 'naive-ui'
const router=useRouter()
function navigateDetail () {
	router.push('/program/detail')
}
</script>

<style>

</style>
