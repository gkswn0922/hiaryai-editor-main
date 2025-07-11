<template>
  <div :class="windowClassName">
    <div class="w-full h-full overflow-hidden">
      <div class="w-full h-full p-6 overflow-auto">
        <TableOfContents @item-click="handlePotentialClose" :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { Editor } from '@tiptap/vue-3'
import TableOfContents from '@/components/TableOfContents/TableOfContents.vue'

type SidebarProps = {
  editor: Editor
  isOpen?: boolean
}

const props = withDefaults(defineProps<SidebarProps>(), {
  isOpen: false,
})

const emit = defineEmits(['close'])

const handlePotentialClose = () => {
  if (window.innerWidth < 1024) {
    emit('close')
  }
}

const windowClassName = computed(() =>
  cn(
    'absolute top-0 left-0 bg-white lg:bg-white/30 lg:backdrop-blur-xl h-full lg:h-auto lg:relative z-[999] w-0 duration-300 transition-all',
    'dark:bg-black lg:dark:bg-black/30',
    !props.isOpen && 'border-r-transparent',
    props.isOpen && 'w-80 border-r border-r-neutral-200 dark:border-r-neutral-800',
  ),
)
</script> 