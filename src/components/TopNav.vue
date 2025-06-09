<script setup>
import { watch } from "vue"
import { useI18n } from "vue-i18n"
import { useAppStore } from '@/stores/app';

const { t } = useI18n()
const app = useAppStore()

watch(
  () => app.currentMap,
  (newVal, oldVal) => {
    console.log(newVal)
  }
)

</script>

<template>
  <nav class="top-navigation">
    <div class="item-wrapper">
      <div class="nav-item" :class="{ active: app.currentMap == 'state' }">
        <img src="@/assets/navigation/top/state.png" class="nav-item-icon" :class="{ active: app.currentMap == 'state' }"
          @click="app.setCurrMap('state')" alt="" />
        <span>{{ t('navigation.top.state') }}</span>
      </div>
    </div>
     <div class="item-wrapper">
       <div class="nav-item" :class="{ active: app.currentMap == 'city' }">
         <img src="@/assets/navigation/top/city.png" class="nav-item-icon" :class="{ active: app.currentMap == 'city' }"
           @click="app.setCurrMap('city')" alt="" />
         <span>{{ t('navigation.top.city') }}</span>
       </div>
     </div>
      <div class="item-wrapper">
        <div class="nav-item" :class="{ active: app.currentMap == 'distric' }">
          <img src="@/assets/navigation/top/distric.png" class="nav-item-icon" :class="{ active: app.currentMap == 'distric' }"
            @click="app.setCurrMap('distric')" alt="" />
          <span>{{ t('navigation.top.distric') }}</span>
        </div>
      </div>
       <div class="item-wrapper">
         <div class="nav-item" :class="{ active: app.currentMap == 'building' }">
           <img src="@/assets/navigation/top/building.png" class="nav-item-icon" :class="{ active: app.currentMap == 'building' }"
             @click="app.setCurrMap('building')" alt="" />
           <span>{{ t('navigation.top.building') }}</span>
         </div>
       </div>
        <div class="item-wrapper">
          <div class="nav-item" :class="{ active: app.currentMap == 'office' }">
            <img src="@/assets/navigation/top/office.png" class="nav-item-icon" :class="{ active: app.currentMap == 'office' }"
              @click="app.setCurrMap('office')" alt="" />
            <span>{{ t('navigation.top.office') }}</span>
          </div>
        </div>
  </nav>
</template>


<style lang="scss" scoped>
.top-navigation {
  width: 100%;
  height: 170px;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: end;
  padding: 10px 12px 10px 24px;
  background: radial-gradient(ellipse 60% 70% at top, #D3FF9E80, transparent);

  .item-wrapper {
    text-decoration: none;
    display: flex;
    margin-top: 5px;
    padding-top: 5px;

    &::after {
      content: '.....';
      padding: 0;
      margin: 12px 0;
      width: 12px;
      font-size: 9px;
      background: linear-gradient(to right, transparent, #ffffff, transparent);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
    &:last-child::after {
      content: '';
    }
  }

  .nav-item {
    position: relative;
    width: 54px;
    height: 64px;
    padding: 5px 0;
    margin: 0 auto;
    font-family: "Inter", sans-serif;
    font-weight: 600 !important;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 0%;
    color: #fff;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    opacity: 0.5;

    &-icon {
      width: 30px;
      height: 30px;
      filter: grayscale(100%);
    }

    &.active {
      opacity: 1;
      background: -webkit-linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;

      .nav-item-icon {
        filter: none;
      }
    }
  }
}
</style>