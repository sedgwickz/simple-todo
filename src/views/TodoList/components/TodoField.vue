<template>
  <div>
    <input
      ref="inputRef"
      type="input"
      class="input-box"
      placeholder="写点什么"
      name="name"
      id="name"
      required
      @keyup.enter="handleAdd"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";

const store = useStore();
const inputRef = ref<HTMLInputElement | null>(null);
function handleAdd(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  if (value) {
    store.addItem({ text: value, createAt: new Date() });
    if (inputRef.value) inputRef.value.value = "";
  }
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
