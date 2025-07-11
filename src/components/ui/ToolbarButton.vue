<template>
  <Tooltip :content="tooltip">
    <Button
      :variant="isActive ? 'secondary' : 'ghost'"
      :size="size"
      :class="buttonClassName"
      :disabled="disabled"
      @click="onClick"
    >
      <slot />
    </Button>
  </Tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Tooltip from '@/components/ui/Tooltip.vue'
import Button from '@/components/ui/Button/Button.vue'

export type ToolbarButtonProps = {
  tooltip: string
  isActive?: boolean
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg' | 'icon'
  onClick?: () => void
  class?: string
}

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  isActive: false,
  disabled: false,
  size: 'sm',
  onClick: () => {},
  class: '',
})

const buttonClassName = computed(() =>
  cn('min-w-[28px] px-1.5', props.class),
)
</script> 