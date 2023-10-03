<template>
  <div>
    <input type="input" class="input-box" placeholder="写点什么吧，回车即可添加" name="name" v-model="content" id="name" required
      @keyup.enter="handleAdd" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";
import { v4 as uuidv4 } from 'uuid';

const content = ref('')
const store = useStore();
const inputRef = ref<HTMLInputElement | null>(null);
function handleAdd(e: Event) {
  if (!content.value.trim()) {
    return
  }
  store.addItem({ text: content.value, createAt: new Date(), id: uuidv4() });
  content.value = ''
}
</script>
<style lang="less" scoped>
*:focus {
  outline: none;
}

.input-box {
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  width: calc(100% - 24px);
  text-align: center;
  padding: 12px;
  margin: 30px 0;
}
</style>
