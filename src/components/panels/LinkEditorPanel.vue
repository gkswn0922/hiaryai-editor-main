<template>
  <Surface class="p-2 relative z-50 bg-white dark:bg-black shadow-lg">
    <form @submit.prevent="handleSubmit" class="flex items-center gap-2">
      <label class="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 cursor-text">
        <Icon name="Link" class="flex-none text-black dark:text-white" />
        <input
          type="url"
          class="flex-1 bg-transparent outline-none min-w-[12rem] text-black text-sm dark:text-white"
          placeholder="Enter URL"
          v-model="url"
        />
      </label>
      <Button variant="primary" size="sm" type="submit" :disabled="!isValidUrl">
        Set Link
      </Button>
    </form>
    <div class="mt-3">
      <label
        class="flex items-center justify-start gap-2 text-sm font-semibold cursor-pointer select-none text-neutral-500 dark:text-neutral-400"
      >
        Open in new tab
        <Toggle :active="openInNewTab" @change="setOpenInNewTab" />
      </label>
    </div>
  </Surface>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import Surface from '@/components/ui/Surface.vue'
import Toggle from '@/components/ui/Toggle.vue'

export type LinkEditorPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
}

const props = defineProps<LinkEditorPanelProps>()
const emit = defineEmits(['setLink'])

const url = ref(props.initialUrl || '')
const openInNewTab = ref(props.initialOpenInNewTab || false)

const isValidUrl = computed(() => /^(\S+):(\/\/)?\S+$/.test(url.value))

const handleSubmit = () => {
  if (isValidUrl.value) {
    emit('setLink', url.value, openInNewTab.value)
  }
}

const setOpenInNewTab = (value: boolean) => {
  openInNewTab.value = value
}
</script> 