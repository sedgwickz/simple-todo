<template>
  <div class="todo-item">
    <div class="flex-1">
      <input ref="inputRef" v-if="isEdit" style="border: 0; outline: 0; width: 100%;" :value="item.text" @blur="handleInputBlur()" />
      <div v-else class="text">{{ item.text }}</div>
      <div class="time" :title="item.createAt">{{ formatDate(item.createAt) }}</div>
    </div>
    <div class="flex">
      <div class="item-edit mr-2" @click.stop="handleEdit(item)">
        <svg t="1700213550873" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2438" width="16" height="16">
          <path fill="currentColor"
            d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
            p-id="2439"></path>
        </svg>
      </div>
      <div class="item-mover mr-2">
        <svg t="1700213268878" class="icon" width="16" height="16" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="1457">
          <path fill="currentColor"
            d="M212 338c-24.852 0-45-20.148-45-45S187.148 248 212 248h600c24.852 0 45 20.148 45 45S836.852 338 812 338H212z m0 220c-24.852 0-45-20.148-45-45S187.148 468 212 468h600c24.852 0 45 20.148 45 45S836.852 558 812 558H212z m0 220c-24.852 0-45-20.148-45-45S187.148 688 212 688h600c24.852 0 45 20.148 45 45S836.852 778 812 778H212z"
            p-id="1458"></path>
        </svg>
      </div>
      <div>
        <svg @click="handleDelete(item)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true" role="img" class="iconify iconify--material-symbols" width="16" height="16"
          preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z">
          </path>
        </svg>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import type { Todo } from "@/types/todo";
import * as timeago from 'timeago.js';
import { nextTick, ref } from "vue";

const { item } = defineProps<{ item: Todo }>();
const emit = defineEmits();
const store = useStore();
const isEdit = ref(false);
const inputRef = ref<HTMLInputElement | null>(null)

function formatDate(createdAt: string) {
  return timeago.format(new Date(createdAt));
}

function handleDelete(item: Todo) {
  if (confirm('delete this item?')) {
    store.removeTodo(item.id)
  }
}

function handleEdit(item: Todo) {
  isEdit.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  })
}

function handleInputBlur() {
  isEdit.value = false;
  if (inputRef.value?.value) {
    store.updateTodo(item.id, inputRef.value?.value)
  }
}
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
