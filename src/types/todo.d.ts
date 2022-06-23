export interface TodoItemType {
  text: string
  createAt: Date
}

export interface TodoItemListType {
  items: TodoItemType[]
}
