
<template>
  <div class="flex w-full min-h-full">
    <div class="absolute md:relative bottom-0 top-0 left-0 z-900 left-panel bg-gray-800 overflow-hidden text-white"
      :style="{ width: leftWidth + 'px' }">
      <LeftPanel></LeftPanel>
    </div>
    <div v-if="leftWidth" class="md:hidden mask" @click="togglePanel"></div>
    <div class="flex-1 relative max-h-screen overflow-y-auto">
      <div class="flex fixed z-10 left-0 right-0 top-0 place-content-between p-4 gap-2 bg-white shadow-sm"
        :class="{ [`left-${leftWidth}px`]: true }">
        <div class="flex gap-2 items-center">
          <div>
            <img @click="togglePanel" class="w-6 h-6 cursor-pointer" :src="panelSwitch" />
          </div>
          <div><strong>Simple</strong> TODO</div>
        </div>
        <div class="text-xl flex items-center">
          <a class="i-mdi:github cursor-pointer" target="_blank" href="https://github.com/sedgwickz/simple-todo"></a>
        </div>
      </div>
      <div class="flex justify-center pt-8">
        <div class="w-full max-w-600px">
          <div>
            <input class="mt-12 f-24 text-4xl" style="border: 0; outline: 0; text-align: center; width: 100%;"
              :value="store.currentBook?.title" placeholder="填写标题" @input="onInput" />
          </div>
          <main class="p-3 flex-1">
            <div class="search-box">
              <TodoField />
            </div>
            <!-- <transition-group name="list" tag="div"> -->
            <div ref="listRef">
              <TodoItem class="item" v-for="item in store.currentBook?.items.filter(item => !item.done)" :key="item.id"
                :item="item" />
            </div>
            <div>
              <TodoItem class="item"
                v-for="item in store.currentBook?.items.filter(item => item.done).sort((a, b) => a.doneAt! > b.doneAt! ? -1 : 1)"
                :key="item.id" :item="item" />
            </div>
            <!-- </transition-group> -->
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import panelSwitch from '@/assets/panel-switch.svg';
import { useStore } from '@/store/index';
import { onMounted, ref } from "vue";
import TodoField from "@/components/todo-field/todo-field.vue";
import TodoItem from "@/components/todo-item/todo-item.vue";
import LeftPanel from "@/components/left-panel/left-panel.vue";
import Sortable from 'sortablejs';

const leftWidth = ref(0)
const listRef = ref(null)
const panelMinWidth = document.body.clientWidth / 2 > 256 ? 256 : document.body.clientWidth / 2

const store = useStore()

onMounted(() => {
  const menuOpen = localStorage.getItem('menuOpen')
  if (menuOpen === '1') {
    leftWidth.value = panelMinWidth
  }
  new Sortable(listRef.value!, {
    handle: '.item-mover',
    animation: 150,
    ghostClass: 'item',
    onEnd: (e: any) => {
      store.sort(e.oldIndex, e.newIndex)
      console.log(store.currentBook?.items)
    }
  })
})

function togglePanel() {
  leftWidth.value = Math.abs(leftWidth.value - panelMinWidth)
  localStorage.setItem('menuOpen', leftWidth.value > 0 ? '1' : '0')
}

function onInput(e: any) {
  if (!e.target.value) {
    return
  }
  store.updateBook(e.target.value)
}

</script>

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

.book-item {
  padding: 4px;
}

.book-item.active {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba($color: #000000, $alpha: 0.7);
}
</style>
