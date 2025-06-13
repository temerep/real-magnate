<script setup>
import { TonConnectButton } from '@townsquarelabs/ui-vue';
import LocaleSwitch from './LocaleSwitch.vue';
import DepositModal from './modals/DepositModal.vue';
import { useI18n } from "vue-i18n"
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';


const { t } = useI18n()
const app = useAppStore()
const openDepositModal = ref(false)
const router = useRouter();

</script>

<template>
  <div class="profile-wrapper">
    <DepositModal v-if="openDepositModal" @close="openDepositModal = false" />
    <div class="profile">
      <section class="wallet">
        <div class="first-row">
          <h1 class="title">{{ t("profile.wallet") }}</h1>
          <button class="close-btn" @click="router.push({ path: '/' })"></button>
        </div>
        <div class="second-row">
          <LocaleSwitch style="flex:2" />
          <TonConnectButton :button-root-id="`ton-connect-button`" style="flex: 3" />
          <div style="flex:2"></div>
        </div>
        <hr class="divider" />
      </section>
      <div class="scrollable">
        <section class="crypto">
          <h1 class="title">{{ t("profile.crypto_wallet") }}</h1>
          <div class="tokens-list">
            <div class="tokens-list-item">
              <div class=item-left>
                <img src="@/assets/common/ton.svg" />
                <div class="item-left-data">
                  <label>Toncoin</label>
                  <span>{{ app?.tonBalance / 10 ** 9 || 0 }} TON</span>
                </div>
              </div>
              <div class=item-right>
                <label>{{ +((app?.tonBalance / 10 ** 9) * (app.prices?.['TON'] || 0)).toFixed(2) }}$</label>
              </div>
            </div>
            <div class="tokens-list-item">
              <div class=item-left>
                <img src="@/assets/common/rent.svg" />
                <div class="item-left-data">
                  <label>RealMAGNATE</label>
                  <span>{{
                    app.jettons?.find((el) => el?.jetton?.symbol == 'RENT')
                      ? app.jettons.find((el) => el.jetton.symbol == 'RENT')?.balance / 10 ** app.jettons.find((el) =>
                        el.jetton.symbol == 'RENT')?.jetton.decimals
                    : '0' }} RENT</span>
                </div>
              </div>
              <div class=item-right>
                <label>{{
                  +((app.jettons?.find((el) => el?.jetton?.symbol == 'RENT')
                    ? app.jettons.find((el) => el.jetton.symbol == 'RENT')?.balance / 10 ** app.jettons.find((el) =>
                      el.jetton.symbol == 'RENT')?.jetton.decimals
                    : '0') * (app.prices?.['RENT'] || 0)).toFixed(2)
                  }}$</label>
              </div>
            </div>
          </div>
          <hr class="divider" />
        </section>
        <section class="balance">
          <h1 class="title">{{ t("profile.balance") }}</h1>
          <div class="tokens-list">
            <div class="tokens-list-item">
              <div class=item-left>
                <img src="@/assets/common/rent.svg" />
                <div class="item-left-data">
                  <label>RealMAGNATE</label>
                  <span>4646 RENT</span>
                </div>
              </div>
              <div class=item-right>
                <label>136.36$</label>
              </div>
            </div>
          </div>
          <button class="deposit-btn" @click="openDepositModal = true">{{ t("profile.deposit_btn") }}</button>
          <hr class="divider" />
        </section>
        <section class="assets">
          <h1 class="title">{{ t("profile.assets") }}</h1>
          <div class="assets-list">
            <div class="asset-item">
              <img src="@/assets/navigation/top/state.png" class="asset-item-icon" alt="" />
              <span class="asset-item-name">{{ t('navigation.top.state') }}</span>
              <div class="counter">0</div>
            </div>
            <div class="asset-divider"></div>
            <div class="asset-item" :class="{ active: true }">
              <img src="@/assets/navigation/top/city.png" class="asset-item-icon" :class="{ active: true }" alt="" />
              <span class="asset-item-name" :class="{ active: true }">{{ t('navigation.top.city') }}</span>
              <div class="counter">1</div>
            </div>
            <div class="asset-divider"></div>
            <div class="asset-item">
              <img src="@/assets/navigation/top/distric.png" class="asset-item-icon" alt="" />
              <span class="asset-item-name">{{ t('navigation.top.distric') }}</span>
              <div class="counter">0</div>
            </div>
            <div class="asset-divider"></div>
            <div class="asset-item">
              <img src="@/assets/navigation/top/building.png" class="asset-item-icon" alt="" />
              <span class="asset-item-name">{{ t('navigation.top.building') }}</span>
              <div class="counter">0</div>
            </div>
            <div class="asset-divider"></div>
            <div class="asset-item">
              <img src="@/assets/navigation/top/office.png" class="asset-item-icon" alt="" />
              <span class="asset-item-name">{{ t('navigation.top.office') }}</span>
              <div class="counter">0</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.divider {
  position: absolute;
  bottom: -10px;
  left: -15px;
  width: 100vw;
  opacity: 0.25;
}

