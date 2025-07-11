<template>
  <button
    :class="[
      'flex items-center w-full p-2 text-sm text-left rounded-md',
      isActive
        ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
        : 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400',
    ]"
    @click="onClick"
  >
    <div class="flex items-center justify-center w-10 h-10 border rounded-md shrink-0 border-neutral-200 dark:border-neutral-800">
      <Icon :name="icon" class="w-6 h-6" />
    </div>
    <div class="ml-2">
      <p class="font-medium text-neutral-900 dark:text-neutral-100">{{ title }}</p>
      <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ description }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { IconNames } from '@/components/ui/Icon.vue'

interface Props {
  title: string
  description: string
  icon: IconNames
  isActive?: boolean
}

defineProps<Props>()

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script> 