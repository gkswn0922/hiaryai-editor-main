<template>
  <div class="relative">
    <button @click="onToggle" class="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-palette w-4 h-4">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 22c4.97 0 9-3.58 9-8 0-4.42-4.03-8-9-8S3 9.58 3 14c0 2.21 1.79 4 4 4 .34 0 .67-.03 1-.08"/>
    </svg>
      <span class="w-4 h-4 rounded-sm" :style="{
        backgroundColor: editor.getAttributes('textStyle').color,
      }" />
    </button>
<div v-if="isColorSelectorVisible"
  class="fixed top-full z-[99999] mt-1 grid grid-cols-4 w-80 overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl">
  <button v-for="(color, index) in colors" :key="index" @click="onColorSet(color.color)"
    class="flex items-center justify-between px-2 py-1 text-sm rounded text-stone-600 hover:bg-stone-100"
    type="button">
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 border rounded-sm border-stone-200" :style="{ backgroundColor: color.color }" />
      <span>{{ color.name }}</span>
    </div>
  </button>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import { Editor } from '@tiptap/core';

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const isColorSelectorVisible = ref(false);

const colors = [
  {
    name: 'Default',
    color: '#000000',
  },
  {
    name: 'Purple',
    color: '#9333ea',
  },
  {
    name: 'Red',
    color: '#e00000',
  },
  {
    name: 'Blue',
    color: '#2563eb',
  },
  {
    name: 'Green',
    color: '#008a00',
  },
  {
    name: 'Orange',
    color: '#ea580c',
  },
  {
    name: 'Pink',
    color: '#db2777',
  },
  {
    name: 'Gray',
    color: '#4b5563',
  },
];

const onToggle = () => {
  isColorSelectorVisible.value = !isColorSelectorVisible.value;
};

const onColorSet = (color: string) => {
  props.editor.chain().focus().setColor(color).run();
  isColorSelectorVisible.value = false;
};
</script>