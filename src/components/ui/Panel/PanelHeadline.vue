<template>
  <Primitive :as="asChild ? 'div' : 'div'" :class="headlineClass" v-bind="$attrs">
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'radix-vue'
import { cn } from '@/lib/utils'

export interface PanelHeadlineProps {
  asChild?: boolean
  class?: string
}

const props = defineProps<PanelHeadlineProps>()

const headlineClass = computed(() =>
  cn('text-black/80 dark:text-white/80 text-xs font-medium mb-2 ml-1.5', props.class),
)
</script> 