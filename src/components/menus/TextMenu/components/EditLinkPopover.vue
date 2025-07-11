<template>
  <PopoverRoot>
    <PopoverTrigger as-child>
      <ToolbarButton tooltip="Set Link">
        <Icon name="Link" />
      </ToolbarButton>
    </PopoverTrigger>
    <PopoverContent>
      <LinkEditorPanel @set-link="onSetLink" />
    </PopoverContent>
  </PopoverRoot>
</template>

<script setup lang="ts">
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from 'radix-vue'
import LinkEditorPanel from '@/components/panels/LinkEditorPanel.vue'
import Icon from '@/components/ui/Icon.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'

const emit = defineEmits(['setLink'])

const onSetLink = (link: string, openInNewTab?: boolean) => {
  emit('setLink', link, openInNewTab)
}
</script> 