<template>
  <div :class="surfaceClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface SurfaceProps {
  withShadow?: boolean
  withBorder?: boolean
  class?: string
}

const props = withDefaults(defineProps<SurfaceProps>(), {
  withShadow: true,
  withBorder: true,
})

const surfaceClass = computed(() =>
  cn(
    'bg-white rounded-lg dark:bg-black',
    props.withShadow ? 'shadow-lg' : '',
    props.withBorder ? 'border border-neutral-200 dark:border-neutral-800' : '',
    props.class,
  ),
)
</script> 