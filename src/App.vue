<script setup lang="ts">
import TodoList from './views/TodoList/index.vue'
</script>

<template>
  <div class="logo">Simple Todo</div>
  <div class="container">
    <TodoList />
  </div>
</template>

<style>
#app {
  margin-top: 60px;
}

.logo {
  font-size: 30px;
}

.container {
  padding: 12px;
}
</style>
