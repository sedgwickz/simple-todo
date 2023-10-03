<script setup lang="ts">
import panelSwitch from '@/assets/panel-switch.svg';
import { useStore } from '@/store/index';
import { ref } from "vue";
import TodoField from "@/components/todo-field/todo-field.vue";
import TodoItem from "@/components/todo-item/todo-item.vue";
import deleteImage from '@/assets/delete.svg'

const leftWidth = ref(0)
const panelMinWidth = document.body.clientWidth / 2 > 256 ? 256 : document.body.clientWidth / 2

const store = useStore()

function togglePanel() {
  leftWidth.value = Math.abs(leftWidth.value - panelMinWidth)
}

function handleAddBook() {
  store.addBook()
}

function onInput(e: any) {
  if (!e.target.textContent) {
    return
  }
  store.updateBook(e.target.textContent)
}

function handleChangeBook(id: string) {
  store.setSelect(id);
  togglePanel()
}

function handleDeleteBook(id: string) {
  if (confirm('确定删除该清单吗？')) {
    store.removeBook(id)
  }
}

</script>

<template>
  <github-badge />
  <div class="flex h100">
    <div class="absolute bottom-0 top-0 left-0 z-900 md_relative left-panel gray-800-bg overflow-hidden white"
      :style="{ width: leftWidth + 'px' }">
      <div class="p-8">
        <button @click="handleAddBook">添加新清单</button>
      </div>
      <div class="p-4 pointer flex" v-for="book in store.books" @click="handleChangeBook(book.id)">
        <div>{{ book.title }}<img @click.stop="handleDeleteBook(book.id)" class="w-3 h-3 ml-2" :src="deleteImage" /></div>
      </div>
    </div>
    <div v-if="leftWidth" class="mask" @click="togglePanel"></div>
    <div class="flex-1 flex flex-column max-h100 scroll-y">
      <div class="flex align-center g-2 p-6">
        <div>
          <img @click="togglePanel" class="w-6 h-6 pointer" :src="panelSwitch" />
        </div>
        <div><strong>Simple</strong> TODO</div>
      </div>
      <div class="f-20 b-0" contenteditable="true" @input="onInput">
        <h1>{{ store.currentBook?.title }}</h1>
      </div>
      <main class="p-3 flex-1 md_p-16">
        <div class="search-box">
          <TodoField />
        </div>
        <transition-group name="list" tag="div">
          <TodoItem class="item" @deleteItem="store.removeTodo(item.id)" v-for="item in store.currentBook?.items"
            :key="item.id" :item="item" />
        </transition-group>
      </main>
    </div>
  </div>
</template>

<style scope lang="scss">
#app {
  height: inherit;
}

.left-panel {
  transition: all 0.1s;
}

[contenteditable] {
  outline: 0px solid transparent;
}

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
