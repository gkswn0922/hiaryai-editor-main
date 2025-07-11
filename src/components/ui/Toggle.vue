<template>
  <button
    :class="buttonClass"
    type="button"
    role="switch"
    :aria-checked="active"
    :data-state="state"
    :value="value"
    @click="handleChange"
  >
    <span :class="pinClass" :data-state="state" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export type ToggleProps = {
  active?: boolean
  size?: 'small' | 'large'
}

const props = withDefaults(defineProps<ToggleProps>(), {
  active: false,
  size: 'large',
})

const emit = defineEmits(['change'])

const state = computed(() => (props.active ? 'checked' : 'unchecked'))
const value = computed(() => (props.active ? 'on' : 'off'))

const buttonClass = computed(() =>
  cn(
    'inline-flex cursor-pointer items-center rounded-full border-transparent transition-colors',
    !props.active ? 'bg-neutral-200 hover:bg-neutral-300' : 'bg-black',
    !props.active ? 'dark:bg-neutral-800 dark:hover:bg-neutral-700' : 'dark:bg-white',
    props.size === 'small' && 'h-3 w-6 px-0.5',
    props.size === 'large' && 'h-5 w-9 px-0.5',
  ),
)

const pinClass = computed(() =>
  cn(
    'rounded-full pointer-events-none block transition-transform',
    'bg-white dark:bg-black',
    props.size === 'small' && 'h-2 w-2',
    props.size === 'large' && 'h-4 w-4',
    props.active
      ? cn(props.size === 'small' ? 'translate-x-3' : '', props.size === 'large' ? 'translate-x-4' : '')
      : 'translate-x-0',
  ),
)

const handleChange = () => {
  emit('change', !props.active)
}
</script> 