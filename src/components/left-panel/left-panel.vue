<template>
  <div class="p-4">
    <div class="flex justify-center items-center h-60px">
      <button @click="handleAddBook">添加新清单</button>
    </div>
    <div class="book-item p-4 cursor-pointer flex" :class="{ active: book.id === store.currentBook?.id }"
      v-for="book in store.books" @click="handleChangeBook(book.id)">
      <div>{{ book.title }}<img @click.stop="handleDeleteBook(book.id)" class="w-3 h-3 ml-2" :src="deleteImage" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import deleteImage from '@/assets/delete.svg'

const store = useStore()
function handleAddBook() {
  store.addBook()
}

function handleChangeBook(id: string) {
  store.setSelect(id);
}

function handleDeleteBook(id: string) {
  if (confirm('delete this book?')) {
    store.removeBook(id)
  }
}
</script>

<style scoped></style>