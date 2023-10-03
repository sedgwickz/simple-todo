<script setup lang="ts">
import TodoList from "./views/TodoList/index.vue";
import panelSwitch from '@/assets/panel-switch.svg'
import { ref } from "vue";
const leftWidth = ref(0)
const panelMinWidth = document.body.clientWidth / 2 > 256 ? 256 : document.body.clientWidth / 2

function togglePanel() {
  leftWidth.value = Math.abs(leftWidth.value - panelMinWidth)
}
</script>

<template>
  <github-badge />
  <div class="flex h100">
    <div class="absolute bottom-0 top-0 left-0 z-900 md_relative left-panel gray-800-bg overflow-hidden white"
      :style="{ width: leftWidth + 'px' }">
      <div class="p-4" v-for="i in 10">
        <div>test</div>
      </div>
    </div>
    <div v-if="leftWidth" class="mask" @click="togglePanel"></div>
    <div class="flex-1 flex flex-column max-h100 scroll-y">
      <div class="flex p-6">
        <img @click="togglePanel" class="w-6 h-6 pointer" :src="panelSwitch" />
      </div>
      <div class="logo">
        <h1>Simple Todo</h1>
      </div>
      <main class="container flex-1 md_p-16">
        <TodoList />
      </main>
    </div>
  </div>
</template>

<style scope lang="scss">
#app {
  height: inherit;
}

.logo {
  font-size: 20px;
}

.container {
  padding: 12px;
}

.left-panel {
  transition: all 0.1s;
}
</style>
