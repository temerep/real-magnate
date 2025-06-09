<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
  <nav class="app-navigation">
    <RouterLink to="/profile" v-slot="{ isActive, navigate }">
      <div class="nav-item" :class="{ active: isActive }">
        <img src="@/assets/navigation/profile.png" class="nav-item-icon" :class="{ active: isActive }" @click="navigate" alt="" />
        <span>{{ t('navigation.bottom.profile') }}</span>
      </div>
    </RouterLink>
    <RouterLink to="/shop" v-slot="{ isActive, navigate }">
      <div class="nav-item" :class="{ active: isActive }">
        <img src="@/assets/navigation/shop.png" class="nav-item-icon" :class="{ active: isActive }" @click="navigate" alt="" />
        <span>{{ t('navigation.bottom.shop') }}</span>
      </div>
    </RouterLink>
    <RouterLink to="/" v-slot="{ isActive, navigate }">
      <div class="nav-item" :class="{ active: isActive }">
        <img src="@/assets/navigation/home.png" class="nav-item-icon" :class="{ active: isActive }" @click="navigate" alt="" />
        <span>{{ t('navigation.bottom.home') }}</span>
      </div>
    </RouterLink>
    <RouterLink to="/earn" v-slot="{ isActive, navigate }">
      <div class="nav-item" :class="{ active: isActive }">
        <img src="@/assets/navigation/earn.png" class="nav-item-icon" :class="{ active: isActive }" @click="navigate" alt="" />
        <span>{{ t('navigation.bottom.earn') }}</span>
      </div>
    </RouterLink>
    <RouterLink to="/chat" v-slot="{ isActive, navigate }">
      <div class="nav-item" :class="{ active: isActive }">
        <img src="@/assets/navigation/chat.png" class="nav-item-icon" :class="{ active: isActive }" @click="navigate" alt="" />
        <span>{{ t('navigation.bottom.chat') }}</span>
      </div>
    </RouterLink>
  </nav>
</template>


<style lang="scss" scoped>
.app-navigation {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  height: 70px;
  z-index: 50;
  background: #272629;
  border-top: 1px solid #595D60;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 20px 12px;

  a {
    text-decoration: none;
  }

  .nav-item {
    position: relative;
    width: 64px;
    height: 48px;
    padding: 4px 0;
    border-radius: 10px;
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
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
      width: 22px;
      height: 22px;
      filter: brightness(0) invert(100%);
    }

    &.active {
      border-bottom: 2px solid #D3FF9E;
      background: linear-gradient(to bottom, rgba(160, 250, 251, 0.15), rgba(211, 255, 158, 0.15));
      opacity: 1;

      .nav-item-icon {
        filter: none;
      }
    }
  }
}
</style>