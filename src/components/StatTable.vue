<script setup>
import { computed, ref } from 'vue'
import { useI18n } from "vue-i18n"
const { t } = useI18n()

const getImgPath = (name) => {
  const pth = computed(
    () => new URL(`../assets/properties/${name}.png`, import.meta.url).href,
  )
  return pth
}

const characteristics = ref([
  {
    id: 1,
    icon: 'city',
    iconBg: '#4A90E250',
    label: t("properties.city"),
    value: 'Чикаго'
  },
  {
    id: 2,
    icon: 'distric',
    iconBg: '#5CB3CC50',
    label: t("properties.distric"),
    value: 'Северный'
  },
  {
    id: 3,
    icon: 'rent',
    iconBg: '#6B73FF50',
    label: t("properties.rent_out"),
    value: '12545 м2',
    change: '+500',
    changeType: 'positive',
    // highlighted: true
  },
  {
    id: 4,
    icon: 'building',
    iconBg: '#4A90E250',
    label: t("properties.building"),
    value: '7/10'
  },
  {
    id: 5,
    icon: 'office',
    iconBg: '#5CB3CC50',
    label: t("properties.office"),
    value: '55'
  },
  {
    id: 6,
    icon: 'avarage',
    iconBg: '#6B73FF50',
    label: t("properties.avarage"),
    value: '272 м2'
  },
  {
    id: 7,
    icon: 'tax',
    iconBg: '#7B68EE50',
    label: t("properties.tax"),
    value: '7%'
  },
  {
    id: 8,
    icon: 'wonder',
    iconBg: '#4A90E250',
    label: t("properties.wonder"),
    value: '2/7'
  },
  {
    id: 9,
    icon: 'distric-state',
    iconBg: '#5CB3CC50',
    label: t("properties.distric_state"),
    value: '72%',
    change: '-2%',
    changeType: 'negative'
  },
  {
    id: 10,
    icon: 'ad',
    iconBg: '#4A90E250',
    label: t("properties.distric_ads"),
    value: '99%'
  },
  {
    id: 11,
    icon: 'prestige',
    iconBg: '#5CB3CC50',
    label: t("properties.distric_prestige"),
    value: '85%'
  },
  {
    id: 12,
    icon: 'pay-for-rent',
    iconBg: '#6B73FF50',
    label: t("properties.rent_price"),
    value: '1,05'
  },
  {
    id: 13,
    icon: 'earned',
    iconBg: '#4A90E250',
    label: t("properties.earned"),
    value: '16000'
  },
  {
    id: 14,
    icon: 'rating',
    iconBg: '#5CB3CC50',
    label: t("properties.rating"),
    value: '7/20'
  }
])
</script>

<template>
  <div class="characteristics-container">
    <div class="characteristics-list">
      <div v-for="item in characteristics" :key="item.id" class="characteristic-item"
        :class="{ highlighted: item.highlighted }">
        <div class="item-left">
          <div class="icon" :style="{ backgroundColor: item.iconBg }">
            <img :src="getImgPath(item.icon).value"/>
          </div>
          <span class="label">{{ item.label }}</span>
        </div>
        <div class="item-right">
          <span class="value" :class="{
            positive: item.changeType === 'positive',
            negative: item.changeType === 'negative'
          }">
            <span v-if="item.change" class="change">{{ item.change }}</span>
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
    <div class="bottom-gradient"></div>
  </div>
</template>

<style lang="scss" scoped>
.characteristics-container {
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: "Inter", sans-serif;
  position: relative;

  .characteristics-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 120px;

    .characteristic-item {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(5px);
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);

      &.highlighted {
        background: rgba(107, 115, 255, 0.2);
        border-color: rgba(107, 115, 255, 0.3);
        box-shadow: 0 4px 20px rgba(107, 115, 255, 0.1);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      }

      .item-left {
        display: flex;
        align-items: center;
        gap: 15px;

        .icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;

          img {
            width: 30px;
            height: 30px;
          }
        }

        .label {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          color: #fff;
        }
      }

      .item-right {
        .value {
          font-size: 16px;
          font-weight: 600;
          line-height: 22px;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;

          .change {
            font-size: 14px;
            padding: 2px 6px;
            border-radius: 6px;
            font-weight: 500;

            &.positive {
              color: #4CAF50;
              background: rgba(76, 175, 80, 0.1);
            }

            &.negative {
              color: #F44336;
              background: rgba(244, 67, 54, 0.1);
            }
          }

          &.positive {
            color: #4CAF50;
          }

          &.negative {
            color: #F44336;
          }
        }
      }
    }
  }

  .bottom-gradient {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 160px;
    background: linear-gradient(to bottom, transparent, #181818 40%);
    z-index: 20;
  }
}

// Responsive design
@media (max-width: 480px) {
  .characteristics-container {
    padding: 25px;

    .header .title {
      font-size: 20px;
    }

    .characteristics-list {
       gap: 10px;
    }

    .characteristics-list .characteristic-item {
      padding: 10px 14px;
    
      .item-left {
        gap: 12px;

        .icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          // background: none !important;
          font-size: 16px;

          img {
            width: 32px;
            height: 32px;
          }
        }

        .label {
          font-size: 15px;
        }
      }

      .item-right .value {
        font-size: 15px;
      }
    }
  }
}

// Dark theme animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.characteristic-item {
  animation: fadeInUp 0.5s ease forwards;
}

.characteristic-item:nth-child(n) {
  animation-delay: calc(var(--index, 0) * 0.1s);
}
</style>