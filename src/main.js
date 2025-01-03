import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueGtag from 'vue-gtag'

import { createApp } from 'vue'

import './style.scss'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App).use(pinia)

app.use(VueGtag, {
  config: { id: 'G-SQT1Z09S2P' }
})

app.mount('#app')
