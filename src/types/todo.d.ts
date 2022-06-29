export interface TodoItemType {
  text: string
  id: string
  createAt: Date
}

export interface TodoItemListType {
  items: TodoItemType[]
}
