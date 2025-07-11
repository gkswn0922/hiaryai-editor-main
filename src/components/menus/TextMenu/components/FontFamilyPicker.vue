<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <ToolbarButton tooltip="Font family" :is-active="!!value">
        {{ currentFontLabel }}
        <Icon name="ChevronDown" class="w-2 h-2" />
      </ToolbarButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent as-child>
      <Surface class="flex flex-col gap-1 px-2 py-4">
        <div v-for="group in FONT_FAMILY_GROUPS" :key="group.label" class="mt-2.5 first:mt-0 gap-0.5 flex flex-col">
          <div class="px-2 py-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
            {{ group.label }}
          </div>
          <DropdownMenuItem
            v-for="font in group.options"
            :key="`${font.label}_${font.value}`"
            @select="selectFont(font.value)"
            :class="['flex items-center justify-between w-full px-2 py-1 text-sm text-neutral-500 dark:text-neutral-400 rounded-md', { 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100': value === font.value }]"
          >
            <span :style="{ fontFamily: font.value }">{{ font.label }}</span>
          </DropdownMenuItem>
        </div>
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

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
]

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap(group => group.options)

type FontFamilyPickerProps = {
  value: string
}

const props = defineProps<FontFamilyPickerProps>()
const emit = defineEmits(['change'])

const currentFontLabel = computed(() => {
  const currentFont = FONT_FAMILIES.find(font => font.value === props.value)
  return currentFont?.label.split(' ')[0] || 'Inter'
})

const selectFont = (font: string) => {
  emit('change', font)
}
</script> 