import { TodoItemType, TodoItemListType } from '@/types/todo'
import { defineStore } from 'pinia'

const TODO_KEY = 'todos'

export const useStore = defineStore('main', {
  state: () => ({ items: [] } as TodoItemListType),
  actions: {
    getItems() {
      this.sync()
      return this.items
    },
    addItem(item: TodoItemType) {
      this.items.unshift(item)
      this.sync()
    },
    deleteItem(item: TodoItemType) {
      this.items.splice(this.items.indexOf(item), 1)
      this.sync()
    },
    sync() {
      if (this.items.length) {
        localStorage.setItem(TODO_KEY, JSON.stringify(this.items))
        return
      }
      if (localStorage.getItem(TODO_KEY)) {
        this.items = JSON.parse(localStorage.getItem(TODO_KEY)!)
      }
    }
  }
})
