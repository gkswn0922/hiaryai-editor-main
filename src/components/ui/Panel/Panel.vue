<template>
  <Primitive :as="asChild ? 'div' : 'div'" v-bind="$attrs">
    <Surface :class="panelClass" :with-shadow="!noShadow">
      <slot />
    </Surface>
  </Primitive>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'radix-vue'
import Surface from '../Surface.vue'
import { cn } from '@/lib/utils'

export interface PanelProps {
  spacing?: 'medium' | 'small'
  noShadow?: boolean
  asChild?: boolean
  class?: string
}

const props = defineProps<PanelProps>()

const panelClass = computed(() => cn('p-2', props.spacing === 'small' && 'p-[0.2rem]', props.class))
</script>