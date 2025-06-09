<script setup>
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>

<template>
  <div class="wrapper">
    <div class="comming">
      <span>{{ t("comming") }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: calc(100% - 30px);
  margin: 0 auto;
  height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .comming {
    position: relative;
    width: calc(100% - 30px);
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    border: 1px solid transparent;
    background:
      linear-gradient(180deg, #000000, #000000) padding-box,
      linear-gradient(180deg, #A0FAFB, #D3FF9E) border-box;

    span {
      font-family: Inter, sans-serif;
      font-weight: 600;
      font-size: 20px;
      line-height: 22px;
      color: #fff
    }
  }
}
</style>