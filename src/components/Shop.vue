<script setup>
import { useI18n } from "vue-i18n"
import { ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import { useTelegram } from '@/services/telegram'


const { t } = useI18n()
const { tg } = useTelegram()
const app = useAppStore()

const getOfficeImg = (idx) => {
  const pth = computed(
    () => new URL(`../assets/shop/offices/office${idx}.jpg`, import.meta.url).href,
  )
  return pth.value
}

const cards = ref([
  {
    name: 1,
    square: 5,
    rarity: "Common",
    price: 10,
    link: "https://getgems.io/"
  },
  {
    name: 2,
    square: 15,
    rarity: "Rare",
    price: 20,
    link: "https://getgems.io/"
  },
  {
    name: 3,
    square: 35,
    rarity: "Epic",
    price: 40,
    link: "https://getgems.io/"
  },
  {
    name: 4,
    square: 85,
    rarity: "Legend",
    price: 80,
    link: "https://getgems.io/"
  },
])

</script>

<template>
  <div class="shop-wrapper">
    <div class="shop">
      <section class="header-section">
        <div class="first-row">
          <span class="ton-balance">
            <img src="@/assets/common/ton.svg" alt="" />
            {{ +(app?.tonBalance / 10 ** 9).toFixed(2) || 0 }}
          </span>
          <h1 class="title">{{ t("shop.title") }}</h1>
          <div class="placeholder"></div>
          <button class="info-btn"></button>
        </div>
        <div class="second-row">
          <div style="flex:2"></div>
        </div>
      </section>
      <div class="scrollable">
        <section class="content-section">
          <div class="office-card" v-for="office in cards" :key="office.name">
            <h1 class="office-name">{{ t('shop.card.name', { office: office.name }) }}</h1>
            <div class="office-data">
              <div class=img-wrapper :style="{ backgroundImage: `url(${getOfficeImg(office.name)})` }">
              </div>
              <div class="data-col">
                <div class="labels">
                  <label>{{ t('shop.card.square') }} <span>{{ t('shop.card.square_input', {
                    square:
                      office.square})}}</span></label>
                  <label>{{ t('shop.card.rarity') }} <span class="rarity"
                      :class="{ 'rare': office.rarity == 'Rare', 'epic': office.rarity == 'Epic', 'legend': office.rarity == 'Legend' }">{{
                      office.rarity }}</span></label>
                  <label>{{ t('shop.card.price') }} <span>{{ office.price }} TON</span></label>
                </div>
                <button class="mint-btn" @click="tg.openLink(office.link)">{{ t('shop.card.mint_btn') }}</button>
              </div>
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

.shop-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 20px 20px 0 0;
  border-top: 1px solid #ffffff26;
  background: #19191C; //D9
  background-size: 100%;
}

.shop {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: calc(100% - 40px);
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

  .header-section {
    position: relative;
    width: calc(100% - 30px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .first-row {
      position: relative;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;

      .ton-balance {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 5px;
        color: #fff;
        font-family: Arial, sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: 0px;

        img {
          width: 24px;
          height: 24px;
        }
      }

      .title {
        flex: 2;
      }

      .placeholder {
        flex: 1;
      }

      .info-btn {
        position: absolute;
        right: 0;
        width: 30px;
        height: 30px;
        border: none;
        background: url("@/assets/common/info-circle.svg") no-repeat center;
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

  .content-section {
    position: relative;
    display: flex;
    width: calc(100% - 30px);
    margin: 0 auto;
    flex-direction: column;
    gap: 15px;

    .office-card {
      width: 100%;
      border-radius: 15px;
      border: 1px solid transparent !important;
      background:
        linear-gradient(180deg, #303033, #303033) padding-box,
        linear-gradient(180deg, #A0FAFB, #D3FF9E) border-box;
      padding: 14px 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .office-name {
        color: #fff;
        font-family: Arial, sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        letter-spacing: 0px;
      }

      .office-data {
        width: 100%;
        display: flex;
        gap: 15px;

        .img-wrapper {
          border-radius: 15px;
          min-width: 105px;
          height: 115px;
          background-size: cover;
          background-position-y: center;
          background-position-x: 75%;
          background-repeat: no-repeat;
          border: 1px solid #FFFFFF40
        }

        .data-col {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;

          .labels {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0px;

            label {
              color: #ffffff80;
              font-family: Arial, sans-serif;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              letter-spacing: 0px;
              text-wrap: nowrap;

              span {
                color: #fff;
                font-family: Arial, sans-serif;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                letter-spacing: 0px;
                text-wrap: nowrap;

                &.rarity {
                  color: #A0FAFB;

                  &.rare {
                    color: #FFCC00;
                  }

                  &.epic {
                    color: #f542ec;
                  }

                  &.legend {
                    color: #8d42f5;
                  }
                }
              }
            }
          }

          .mint-btn {
            border-radius: 100px;
            border: none;
            padding: 5px 10px;
            height: 36px;
            width: 122px;
            color: #212121;
            font-family: Arial, sans-serif;
            font-weight: 700;
            font-size: 14px;
            line-height: 8px;
            letter-spacing: 0px;
            vertical-align: middle;
            background: linear-gradient(180deg, #A0FAFB 0%, #D3FF9E 100%);
          }
        }
      }
    }
  }
}
</style>