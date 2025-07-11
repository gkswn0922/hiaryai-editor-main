<template>
  <div class="flex items-center gap-2">
    <input
      class="h-2 bg-neutral-200 border-0 rounded appearance-none fill-neutral-300"
      type="range"
      min="25"
      max="100"
      step="25"
      :value="currentValue"
      @input="handleChange"
    />
    <span class="text-xs font-semibold text-neutral-500 select-none">{{ value }}%</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  value: number
}>()

const emit = defineEmits(['change'])

const currentValue = ref(props.value)

watch(() => props.value, (newValue) => {
  currentValue.value = newValue
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('change', parseInt(target.value))
}
</script> 