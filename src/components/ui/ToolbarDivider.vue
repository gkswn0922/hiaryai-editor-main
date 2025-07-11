<template>
  <div :class="dividerClassName"></div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

export type ToolbarDividerProps = {
  horizontal?: boolean
}

const props = defineProps<ToolbarDividerProps>()

const attrs = useAttrs()

const dividerClassName = computed(() =>
  cn(
    'bg-neutral-200 dark:bg-neutral-800',
    props.horizontal
      ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
      : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0',
    attrs.class as string,
  ),
)
</script> 