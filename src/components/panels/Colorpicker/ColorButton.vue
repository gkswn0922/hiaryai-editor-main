<template>
  <button @click="handleClick" :class="wrapperClassName">
    <div :style="{ backgroundColor: color, color: color }" :class="bubbleClassName"></div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  color?: string
  active?: boolean
}>()

const emit = defineEmits(['color-change'])

const wrapperClassName = computed(() =>
  cn(
    'flex items-center justify-center w-6 h-6 p-1 rounded-md',
    'hover:ring-2 hover:ring-offset-2 hover:ring-neutral-200',
    'dark:hover:ring-offset-black dark:hover:ring-neutral-800',
    {
      'ring-2 ring-neutral-900 dark:ring-neutral-200': props.active,
    },
  ),
)

const bubbleClassName = computed(() =>
  cn('w-full h-full rounded-md border border-black/10'),
)

const handleClick = () => {
  emit('color-change', props.color || '')
}
</script> 