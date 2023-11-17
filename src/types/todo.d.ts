export interface Todo {
  text: string
  id: string
  done: boolean
  doneAt?: number 
  createAt: number 
}

export interface Book {
  id: string
  title: string
  selected: boolean
  createdAt: number
  items: Todo[]
}
