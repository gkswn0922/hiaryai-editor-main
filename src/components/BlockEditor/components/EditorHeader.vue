<template>
  <div class="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
    <div class="flex flex-row gap-x-1.5 items-center">
      <div class="flex items-center gap-x-1.5">
        <ToolbarButton
          :tooltip="isSidebarOpen ? 'Close sidebar' : 'Open sidebar'"
          @click="emit('toggleSidebar')"
          :is-active="isSidebarOpen"
          :class="isSidebarOpen ? 'bg-transparent' : ''"
        >
          <Icon :name="isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'" />
        </ToolbarButton>
      </div>
    </div>
    <EditorInfo :characters="characters" :words="words" :collab-state="collabState" :users="users" />
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
const emit = defineEmits(['toggleSidebar'])
</script> 