<template>
  <div class="search-box">
    <!-- <input type="text" @keyup.enter="handleAdd" /> -->
    <TodoField />
  </div>
  <div class="todo-list">
    <TodoItem
      class="item"
      v-for="item in items"
      :key="item.createAt.toString()"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "@/store";
import TodoField from "@/components/TodoField.vue";
import TodoItem from "@/components/TodoItem.vue";

const store = useStore();
const { items } = storeToRefs(store);
store.getItems();
</script>

<style lang="less" scoped></style>
