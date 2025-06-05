<template>
	<search-history @update:query="handleSearch"></search-history>
</template>

<script setup lang="ts">

import SearchHistory from '@/components/exercise/SearchHistory.vue';


</script>

<style lang="scss">
.container {
	background-color: #f7f7f7;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: 0;
	width: 100%;
	height: 100%;
	margin-top:20%;
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

.list-title {
	font-size: 16px;
	color:#555;
	margin-top: 5px;
}
</style>
