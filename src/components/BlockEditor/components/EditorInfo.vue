<template>
  <div class="flex items-center">
    <div class="flex flex-col justify-center pr-4 mr-4 text-right border-r border-neutral-200 dark:border-neutral-800">
      <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {{ words }} {{ words === 1 ? 'word' : 'words' }}
      </div>
      <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        {{ characters }} {{ characters === 1 ? 'character' : 'characters' }}
      </div>
    </div>
    <div class="flex items-center gap-2 mr-2">
      <div
        :class="cn('w-2 h-2 rounded-full', {
          'bg-yellow-500 dark:bg-yellow-400': collabState === 'connecting',
          'bg-green-500 dark:bg-green-400': collabState === 'connected',
          'bg-red-500 dark:bg-red-400': collabState === 'disconnected',
        })"
      />
      <span class="max-w-[4rem] text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
        {{ getConnectionText(collabState) }}
      </span>
    </div>
    <div v-if="collabState === 'connected'" class="flex flex-row items-center">
      <div class="relative flex flex-row items-center ml-3">
        <div v-for="user in users" :key="user.clientId" class="-ml-3">
          <Tooltip :content="user.name">
            <img
              class="w-8 h-8 border border-white rounded-full dark:border-black"
              :src="`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${
                user.name
              }&backgroundColor=${user.color.replace('#', '')}`"
              alt="avatar"
            />
          </Tooltip>
        </div>
        <div v-if="users.length > 3" class="-ml-3">
          <div class="flex items-center justify-center w-8 h-8 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
            +{{ users.length - 3 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WebSocketStatus } from '@hocuspocus/provider'
import type { EditorUser } from '../types'
import { cn } from '@/lib/utils'
import { getConnectionText } from '@/lib/utils/getConnectionText'
import Tooltip from '@/components/ui/Tooltip.vue'

export type EditorInfoProps = {
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}

defineProps<EditorInfoProps>()
</script> 