import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { TonConnectUIPlugin , THEME } from '@townsquarelabs/ui-vue';

import App from './App.vue'
import router from './router'
import i18n from './utils/i18n'

const options = {
  manifestUrl: "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json",
  language: navigator.language.split('-')[0],
  uiPreferences: {
    theme: THEME.DARK
  },
  actionsConfiguration: {
    twaReturnUrl: 'https://t.me/RentMAGNATE_test_bot',
  }
}


const app = createApp(App)

app.use(createPinia())
app.use(TonConnectUIPlugin, options)
app.use(router)
app.use(i18n)

app.mount('#app')
