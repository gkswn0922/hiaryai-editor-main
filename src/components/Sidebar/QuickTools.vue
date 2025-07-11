<template>
  <div class="mb-6">
    <div class="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
      빠른 도구
    </div>
    <div class="grid grid-cols-2 gap-2">
      <button
        @click="addHeading"
        class="flex flex-col items-center p-3 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Heading1" class="w-5 h-5 mb-1" />
        <span class="text-xs text-neutral-500 dark:text-neutral-400">제목 추가</span>
      </button>

      <button
        @click="addList"
        class="flex flex-col items-center p-3 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="List" class="w-5 h-5 mb-1" />
        <span class="text-xs text-neutral-500 dark:text-neutral-400">목록 추가</span>
      </button>

      <button
        @click="addTable"
        class="flex flex-col items-center p-3 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Table" class="w-5 h-5 mb-1" />
        <span class="text-xs text-neutral-500 dark:text-neutral-400">표 추가</span>
      </button>

      <button
        @click="addImage"
        class="flex flex-col items-center p-3 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Image" class="w-5 h-5 mb-1" />
        <span class="text-xs text-neutral-500 dark:text-neutral-400">이미지</span>
      </button>

      <button
        @click="addQuote"
        class="flex flex-col items-center p-3 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Quote" class="w-5 h-5 mb-1" />
        <span class="text-xs text-neutral-500 dark:text-neutral-400">인용구</span>
      </button>

      <button
        @click="addCode"
        class="flex flex-col items-center p-3 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon name="Code" class="w-5 h-5 mb-1" />
        <span class="text-xs text-neutral-500 dark:text-neutral-400">코드</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import Icon from '@/components/ui/Icon.vue'

type QuickToolsProps = {
  editor: Editor
}

const props = defineProps<QuickToolsProps>()

const addHeading = () => {
  props.editor.chain().focus().setHeading({ level: 1 }).run()
}

const addList = () => {
  props.editor.chain().focus().toggleBulletList().run()
}

const addTable = () => {
  props.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
}

const addImage = () => {
  props.editor.chain().focus().setImageUpload().run()
}

const addQuote = () => {
  props.editor.chain().focus().setBlockquote().run()
}

const addCode = () => {
  props.editor.chain().focus().setCodeBlock().run()
}
</script>
