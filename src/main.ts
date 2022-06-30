import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/global.less";
import { createPinia } from "pinia";
import VConsole from "vconsole";
import { registerSW } from "virtual:pwa-register";

import.meta.env.DEV && new VConsole();
createApp(App).use(createPinia()).mount("#app");

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
