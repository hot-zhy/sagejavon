<template>
	<div class="drag-ball" draggable="true" @dragstart="dragstart($event)" @dragend="dragend($event)"
		:style="`right:${elRight}px;bottom:${elBottom}px`">
		<div style="margin-bottom:20px;">
			<div>
				<div class="chat">遇到什么问题了吗?</div>
			</div>
		</div>
		<img style="margin-left:100px" class="logo" :src="defaultModel" />
	</div>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import defaultModel from '@/assets/sagejavon.png'
import chatModel from '@/assets/chat.png'
 
const startclientX = ref(0); //记录开始的横坐标位置
const startclientY = ref(0); //记录开始的纵坐标位置
const elRight = ref(150); //定位-初始位置
const elBottom = ref(20); //定位-初始位置
// 拖拽开始事件
const dragstart = (e: any) => {
  // 记录拖拽元素初始位置
  startclientX.value = e.clientX;
  startclientY.value = e.clientY;
};
// 拖拽完成事件
const dragend = (e: any) => {
  console.log("eeeeee", e);
  let x = startclientX.value - e.clientX; // 计算偏移量
  let y = startclientY.value - e.clientY;
  elRight.value += x; // 实现拖拽元素随偏移量移动
  elBottom.value += y;
};
</script>
<style scoped lang="scss">
.drag-ball {
  cursor: pointer;
  position: absolute;
  width: 150px;
  border-radius: 23px;
  text-align: center;
  color: #fff;
  line-height: 50px;
}

.chat{
	height: 20px;
}

.logo{
	width:90px;
}

.chat-logo{
	display: flex;
}
</style>