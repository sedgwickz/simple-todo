<script setup lang="ts">
import TodoList from "./views/TodoList/index.vue";
</script>

<template>
  <div class="logo"><h1>Simple Todo</h1></div>
  <div class="container">
    <TodoList />
  </div>
</template>

<style>
#app {
  margin-top: 60px;
}

.logo {
  font-size: 20px;
}

.container {
  padding: 12px;
}
</style>