.title {
  color: #fff;
  text-align: center;
  font-family: "Arail", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0px;
}

.profile-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 20px 20px 0 0;
  border-top: 1px solid #ffffff26;
  background:
    linear-gradient(to bottom, #19191CD9, #19191CD9),
    url("@/assets/profile/profile-bg.jpg") no-repeat top;
  background-size: 100%;

}

.profile {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  padding: 20px 0;
  margin: 0 auto;

  .scrollable {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
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

  .wallet {
    position: relative;
    width: calc(100% - 30px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .first-row {
      position: relative;
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;

      .close-btn {
        position: absolute;
        right: 0;
        width: 30px;
        height: 30px;
        border: none;
        background: url("@/assets/common/close.svg") no-repeat center;
        background-size: 30px;
      }
    }

    .second-row {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .crypto,
  .balance,
  .assets {
    position: relative;
    display: flex;
    width: calc(100% - 30px);
    margin: 0 auto;
    flex-direction: column;
    gap: 15px;
    padding-top: 20px;

    .tokens-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      &-item {
        display: flex;
        justify-content: space-between;

        .item-left {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 15px;

          &-data {
            display: flex;
            flex-direction: column;

            label {
              color: #fff;
              font-family: "Arial", sans-serif;
              font-weight: 700;
              font-size: 20px;
              line-height: 22px;
              letter-spacing: -.4px;
            }

            span {
              color: #fff;
              font-family: "Arial", sans-serif;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              letter-spacing: -.4px;
              opacity: 0.5;
            }
          }
        }

        .item-right {
          display: flex;
          align-items: center;
          justify-content: end;

          label {
            color: #fff;
            font-family: "Arial", sans-serif;
            font-weight: 700;
            font-size: 24px;
            line-height: 22px;
            letter-spacing: -.4px;
          }
        }
      }
    }

    .assets-list {
      display: flex;
      justify-content: center;

      .asset-divider {
        &::after {
          content: '.....';
          padding: 0;
          width: 12px;
          margin: 12px 0;
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

      .asset-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 54px;

        &-icon {
          width: 30px;
          height: 30px;
          filter: grayscale(100%);
          opacity: 0.5;
        }

        &-name {
          color: #fff;
          font-family: "Inter", sans-serif;
          font-weight: 600 !important;
          font-size: 12px;
          line-height: 22px;
          letter-spacing: 0%;
          opacity: 0.5;
        }

        &.active {
          .asset-item-icon {
            filter: none;
            opacity: 1;
          }

          .asset-item-name {
            opacity: 1;
            background: -webkit-linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }

          .counter {
            background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
          }
        }

        .counter {
          color: #000;
          font-family: "Inter", sans-serif;
          font-weight: 600 !important;
          font-size: 12px;
          line-height: 22px;
          letter-spacing: 0%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          width: 32px;
          height: 22px;
          border-radius: 5px;
        }
      }
    }

    .deposit-btn {
      color: #000;
      font-family: "Arial", sans-serif;
      font-weight: 700;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0px;
      width: 100%;
      padding: 16px;
      border-radius: 100px;
      background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
      transition: all 200ms ease-in-out;

      &:active {
        scale: 0.9;
      }
    }
  }
}
</style>