<script setup>
import { RouterView } from 'vue-router'
import AppNav from '@/components/AppNav.vue';
import TopNav from './components/TopNav.vue';
import Statistic from './components/Statistic.vue';
import { onMounted, onUnmounted, watch } from 'vue';
import { useAppStore } from './stores/app';
import { useTonAddress } from '@townsquarelabs/ui-vue';
import { tonapi } from '../axios.config';

const app = useAppStore()
const connectedAddressString = useTonAddress(false)
const ton_address = useTonAddress()
let controller = null

const updateData = async () => {
  if (app.pauseUpdate) {
    return
  }
  if (!navigator.onLine) {
    console.log('Нет интернет-соединения, невозможно сделать запрос')
    setTimeout(() => updateData(), 5000)
    return
  }
  app.setPauseUpdate(true)
  try {
    controller = new AbortController()
    if (!ton_address.value) {
      app.setTonBalance(0)
      app.setJettons([])
    } else {
      await tonapi.get(`accounts/${connectedAddressString.value}`, { signal: controller.signal }).then((res) => {
        if (res.status == 200) {
          app.setTonBalance(res?.data?.balance)
        }
      }).finally(() => {
        controller = null
      })
      await tonapi.get(`accounts/${connectedAddressString.value}/jettons`).then((res) => {
        if (res.status == 200) {
          app.setJettons(res?.data?.balances)
        }
      }).finally(() => {
        controller = null
      })
    }
  } catch (err) {
    console.log(err)
  } finally {
    controller = null
    app.setPauseUpdate(false)
    setTimeout(() => updateData(), 5000)
    return
  }
}

onMounted(() => {
  app.init()
  updateData()
})

watch(
  () => app.pauseUpdate,
  (newVal, oldVal) => {
    if (newVal === true) {
      updateData()
    }
  }
)

onUnmounted(() => {
  if (controller) {
    controller.abort()
  }
})

</script>

<template>
  <TopNav />
  <RouterView />
  <Statistic />
  <AppNav />
</template>