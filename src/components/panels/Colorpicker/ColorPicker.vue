<template>
  <div>
    <SketchPicker class="w-full" :model-value="color" @update:model-value="handleChange" />
    <div class="flex flex-wrap items-center gap-1 max-w-[15rem] mt-2">
      <ColorButton
        v-for="c in themeColors"
        :key="c"
        :active="c === color"
        :color="c"
        @color-change="handleButtonChange"
      />
      <ToolbarButton tooltip="Reset color to default" @click="handleClear">
        <Icon name="Undo" />
      </ToolbarButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sketch as SketchPicker } from '@ckpack/vue-color'
import ColorButton from './ColorButton.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import Icon from '@/components/ui/Icon.vue'
import { themeColors } from '@/lib/constants'

defineProps<{
  color?: string
}>()

const emit = defineEmits(['change', 'clear'])

const handleChange = (color: any) => {
  emit('change', color.hex)
}

const handleButtonChange = (color: string) => {
  emit('change', color)
}

const handleClear = () => {
  emit('clear')
}
</script> 