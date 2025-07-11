<template>
  <component v-if="iconComponent" :is="iconComponent" :class="cn('w-4 h-4', className)" :stroke-width="strokeWidth || 2.5" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
// @ts-ignore
import { icons } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export type IconNames = keyof typeof icons

export interface IconProps {
  name: IconNames
  className?: string
  strokeWidth?: number
}

const props = defineProps<IconProps>()

const iconComponent = computed(() => {
  const icon = icons[props.name]
  if (!icon) {
    return undefined
  }
  return icon
})
</script> 