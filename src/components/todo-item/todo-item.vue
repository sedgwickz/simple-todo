<template>
  <div class="todo-item">
    <div class="flex-1">
      <textarea ref="inputRef" v-if="isEdit" style="border: 0; outline: 0; width: 100%;" :value="item.text"
        @blur="handleInputBlur()" />
      <div v-else class="text" :style="{ 'text-decoration': item.done ? 'line-through' : undefined }"
        @click.stop="handleEdit()">{{ item.text }}</div>
      <div class="flex items-center mt-2 gap-4">
        <div class="flex items-center gap-1">
          <svg t="1700223651687" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="7033" width="10" height="10">
            <path
              d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"
              fill="currentColor" p-id="7034"></path>
            <path
              d="M695.466667 567.466667l-151.466667-70.4V277.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v238.933334c0 12.8 6.4 23.466667 19.2 29.866666l170.666667 81.066667c4.266667 2.133333 8.533333 2.133333 12.8 2.133333 12.8 0 23.466667-6.4 29.866666-19.2 6.4-14.933333 0-34.133333-17.066666-42.666666z"
              fill="currentColor" p-id="7035"></path>
          </svg>
          <div class="time" :title="new Date(item.createAt).toString()">{{ formatDate(item.createAt) }}</div>
        </div>
        <div v-if="item.done" class="flex items-center gap-1">
          <svg t="1700221773563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4358" width="10" height="10">
            <path d="M847.329 255.653l42.426 42.426-475.176 475.176-42.426-42.427z" fill="currentColor" p-id="4359">
            </path>
            <path d="M74 514.426L116.426 472l299.107 299.106-42.427 42.427z" fill="currentColor" p-id="4360"></path>
          </svg>
          <div class="time" :title="new Date(item.doneAt!).toString()">{{ formatDate(item.doneAt!) }}</div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div v-if="item.done" class="item-reset mr-2" title="restore" @click.stop="handleRestore()">
        <svg t="1700224188569" class="icon " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="10142" width="16" height="16">
          <path
            d="M258.56 681.36l-12.704 44.288a16 16 0 0 1-7.616 9.584l-24.752 13.712a14.464 14.464 0 0 1-20.928-16.64l38.128-132.96a11.136 11.136 0 0 1 13.76-7.632l132.976 38.128a14.464 14.464 0 0 1 3.04 26.56l-24.768 13.712a16 16 0 0 1-12.16 1.392l-42.016-12.048a264.112 264.112 0 0 0 468.112-41.76 14.288 14.288 0 0 1 3.296-4.912 263.424 263.424 0 0 0 16.768-92.784c0-90.496-45.536-170.368-114.96-217.92a264.112 264.112 0 0 0-393.808 118.8 14.336 14.336 0 0 1-17.968 8.16l-20.256-7.024a12.352 12.352 0 0 1-7.456-16.192A312.112 312.112 0 0 1 525.696 208c66.112 0 128.256 20.752 179.44 56.736a313.12 313.12 0 0 1 108.656 135.312 311.04 311.04 0 0 1 23.904 119.952c0 172.32-139.68 312-312 312v-0.208h-0.832c-110.96 0-210.768-59.296-266.304-150.432z"
            fill="currentColor" p-id="10143"></path>
        </svg>
      </div>
      <div v-else class="item-done mr-2" title="done" @click.stop="handleDone()">
        <svg t="1700221773563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4358" width="16" height="16">
          <path d="M847.329 255.653l42.426 42.426-475.176 475.176-42.426-42.427z" fill="currentColor" p-id="4359"></path>
          <path d="M74 514.426L116.426 472l299.107 299.106-42.427 42.427z" fill="currentColor" p-id="4360"></path>
        </svg>
      </div>
      <div v-if="!item.done" class="item-mover mr-2">
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
import { useToast } from "vue-toast-notification";

const { item } = defineProps<{ item: Todo }>();
const store = useStore();
const isEdit = ref(false);
const inputRef = ref<HTMLInputElement | null>(null)
const $toast = useToast();

function formatDate(createdAt: number) {
  return timeago.format(new Date(createdAt));
}

function handleDelete(item: Todo) {
  if (confirm('delete this item?')) {
    store.removeTodo(item.id)
  }
}

function handleEdit() {
  if (item.done) {
    return
  }
  isEdit.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  })
}

function handleDone() {
  // if (confirm('mark as finished?')) {
  store.markTodoDone(item.id)
  $toast.success('🎉 finished', { duration: 2000, position: 'top' });
  // }
}

function handleRestore() {
  store.restoreTodoDone(item.id)
  $toast.warning('😅 restored', { duration: 2000, position: 'top' });
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
