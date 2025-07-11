<template>
  <Surface class="flex items-center gap-2 p-2 relative z-50">
    <a :href="url" target="_blank" rel="noopener noreferrer" class="text-sm underline break-all text-black dark:text-white">
      {{ url }}
    </a>
    <ToolbarDivider />
    <ToolbarButton tooltip="Edit link" @click="onEdit">
      <Icon name="Pen" class="text-black dark:text-white" />
    </ToolbarButton>
    <ToolbarButton tooltip="Remove link" @click="onClear">
      <Icon name="Trash2" class="text-black dark:text-white" />
    </ToolbarButton>
  </Surface>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import Surface from '@/components/ui/Surface.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import ToolbarDivider from '@/components/ui/ToolbarDivider.vue'

defineProps<{
  url: string
}>()

const emit = defineEmits(['edit', 'clear'])

const onEdit = () => {
  emit('edit')
}

const onClear = () => {
  emit('clear')
}
</script> 