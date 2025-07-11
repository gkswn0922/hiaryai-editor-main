<template>
  <div>
    <div class="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
      Table of contents
    </div>
    <div v-if="data && data.content?.length > 0" class="flex flex-col gap-1">
      <a
        v-for="item in data.content"
        :key="item.id"
        :href="`#${item.id}`"
        :style="{ marginLeft: `${1 * item.level - 1}rem` }"
        @click="$emit('itemClick')"
        :class="cn(
          'block font-medium text-neutral-500 dark:text-neutral-300 p-1 rounded bg-opacity-10 text-sm hover:text-neutral-800 transition-all hover:bg-black hover:bg-opacity-5 truncate w-full',
          item.isActive && 'text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-900',
        )"
      >
        {{ item.itemIndex }}. {{ item.textContent }}
      </a>
    </div>
    <div v-else class="text-sm text-neutral-500">
      Start adding headlines to your document …
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'
import type { Editor as CoreEditor } from '@tiptap/core'

type TableOfContentsProps = {
  editor: CoreEditor
}

type TocItem = {
  id: string;
  level: number;
  itemIndex: number;
  textContent: string;
  isActive: boolean;
}

type TocData = {
  content: TocItem[];
}

const props = defineProps<TableOfContentsProps>()
const emit = defineEmits(['itemClick'])

const data = ref<TocData | null>(null)

const handler = ({ editor: currentEditor }: { editor: CoreEditor }) => {
  data.value = { ...currentEditor.extensionStorage.tableOfContents }
}

onMounted(() => {
  handler({ editor: props.editor })
  props.editor.on('update', handler)
  props.editor.on('selectionUpdate', handler)
})

onBeforeUnmount(() => {
  props.editor.off('update', handler)
  props.editor.off('selectionUpdate', handler)
})
</script> 