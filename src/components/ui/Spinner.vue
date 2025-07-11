<template>
  <div :class="spinnerClass"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()

const spinnerClass = computed(() => cn('animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4', props.class))
</script> 