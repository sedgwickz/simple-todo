import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { Book, Todo } from './../types/todo.d'

export const useStore = defineStore('main', () => {
  const books = ref<Book[]>([])
  const currentBook = ref<Book>()

  try {
    books.value = JSON.parse(localStorage.getItem('simple-todo-list') || '[]')
    if (!books.value?.length) {
      addBook()
    }
    const selectedBook = books.value.find((item) => item.selected)
    if (selectedBook) {
      currentBook.value = selectedBook
    }
  } catch (error) {
    books.value = []
  }

  function addBook() {
    books.value.map((item) => (item.selected = false))
    const book = {
      title: 'New List',
      id: uuidv4(),
      createdAt: new Date().toString(),
      items: [],
      selected: true,
    }
    books.value = [book, ...books.value]
    currentBook.value = book
    sync()
  }

  function removeBook(id: string) {
    books.value.map((item) => (item.selected = false))
    books.value = books.value.filter((item) => item.id !== id)
    let selectedBook = books.value.find((item) => item.selected)
    if (!selectedBook) {
      selectedBook = books.value[0]
      books.value[0].selected = true
    }
    currentBook.value = selectedBook
    sync()
  }

  function addTodo(content: string) {
    const todo = {
      text: content,
      id: uuidv4(),
      createAt: new Date().toString(),
    }
    currentBook.value!.items = [todo, ...(currentBook.value?.items || [])]
    console.log(JSON.stringify(currentBook.value))
    sync()
  }

  function removeTodo(id: string) {
    currentBook.value!.items = currentBook.value!.items.filter((item) => item.id !== id)
    sync()
  }

  function updateBook(title: string) {
    books.value.map((item) => (item.selected = false))
    currentBook.value = { ...currentBook.value, title, selected: true } as Book
    const index = books.value.findIndex((item) => item.id === currentBook.value?.id)
    if (index > -1) {
      books.value[index] = currentBook.value
    }
    console.log('update book finished')
    sync()
  }

  function setSelect(id: string) {
    const selectedBook = books.value.find((item) => item.id === id)
    if (selectedBook) {
      books.value.map((item) => (item.selected = false))
      selectedBook.selected = true
      currentBook.value = selectedBook
    }
    sync()
  }

  function sort(oldIndex: number, newIndex: number) {
    const item = currentBook.value!.items[oldIndex]
    currentBook.value!.items.splice(oldIndex, 1)
    currentBook.value!.items.splice(newIndex, 0, item)
    sync()
  }

  function sync() {
    localStorage.setItem('simple-todo-list', JSON.stringify(books.value))
  }

  return {
    books,
    currentBook,
    updateBook,
    addBook,
    addTodo,
    setSelect,
    removeBook,
    removeTodo,
    sort,
  }
})
