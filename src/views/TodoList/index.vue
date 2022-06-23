<template>
  <div class="search-box">
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
import TodoField from "@/components/TodoField.vue";
import TodoItem from "@/components/TodoItem.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { items } = storeToRefs(store);
store.getItems();
</script>

<style lang="less" scoped></style>
