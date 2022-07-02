import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/global.less";
import { createPinia } from "pinia";
import VConsole from "vconsole";
import { useRegisterSW } from "virtual:pwa-register/vue";

import.meta.env.DEV && new VConsole();


useRegisterSW()
createApp(App).use(createPinia()).mount("#app");

