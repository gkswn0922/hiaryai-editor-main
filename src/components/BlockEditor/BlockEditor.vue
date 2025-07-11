<template>
  <div v-if="editor" class="flex h-full" ref="menuContainerRef">
    <Sidebar :is-open="leftSidebar.isOpen.value" @close="leftSidebar.close" :editor="editor" />
    <div class="relative flex flex-col flex-1 h-full overflow-hidden">
      <EditorHeader
        :characters="characterCount.characters()"
        :collab-state="collabState"
        :users="displayedUsers"
        :words="characterCount.words()"
        :is-sidebar-open="leftSidebar.isOpen.value"
        @toggle-sidebar="leftSidebar.toggle"
      />
      <EditorContent :editor="editor" ref="editorRef" class="flex-1 overflow-y-auto" />
      <ContentItemMenu :editor="editor" />
      <LinkMenu :editor="editor" :append-to="menuContainerRef!" />
      <BubbleMenu :editor="editor" />
    </div>
  </div>
  <teleport to="body">
    <div v-if="aiState.isAiLoading.value" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <Loader label="AI가 작업 중입니다." />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, provide, computed, defineExpose } from 'vue'
import { EditorContent } from '@tiptap/vue-3'
import { useBlockEditor } from '@/composables/useBlockEditor'
import { useAIState } from '@/composables/useAIState'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import EditorHeader from './components/EditorHeader.vue'
import ContentItemMenu from '@/components/menus/ContentItemMenu/ContentItemMenu.vue'
import LinkMenu from '@/components/menus/LinkMenu/LinkMenu.vue'
import BubbleMenu from '@/components/BubbleMenu/index.vue'
import Loader from '@/components/ui/Loader/Loader.vue'
import type { TiptapProps } from './types'

const props = defineProps<TiptapProps>()

const aiState = useAIState()
const menuContainerRef = ref<HTMLDivElement | null>(null)
const editorRef = ref()

const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor(props)

const displayedUsers = computed(() => users.value.slice(0, 3))

// 키보드 단축키 설정
useKeyboardShortcuts(editor.value || null)


provide('aiState', aiState)
defineExpose({ editorRef, editor, menuContainerRef })
</script>
