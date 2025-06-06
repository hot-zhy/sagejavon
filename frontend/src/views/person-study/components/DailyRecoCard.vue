import { t as globalT } from '@/locales';
<template>
    <div class="daily-container">
        <div class="left-side">
            <img src="../images/daily-recommendation.png" class="icon" />
        </div>
        <div class="text-container">
            <div class="title">{{ t('dailyRecommendation') }}</div>
            <div class="right-side">
                <ul class="features">
                    <li>{{ t('aiAlgorithm') }}</li>
                    <li>{{ t('autoRefresh') }}</li>
                    <li>{{ t('experienceYourList') }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import {t as globalT} from '@/locales'
const t = globalT
</script>

<style scoped>
* {
    --icon-size: 6.2rem;
    --main-card-title-font-size: 2.2rem;
    --main-card-description-font-size: 1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.daily-container {
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

.text-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 2.4rem;
}

.title {
    font-size: var(--main-card-title-font-size);
    font-weight: 500;
    color: white;
}

.right-side {
    font-weight: 300;
    color: white;
}

.right-side .features {
    font-size: var(--main-card-description-font-size);
    list-style: url('../images/circle.svg');
}

.right-side .features li {
    font-size: var(--main-card-description-font-size);
    margin-bottom: 12px;
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

    .text-container {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        row-gap: 12px;
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

@media screen and (max-width: 1000px) {
    * {
        --icon-size: 6rem;
        --main-card-title-font-size: 2rem;
        --main-card-description-font-size: 1rem;
    }
}
</style>