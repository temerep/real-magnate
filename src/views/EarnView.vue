<script setup>
import FriendsModal from "@/components/modals/FriendsModal.vue"
import { useTelegram } from "@/services/telegram"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()

const { user } = useTelegram()

const isOpenFriends = ref(false)

const shareInvite = () => {
  const link = `https://t.me/share/url?url=https://t.me/RentMAGNATE_test_bot?startapp=ref_id${user?.id}&text=Присоединяйся к RealMAGNATE`
  return (window.location.href = link)
}

const emit = defineEmits(['hide-stats'])

const hideStats = (val) => {
  emit('hide-stats', val)
}

</script>

<template>
  <div class="earn-view">
    <FriendsModal v-if="isOpenFriends" @close="isOpenFriends = false" @hide-stats="hideStats" />
    <div class="earn-wrapper">
      <div class="scrollable">
        <div class="ref-board">
          <div class="ref-header">
            <h1 class="title">{{ t('earn.title') }}</h1>
            <button class="info-btn"></button>
          </div>
          <div class="ref-item">
            <div class="ref-item-left">
              <img class="ref-icon" src="@/assets/earn/refs.png" alt="" />
              <span>{{ t('earn.ref_board.friends', { friends: 50 }) }}</span>
            </div>
            <div class="ref-item-right">
              <button class="ref-btn" @click="shareInvite">{{ t('earn.ref_board.invite_btn') }}</button>
            </div>
          </div>
          <div class="ref-item">
            <div class="ref-item-left">
              <img class="ref-icon" src="@/assets/common/rent.svg" alt="" />
              <span>447.57 RENT</span>
            </div>
            <div class="ref-item-right">
              <button class="ref-btn">{{ t('earn.ref_board.get_bonus_btn') }}</button>
            </div>
          </div>
          <div class="ref-item">
            <div class="ref-item-left">
              <img class="ref-icon" src="@/assets/common/ton.svg" alt="" />
              <span>10 TON</span>
            </div>
            <div class="ref-item-right">
              <button class="ref-btn">{{ t('earn.ref_board.get_bonus_btn') }}</button>
            </div>
          </div>
          <button class="refs-list-btn" @click="isOpenFriends = true">{{ t('earn.ref_board.ref_list_btn') }}</button>
        </div>
        <div class="games-list">
          <div class="game-card disabled">
            <div class="game-image">
              <span>{{ t('earn.games.comming') }}</span>
              <img src="@/assets/earn/games/roulete.jpg" alt="" />
            </div>
            <h1 class="game-title">{{ t('earn.games.roulette') }}</h1>
          </div>
          <div class="game-card disabled">
            <div class="game-image">
              <span>{{ t('earn.games.comming') }}</span>
              <img src="@/assets/earn/games/wheel.jpg" alt="" />
            </div>
            <h1 class="game-title">{{ t('earn.games.fortune_wheel') }}</h1>
          </div>
          <div class="game-card disabled">
            <div class="game-image">
              <span>{{ t('earn.games.comming') }}</span>
              <img src="@/assets/earn/games/roulete.jpg" alt="" />
            </div>
            <h1 class="game-title">{{ t('earn.games.roulette') }}</h1>
          </div>
          <div class="game-card disabled">
            <div class="game-image">
              <span>{{ t('earn.games.comming') }}</span>
              <img src="@/assets/earn/games/roulete.jpg" alt="" />
            </div>
            <h1 class="game-title">{{ t('earn.games.fortune_wheel') }}</h1>
          </div>
          <div class="game-card disabled">
            <div class="game-image">
              <img src="@/assets/earn/games/roulete.jpg" alt="" />
            </div>
            <h1 class="game-title">{{ t('earn.games.roulette') }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.earn-view {
  width: 100%;
  height: 100%;
  background:
    linear-gradient(180deg, #181818D9, #181818D9),
    url('@/assets/earn/earn-bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 300% 120%;

  .earn-wrapper {
    width: calc(100% - 50px);
    height: 100%;
    margin: 0 auto;

    .scrollable {
      height: 100%;
      margin: 0;
      padding: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      -ms-overflow-style: none;
      /* Internet Explorer 10+ */
      scrollbar-width: none;
      /* Firefox */

      &::-webkit-scrollbar {
        display: none;
        /* Safari and Chrome */
      }

      padding-bottom: 340px;
    }

    .ref-board {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      border-radius: 20px;
      padding: 14px 13px;
      margin-top: 8px;
      background: #19191C;

      .ref-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          color: #fff;
          font-family: Arial, sans-serif;
          font-weight: 700;
          font-size: 20px;
          line-height: 22px;
          letter-spacing: 0px;
        }

        .info-btn {
          width: 30px;
          height: 30px;
          border: none;
          background: url("@/assets/common/info-circle.svg") no-repeat center;
          background-size: 30px;
        }
      }

      .ref-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-left {
          display: flex;
          align-items: center;
          gap: 5px;

          .ref-icon {
            width: 24px;
            height: 24px;
          }

          span {
            color: #fff;
            font-family: Arial, sans-serif;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            letter-spacing: 0px;
            text-align: center;
          }
        }

        &-right {
          display: flex;
          align-items: center;

          .ref-btn {
            min-width: 122px;
            height: 36px;
            border-radius: 100px;
            padding: 5px 10px;
            border: none;
            background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
            color: #212121;
            font-family: Arial, sans-serif;
            font-weight: 700;
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0px;
            vertical-align: middle;
            text-wrap: nowrap;
            transition: all 200ms ease-in-out;

            &:active {
              scale: 0.9;
            }
          }
        }
      }

      .refs-list-btn {
        width: 100%;
        height: 48px;
        border-radius: 100px;
        padding: 1rem;
        color: #fff;
        font-family: Arial, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 0px;
        vertical-align: middle;
        text-align: center;
        border: 1px solid transparent !important;
        background:
          linear-gradient(180deg, #181818 0%, #181818 100%) padding-box,
          linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%) border-box;

        transition: all 200ms ease-in-out;

        &:active {
          scale: 0.9;
        }
      }
    }

    .games-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: space-between;
      gap: 12px;
      margin-top: 12px;

      .game-card {
        max-height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background: #19191C;
        border: 1px solid #FFFFFF1A;
        padding: 12px 0 7px 0;
        gap: 5px;

        .game-image {
          position: relative;
          border-radius: 15px;
          width: 140px;
          overflow: hidden;

          span {
            display: none;
            color: #fff;
            position: absolute;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: Arial, sans-serif;
            font-weight: 700;
            font-size: 15px;
            line-height: 22px;
            letter-spacing: 0px;
            text-align: center;
            vertical-align: middle;
            z-index: 1;
          }

          img {
            width: 100%;
          }
        }

        &.disabled {
          .game-image {
            img {
              filter: blur(15px);
            }

            span {
              display: block;
            }
          }
        }

        .game-title {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 44px;
          color: #fff;
          font-family: Arial, sans-serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          letter-spacing: 0px;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }

}
</style>