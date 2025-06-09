<script setup>
import i18n from '@/utils/i18n';
import { ref, watch } from 'vue';

const curr_locale = ref(localStorage.getItem('locale'))

watch(curr_locale, () => {
  i18n.global.locale.value = curr_locale.value
  localStorage.setItem('locale', curr_locale.value)
})

</script>


<template>
  <div class="container">
    <div class="tabs">
      <input name="tabs" v-model="curr_locale" id="locale-ru" value="ru" type="radio" checked />
      <label for="locale-ru" class="tab">RU</label>

      <input name="tabs" v-model="curr_locale" id="locale-en" value="en" type="radio" />
      <label for="locale-en" class="tab">EN</label>
      <span class="glider"></span>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  width: 64px;
  height: 32px;
  position: relative;
  border-radius: 20px;
  border: 1px solid #ffffff30
}

.tabs * {
  z-index: 2;
}

.container input[type="radio"] {
  display: none;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  font-family: "Arial", sans-serif;
  line-height: 100%;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: color 0.15s ease-in;
}

.container input[type="radio"]:checked+label {
  color: #000;
}

.container input[id="locale-ru"]:checked~.glider {
  transform: translateX(0);
}

.container input[id="locale-en"]:checked~.glider {
  transform: translateX(100%);
}

.glider {
  position: absolute;
  display: flex;
  height: 30px;
  width: 31px;
  background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
  z-index: 1;
  border-radius: 20px;
  transition: 0.15s ease-out;
}
</style>