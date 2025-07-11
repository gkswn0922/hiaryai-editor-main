<template>
  <div
    class="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800"
  >
    <div class="flex flex-row items-center gap-x-1.5">
      <div class="flex items-center gap-x-1.5">
        <ToolbarButton
          :tooltip="props.isSidebarOpen ? 'Close sidebar' : 'Open sidebar'"
          :is-active="props.isSidebarOpen"
          @click="props.toggleSidebar"
          :class="[props.isSidebarOpen ? 'bg-transparent' : '']"
        >
          <component :is="props.isSidebarOpen ? PanelLeftClose : PanelLeft" />
        </ToolbarButton>
      </div>
    </div>
    <EditorInfo :characters="props.characters" :words="props.words" :collab-state="props.collabState" :users="props.users" />
  </div>
</template>

<script setup lang="ts">
import { WebSocketStatus } from '@hocuspocus/provider'
import { PanelLeft, PanelLeftClose } from 'lucide-vue-next'
import EditorInfo from './EditorInfo.vue'
import ToolbarButton from './ui/Toolbar.vue'
import type { EditorUser } from '@/components/BlockEditor/types'

const props = defineProps<{
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}>()
</script> 