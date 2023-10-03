import '@/styles/global.less'
import { createPinia } from 'pinia'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createApp } from 'vue'
import App from './App.vue'

// import.meta.env.DEV && new VConsole();

useRegisterSW()
createApp(App).use(createPinia()).mount('#app')
