import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/global.less";
import { createPinia } from "pinia";
import VConsole from "vconsole";

import.meta.env.DEV && new VConsole();
const app = createApp(App).use(createPinia()).mount("#app");
