<template>
  <div class="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
    <div class="flex flex-row gap-x-1.5 items-center">
      <div class="flex items-center gap-x-1.5">
        <ToolbarButton
          :tooltip="isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'"
          @click="emit('toggleSidebar')"
          :is-active="isSidebarOpen"
          :class="isSidebarOpen ? 'bg-transparent' : ''"
        >
          <Icon :name="isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'" />
        </ToolbarButton>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <button
        @click="$emit('save')"
        class="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
      >
        저장
      </button>
      <EditorInfo :characters="characters" :words="words" :collab-state="collabState" :users="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WebSocketStatus } from '@hocuspocus/provider'
import type { EditorUser } from '../types'
import Icon from '@/components/ui/Icon.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import EditorInfo from './EditorInfo.vue'

export type EditorHeaderProps = {
  isSidebarOpen?: boolean
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}

defineProps<EditorHeaderProps>()
const emit = defineEmits(['toggleSidebar', 'save'])
</script>
