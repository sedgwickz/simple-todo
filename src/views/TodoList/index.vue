<template>
  <div class="search-box">
    <TodoField />
  </div>
  <transition-group name="list" tag="div">
    <TodoItem
      class="item"
      v-for="item in store.items"
      :key="item.createAt.toString()"
      :item="item"
    />
  </transition-group>
</template>

<script setup lang="ts">
import TodoField from "./components/TodoField.vue";
import TodoItem from "./components/TodoItem.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useStore();
//const { items } = storeToRefs(store);
onMounted(() => {
  store.getItems();
});
</script>

<style lang="less" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
