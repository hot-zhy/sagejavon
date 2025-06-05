<template>
    <Transition name="fade">
        <div v-if="isShow" class="inner-container" :style="{ width: `${contentWidth}px` }" ref="contentBox">
            <div class="inner-content">
                <slot></slot>
            </div>
            <div @mousedown="startResize" v-if="!isLast" ref="resizeLine" class="resize-line">
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    isShow: {
        type: Boolean,
        default: true
    },
    isLast: {
        type: Boolean,
        default: false
    },
    maxWidth: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['resize'])

const isResizing = ref(false)
const initLeft = ref(0)
const resizeLine = ref(null)
const contentBox = ref(null)
const contentWidth = defineModel()

function startResize(event) {
    event.preventDefault()
    // console.log(event)
    isResizing.value = true
    initLeft.value = event.target.offsetLeft
    document.addEventListener('mouseup', stopResize)
    document.addEventListener('mousemove', handleResize)
}

function stopResize(event) {
    event.preventDefault()
    isResizing.value = false
    const changeX = event.clientX - initLeft.value
    let newWidth = contentBox.value.offsetWidth + changeX
    newWidth = Math.max(400, Math.min(props.maxWidth, newWidth))
    contentWidth.value = newWidth
    emit('resize')
    resizeLine.value.style.left = '0px'
    document.removeEventListener('mousemove', handleResize)
    document.removeEventListener('mouseup', stopResize)
}

function handleResize(event) {
    event.preventDefault()
    if (isResizing.value) {
        const deltaX = event.clientX - initLeft.value
        resizeLine.value.style.left = deltaX + 'px'
    }
}

</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    --resize-line-color: #06D2FF;
}

.resize-line {
    z-index: 99;
    position: relative;
    width: 2px;
    height: 100%;
    padding: 0 4px;
    background-clip: content-box;
}

.resize-line:hover {
    cursor: col-resize;
    background-color: var(--resize-line-color);
}

.fade-enter-active {
    transition: all 280ms ease;
}

.fade-enter-from {
    transform: scale(0);
    transform-origin: bottom right;
}

.inner-container {
    min-width: 300px;
    height: 100%;
    display: inline-flex !important;
    flex-direction: row;
}

.inner-content {
    width: 100%;
    height: 100%;
}
</style>