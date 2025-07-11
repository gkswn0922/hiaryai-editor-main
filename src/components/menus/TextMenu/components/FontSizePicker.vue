<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <ToolbarButton tooltip="Font size" :is-active="!!value">
        {{ currentSizeLabel }}
        <Icon name="ChevronDown" class="w-2 h-2" />
      </ToolbarButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent as-child>
      <Surface class="flex flex-col gap-1 px-2 py-4">
        <DropdownMenuItem
          v-for="size in FONT_SIZES"
          :key="`${size.label}_${size.value}`"
          @select="selectSize(size.value)"
          :class="['flex items-center justify-between w-full px-2 py-1 text-sm text-neutral-500 dark:text-neutral-400 rounded-md', { 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100': value === size.value }]"
        >
          <span :style="{ fontSize: size.value }">{{ size.label }}</span>
        </DropdownMenuItem>
      </Surface>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'
import Icon from '@/components/ui/Icon.vue'
import Surface from '@/components/ui/Surface.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
]

type FontSizePickerProps = {
  value: string
}

const props = defineProps<FontSizePickerProps>()
const emit = defineEmits(['change'])

const currentSizeLabel = computed(() => {
  const currentSize = FONT_SIZES.find(size => size.value === props.value)
  return currentSize?.label.split(' ')[0] || 'Medium'
})

const selectSize = (size: string) => {
  emit('change', size)
}
</script> 