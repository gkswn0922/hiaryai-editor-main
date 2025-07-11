<template>
  <div class="relative">
    <button
      @click="onToggle"
      class="flex items-center gap-1 p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
      type="button"
    >
      <span>
        {{ activeItem?.name }}
      </span>
      <ChevronDown class="w-4 h-4" />
    </button>
    <div
      v-if="isNodeSelectorVisible"
      class="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        @click="onItemClick(item)"
        class="flex items-center justify-between px-2 py-1 text-sm rounded text-stone-600 hover:bg-stone-100"
        type="button"
      >
        <div class="flex items-center gap-2">
          <component :is="item.icon" class="w-4 h-4" />
          <span>{{ item.name }}</span>
        </div>
        <Check v-if="activeItem.name === item.name" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { Editor } from '@tiptap/core';
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  Text,
  Code,
} from 'lucide-vue-next';

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const isNodeSelectorVisible = ref(false);

const items = [
  {
    name: '텍스트',
    icon: Text,
    command: () =>
      props.editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
    isActive: () =>
      props.editor.isActive('paragraph') &&
      !props.editor.isActive('bulletList') &&
      !props.editor.isActive('orderedList'),
  },
  {
    name: '제목 1',
    icon: Heading1,
    command: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    name: '제목 2',
    icon: Heading2,
    command: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),
  },
  {
    name: '제목 3',
    icon: Heading3,
    command: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 3 }),
  },
  {
    name: '인용구',
    icon: TextQuote,
    command: () =>
      props.editor
        .chain()
        .focus()
        .toggleNode('blockquote', 'paragraph')
        .run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  {
    name: '코드',
    icon: Code,
    command: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive('codeBlock'),
  },
  {
    name: '글머리 기호 목록',
    icon: ListOrdered,
    command: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    name: '번호 목록',
    icon: ListOrdered,
    command: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
];

const activeItem = computed(
  () => items.filter((item) => item.isActive()).pop() ?? { name: '여러 개' }
);

const onToggle = () => {
  isNodeSelectorVisible.value = !isNodeSelectorVisible.value;
};

const onItemClick = (item: (typeof items)[0]) => {
  item.command();
  isNodeSelectorVisible.value = false;
};
</script>
