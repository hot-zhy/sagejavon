<template>
  <div class="main-card">
    <img class="icon" :src="image" alt="image">
    <div class="main-card-content">
      <h2 class="title">{{ title }}</h2>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import defaultImage from '../images/code-question.png'

defineProps({
  image: {
    type: String,
    default: defaultImage
  },
  title: {
    type: String,
    default: '代码题'
  },
  description: {
    type: String,
    default: '共收录1,200道题目'
  }
})
</script>

<style scoped>
* {
  --icon-size: 6.2rem;
  --main-card-title-font-size: 2.2rem;
  --main-card-description-font-size: 1rem;
  /* 禁止文本选择 */
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE10+/Edge */
  user-select: none;
  /* Standard */
}

.main-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
}

.icon {
  width: var(--icon-size);
  height: var(--icon-size);
  transform: skew(0, -16deg);
}

.main-card-content {
  row-gap: 12px;
}

.main-card-content .title {
  font-size: var(--main-card-title-font-size);
  font-weight: 500;
  color: white;
}

.main-card-content .description {
  font-size: var(--main-card-description-font-size);
  font-weight: 300;
  color: white;
}

@media screen and (min-width: 2000px) {
  * {
    --icon-size: 6.6rem;
    --main-card-title-font-size: 3rem;
    --main-card-description-font-size: 1.6rem;
  }
}

@media screen and (max-width: 1664px) {
  * {
    --icon-size: 6rem;
    --main-card-title-font-size: 2rem;
    --main-card-description-font-size: 1rem;
  }
}

@media screen and (max-width: 1354px) {
  * {
    --icon-size: 5.5rem;
    --main-card-title-font-size: 1.8rem;
    --main-card-description-font-size: 0.9rem;
  }
}

@media screen and (max-width: 1200px) {
  * {
    --icon-size: 4.8rem;
    --main-card-title-font-size: 1.6rem;
    --main-card-description-font-size: 0.8rem;
  }
}

@media screen and (max-width: 1000px) {
  * {
    --icon-size: 4rem;
    --main-card-title-font-size: 1.4rem;
    --main-card-description-font-size: 0.6rem;
  }
}

@media screen and (max-width: 900px) {
  * {
    --icon-size: 6rem;
    --main-card-title-font-size: 2rem;
    --main-card-description-font-size: 1rem;
  }
}
</style>