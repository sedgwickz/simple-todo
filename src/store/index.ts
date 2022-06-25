import { TodoItemListType, TodoItemType } from "@/types/todo";
import { defineStore } from "pinia";

const TODO_KEY = "todos";

export const useStore = defineStore("main", {
  state: (): TodoItemListType => ({ items: [] }),
  actions: {
    getItems(): TodoItemType[] {
      this.items = JSON.parse(localStorage.getItem(TODO_KEY) || "[]");
      return this.items;
    },
    addItem(item: TodoItemType) {
      this.items.unshift(item);
      this.sync();
    },
    deleteItem(item: TodoItemType) {
      this.items.splice(this.items.indexOf(item), 1);
      this.sync();
    },
    sync() {
      localStorage.setItem(TODO_KEY, JSON.stringify(this.items));
    },
  },
});
