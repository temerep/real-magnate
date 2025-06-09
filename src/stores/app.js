import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { tonapi } from '../../axios.config'

export const useAppStore = defineStore('app', {
   state: () => ({
    tonBalance: 0,
    jettons: [],
    prices: {},
    currentMap: 'city',
    pauseUpdate: false

   }),
   actions: {
    async init() {
      const getPrice = await tonapi.get('rates?tokens=RENT,TON&currencies=usd')
      if (getPrice.status == 200) {
        this.prices = {
          RENT: getPrice.data?.rates['RENT']?.prices['USD'],
          TON: getPrice.data?.rates['TON']?.prices['USD'],
        }
      }
    },
    setTonBalance(bal) {
      this.tonBalance = bal
    },
    setJettons(jettons) {
      this.jettons = jettons
    },
    setPauseUpdate(bool) {
      this.pauseUpdate = bool
    },
    setCurrMap(map) {
      this.currentMap = map
    }
   }
})
