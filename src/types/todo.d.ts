export interface Todo {
  text: string
  id: string
  createAt: string
}

export interface Book {
  id: string
  title: string
  selected: boolean
  createdAt: string
  items: Todo[]
}
