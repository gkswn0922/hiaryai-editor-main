<template>
  <BubbleMenu
    :editor="editor"
    plugin-key="tableColumnMenu"
    :update-delay="0"
    :tippy-options="{
      appendTo: () => appendTo,
      offset: [0, 15],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
    }"
    :should-show="shouldShow"
  >
    <Toolbar is-vertical>
      <ToolbarButton tooltip="Add column before" @click="onAddColumnBefore">
        <Icon name="ArrowLeftToLine" />
      </ToolbarButton>
      <ToolbarButton tooltip="Add column after" @click="onAddColumnAfter">
        <Icon name="ArrowRightToLine" />
      </ToolbarButton>
      <ToolbarButton tooltip="Delete column" @click="onDeleteColumn">
        <Icon name="Trash" />
      </ToolbarButton>
    </Toolbar>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import type { ShouldShowProps } from '@/components/menus/types'
import Toolbar from '@/components/ui/Toolbar.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import Icon from '@/components/ui/Icon.vue'
import { isColumnGripSelected } from './utils'

type MenuProps = {
  editor: Editor
  appendTo: HTMLElement
}

const props = defineProps<MenuProps>()

const shouldShow = ({ view, state, from }: ShouldShowProps) => {
  if (!state) {
    return false
  }

  return isColumnGripSelected({ editor: props.editor, view, state, from: from || 0 })
}

const onAddColumnBefore = () => {
  props.editor.chain().focus().addColumnBefore().run()
}

const onAddColumnAfter = () => {
  props.editor.chain().focus().addColumnAfter().run()
}

const onDeleteColumn = () => {
  props.editor.chain().focus().deleteColumn().run()
}
</script> 