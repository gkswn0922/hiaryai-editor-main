<template>
  <Surface v-if="shouldShowContent" :class="toolbarClassName">
    <slot />
  </Surface>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import Surface from './Surface.vue'

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean
  isVertical?: boolean
}

const props = withDefaults(defineProps<ToolbarWrapperProps>(), {
  shouldShowContent: true,
  isVertical: false,
})

const attrs = useAttrs()

const toolbarClassName = computed(() =>
  cn(
    'text-black inline-flex h-full leading-none gap-0.5',
    props.isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center',
    attrs.class as string,
  ),
)
</script>
