<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <ToolbarButton tooltip="Content type" :is-active="activeItem?.id !== 'paragraph' && !!activeItem?.type">
        <Icon :name="activeItemIcon" />
        <Icon name="ChevronDown" class="w-2 h-2" />
      </ToolbarButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent as-child>
      <Surface class="flex flex-col gap-1 px-2 py-4">
        <template v-for="option in options" :key="option.id">
          <DropdownMenuItem
            v-if="isOption(option)"
            @select="option.onClick"
            :disabled="option.disabled()"
            :class="['flex items-center justify-between w-full px-2 py-1 text-sm text-neutral-500 dark:text-neutral-400 rounded-md', { 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100': option.isActive() }]"
          >
            <Icon :name="option.icon" class="w-4 h-4 mr-1" />
            {{ option.label }}
          </DropdownMenuItem>
          <div v-else-if="isCategory(option)" class="mt-2 first:mt-0">
            <div class="px-2 py-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
              {{ option.label }}
            </div>
          </div>
        </template>
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

export type ContentTypePickerOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: any
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  type: 'category'
}

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

const props = defineProps<ContentTypePickerProps>()

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === 'option'

const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
  option.type === 'category'

const activeItem = computed(() =>
  props.options.find((option): option is ContentTypePickerOption => isOption(option) && option.isActive()),
)

const activeItemIcon = computed(() => (activeItem.value ? activeItem.value.icon : 'Pilcrow'))

</script> 