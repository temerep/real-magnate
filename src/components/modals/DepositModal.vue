<script setup>
import { computed, nextTick, ref } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const animateOut = ref(false)

const depAmount = ref(null);
const formattedAmount = computed({
  get() {
    // Якщо є значення, додаємо " RENT"
    return depAmount.value !== null && depAmount.value !== ''
      ? `${depAmount.value} RENT`
      : '';
  },
  set(value) {
    // Видаляємо "RENT" і все, крім цифр і крапки (для дробових чисел)
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Оновлюємо depAmount як число або null
    depAmount.value = numericValue ? parseFloat(numericValue) : null;
  }
});

const handleInput = (event) => {
  const input = event.target;
  const cursorPosition = input.selectionStart;
  const value = input.value;

  // Якщо курсор доходить до "RENT" або користувач намагається його видалити
  if (value.endsWith('RENT') || cursorPosition >= value.length - 4) {
    // Переміщаємо курсор перед "RENT"
    nextTick(() => {
      input.selectionStart = input.selectionEnd = value.length - 5;
    });
  }
}

const emit = defineEmits(['close'])
const emitClose = () => {
  animateOut.value = true
  setTimeout(() => emit("close"), 300)
}

</script>

<template>
  <div class="modal-overlay" :class="{ 'modal-closing': animateOut }">
    <div class="deposit-modal">
      <div class="header">
        <h1 class="deposit-title">{{ t("modals.deposit.title") }}</h1>
        <button class="deposit-close-btn" @click="emitClose"></button>
      </div>
      <div class="content">
        <label>{{ t("modals.deposit.label") }}</label>
        <div class="deposit-token">
          <img src="@/assets/common/rent.svg" alt="" />
          <div class="token-data">
            <h3>RealMAGNATE</h3>
            <span>235 RENT</span>
          </div>
        </div>
        <input 
          v-model="formattedAmount"
          type="text"
          inputmode="decimal"
          class="deposit-inp"
          :placeholder="t('modals.deposit.input_placeholder')"
          @input="handleInput"
        />
        <button class="deposit-btn">{{ t("modals.deposit.deposit_btn") }}</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  backdrop-filter: blur(8px);
  z-index: 50;
  pointer-events: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;

  &.modal-closing {
    animation: fadeOut 0.3s ease-in;

    .deposit-modal {
      animation: modalPopOut 0.3s ease-in;
    }
  }

  .deposit-modal {
    position: relative;
    width: calc(100% - 56px);
    height: 320px;
    padding: 20px;
    display: flex;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    border-radius: 32px;
    border: 1px solid transparent;
    background:
      linear-gradient(180deg, #000000, #000000) padding-box,
      linear-gradient(180deg, #A0FAFB, #D3FF9E) border-box;
    overflow: hidden;
    animation: modalPopIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s both;

    .header {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .deposit-title {
        color: #fff;
        font-family: Inter, sans-serif;
        font-weight: 600;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.4px;
        text-align: center;
      }

      .deposit-close-btn {
        position: absolute;
        right: 0;
        width: 36px;
        height: 36px;
        background: url("@/assets/common/close.svg") no-repeat right;
        background-size: 30px;
        border: none;
      }

    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin: auto;

      label {
        color: #fff;
        font-family: "Arial", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: -0.4px;
        margin-bottom: -10px;
        opacity: 0.5;
      }

      .deposit-token {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        padding: 16px;
        gap: 10px;
        background: #FFFFFF26;

        .token-data {
          display: flex;
          flex-direction: column;

          h3 {
            color: #fff;
            font-family: Arial;
            font-weight: 700;
            font-size: 20px;
            line-height: 22px;
            letter-spacing: -0.4px;
          }

          span {
            color: #fff;
            opacity: 0.5;
            font-family: Arial;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            letter-spacing: -0.4px;
          }
        }
      }

      .deposit-inp {
        text-align: center;
        width: 100%;
        border-radius: 100px;
        padding: 16px;
        border: 1px solid transparent;
        background:
          linear-gradient(180deg, #000000, #000000) padding-box,
          linear-gradient(180deg, #A0FAFB, #D3FF9E) border-box;
        color: #fff;
        font-family: Arial, sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 0px;
        vertical-align: middle;
        max-height: 48px;

        &:focus {
          outline: none;
        }
      }

      .deposit-btn {
        color: #212121;
        font-family: Arial, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 0px;
        border-radius: 100px;
        padding: 16px;
        background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 48px;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalPopIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(30px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes modalPopOut {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }

  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
}
</style>