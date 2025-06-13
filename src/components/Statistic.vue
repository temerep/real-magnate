<script setup>
import { computed, ref } from 'vue';
import { useI18n } from "vue-i18n"
import StatTable from './StatTable.vue';

const { t } = useI18n()
const isOpened = ref(false)

const tmp_stat = [
  {
    val: 56999,
    perc: +50
  },
  {
    val: 577,
    perc: -50
  },
  {
    val: 56774,
    perc: 50
  }
]

const getStatImg = (idx) => {
  const pth = computed(
    () => new URL(`../assets/stats/stat${idx + 1}.png`, import.meta.url).href,
  )
  return pth
}
</script>

<template>
  <div class="statistic" :class="{ opened: isOpened }">
    <div class="stat-line">
      <button class="info-btn"></button>
      <div v-if="!isOpened" class="stat-line-item" v-for="stat, index in tmp_stat" :key="index">
        <img class="stat-icon" :src="getStatImg(index).value" alt="" />
        <div class="stat-line-item-data">
          <span class="val">{{ stat.val }}</span>
          <span class="perc" :class="{ decr: stat.perc <= 0 }">{{ "(" + (stat.perc > 0 ? "+" : "") + stat.perc + "%)"
          }}</span>
        </div>
      </div>
      <h1 v-if="isOpened" class="properties">{{ t("properties.title") }}</h1>
      <button class="open-stat-btn" @click="isOpened = !isOpened"></button>
    </div>
    <div v-if="isOpened" class="stat-content">
      <StatTable />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.statistic {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 160px;
  background:
    linear-gradient(to bottom, #19191CD9, #19191CD9),
    url("@/assets/navigation/nav-bg.jpg") no-repeat center;
  background-size: cover;
  border-radius: 30px 30px 0 0;
  border-top: 1px solid #ffffff40;
  display: flex;
  flex-direction: column;
  z-index: 20;
  transition: all 500ms cubic-bezier(0.250, 0.460, 0.450, 0.940);

  &.opened {
    height: 100vh !important;
    border-top: none;
    padding-top: 100px;

    .open-stat-btn {
      transform: rotate(180deg);
    }
  }

  .stat-line {
    width: calc(100% - 30px);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .stat-icon {
        width: 30px;
        height: 30px;
      }

      &-data {
        display: flex;
        flex-direction: column;
        font-family: Inter, sans-serif;

        .val {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.4px;
          line-height: 15px;
          color: #fff;
        }

        .perc {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: -0.4px;
          line-height: 15px;
          color: #D3FF9E;

          &.decr {
            color: #FF9E9E;
          }
        }
      }
    }

    .info-btn {
      min-width: 24px;
      min-height: 24px;
      border: none;
      background: url("@/assets/common/info-circle.svg") no-repeat;
      background-size: 24px;
      opacity: 0.5;
    }

    .properties {
      color: #fff;
      font-family: Inter, sans-serif;
      font-size: 24px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: -0.4px;
    }

    .open-stat-btn {
      min-width: 24px;
      min-height: 24px;
      border: none;
      background: url("@/assets/stats/arrow-circle.svg") no-repeat;
      background-size: 24px;
      opacity: 0.5;
      transition: all 300ms ease-in-out;

      &:active {
        opacity: 0.25;
        scale: 0.9;
      }
    }
  }

  .stat-content {
    position: relative;
    margin-top: 10px;
    overflow-y: scroll;
  }
}
</style>