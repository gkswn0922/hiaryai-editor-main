<template>
  <div>
    <div class="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">

    </div>
    <div v-if="data && data.content?.length > 0" class="flex flex-col gap-1">
      <a
        v-for="item in data.content"
        :key="item.id"
        :href="`#${item.id}`"
        @click="scrollToHeading($event, item.id)"
        :class="cn(
          'block font-medium text-neutral-500 dark:text-neutral-300 p-1 rounded bg-opacity-10 text-sm hover:text-neutral-800 transition-all hover:bg-black hover:bg-opacity-5 truncate w-full cursor-pointer',
          item.isActive && 'text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-900',
        )"
      >
        {{ item.itemIndex }}. {{ item.textContent }}
      </a>
    </div>
    <div v-else class="text-sm text-neutral-500">
      문서에 제목을 추가하면 목차가 생성됩니다 …
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
  // 헤딩을 직접 찾아서 목차 생성
  const headings: any[] = []
  let index = 0

  currentEditor.state.doc.descendants((node: any, pos: number) => {
    if (node.type.name === 'heading') {
      const textContent = node.textContent
      const id = `heading-${textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`
      const level = node.attrs.level
      const isActive = false

      headings.push({
        id,
        level,
        itemIndex: ++index,
        textContent,
        isActive,
      })
    }
  })

  data.value = { content: headings }
}

const scrollToHeading = (event: Event, headingId: string) => {
  event.preventDefault()

  // DOM에서 해당 헤딩 요소 찾기
  const headingElement = document.getElementById(headingId)
  if (headingElement) {
    headingElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  emit('itemClick')
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
