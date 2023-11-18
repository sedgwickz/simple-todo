import '@unocss/reset/normalize.css'
import '@/styles/global.scss'
import 'virtual:uno.css'
import { createPinia } from 'pinia'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

// import.meta.env.DEV && new VConsole();

useRegisterSW()
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(ToastPlugin)

app.mount('#app')
