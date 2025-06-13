<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n"
import FriendsTable from "../FriendsTable.vue";
import { useTelegram } from "@/services/telegram";

const { t } = useI18n()
const { user } = useTelegram()

const search_inp = ref(null)

const emit = defineEmits(['close', 'hide-stats'])

const copyInvite = () => {
  const link = `https://t.me/RentMAGNATE_test_bot?startapp=ref_id${user?.id}`
  return navigator.clipboard.writeText(link)
}

const emitClose = () => {
  emit('close')
}

const hideStats = (bool) => {
  emit('hide-stats', { visibility: bool })
}

</script>

<template>
  <div class="ref-modal">
    <div class="ref-modal-header">
      <div class="top-line">
        <h1 class="title">{{ t("modals.friends.title") }}</h1>
        <button class="close-btn" @click="emitClose"></button>
      </div>
      <div class="search">
        <img src="@/assets/common/search.svg" class="search-icon" />
        <input id="query" class="input" v-model="search_inp" type="search" placeholder="Search" name="searchbar"
          @focusin="hideStats(false)" @focusout="hideStats(true)" />
      </div>
    </div>
    <div class="ref-modal-content">
      <FriendsTable :search="search_inp" />
      <button class="invite-btn" @click="copyInvite">
        {{ t('modals.friends.invite_btn') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ref-modal {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #18200F 43.48%, #000000 100%);
  border-radius: 30px 30px 0 0;
  border-top: none;
  display: flex;
  flex-direction: column;
  z-index: 20;
  padding-top: 100px;
  transition: all 500ms cubic-bezier(0.250, 0.460, 0.450, 0.940);

  &-header {
    position: relative;
    width: calc(100% - 30px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;

    .top-line {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;

      .close-btn {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        min-width: 30px;
        min-height: 30px;
        border: none;
        background: url("@/assets/common/close.svg") no-repeat;
        background-size: 30px;
      }

      .title {
        width: 100%;
        color: #fff;
        font-family: Inter, sans-serif;
        font-weight: 600;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.4px;
        text-align: center;
      }
    }

    .search {
      position: relative;
      display: flex;
      line-height: 28px;
      align-items: center;
      background: #D9D9D933;
      border-radius: 10px;
      padding-left: 10px;
      width: 100%;

      .input {
        font-family: Inter, sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.4px;
        width: 100%;
        height: 40px;
        border: 0;
        outline: none;
        color: #FFF;
        background: transparent;
        transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
        cursor: text;
        z-index: 0;

        &::placeholder {
          color: #FFFFFF80;
        }

        &:hover {
          box-shadow: none;
        }

        &:active {
          transform: scale(0.95);
        }

        &:focus {
          box-shadow: none;
        }

        .search-icon {
          width: 26px;
          height: 26px;
          pointer-events: none;
          z-index: 1;
        }

      }
    }
  }

  &-content {
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
    width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;

    .invite-btn {
      width: 100%;
      height: 40px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
      color: #000;
      font-family: Arial, sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0px;
      transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>