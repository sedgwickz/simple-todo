import '@/styles/global.scss'
import { createPinia } from 'pinia'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createApp } from 'vue'
import App from './App.vue'
import GithubBadge from '@/components/github-badge/github-badge.vue'

// import.meta.env.DEV && new VConsole();

useRegisterSW()
const app = createApp(App)
app.use(createPinia())

app.component('GithubBadge', GithubBadge)

app.mount('#app')
