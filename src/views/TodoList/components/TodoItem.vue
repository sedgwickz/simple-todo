<template>
  <div class="todo-item">
    <div>
      <div class="text">{{ item.text }}</div>
      <div class="time">{{ moment(item.createAt).fromNow() }}</div>
    </div>
    <div>
      <svg
        @click="store.deleteItem(item)"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--material-symbols"
        width="32"
        height="32"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TodoItemType } from "@/types/todo";
import { useStore } from "@/store";
import moment from "moment";

interface Props {
  item: TodoItemType;
}
const { item } = defineProps<Props>();
const store = useStore();
</script>
<style scoped lang="less">
.todo-item {
  margin: 12px 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  .text {
    word-break: break-all;
    text-align: left;
  }

  .time {
    margin-top: 10px;
    font-size: 10px;
    color: #999;
  }

  svg {
    color: #ddd;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
