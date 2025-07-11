<template>
  <BubbleMenu
    :editor="editor"
    plugin-key="tableRowMenu"
    :update-delay="0"
    :tippy-options="{
      appendTo: () => appendTo,
      placement: 'left',
      offset: [0, 15],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
    }"
    :should-show="shouldShow"
  >
    <Toolbar is-vertical>
      <ToolbarButton tooltip="Add row before" @click="onAddRowBefore">
        <Icon name="ArrowUpToLine" />
      </ToolbarButton>
      <ToolbarButton tooltip="Add row after" @click="onAddRowAfter">
        <Icon name="ArrowDownToLine" />
      </ToolbarButton>
      <ToolbarButton tooltip="Delete row" @click="onDeleteRow">
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
import { isRowGripSelected } from './utils'

type MenuProps = {
  editor: Editor
  appendTo: HTMLElement
}

const props = defineProps<MenuProps>()

const shouldShow = ({ view, state, from }: ShouldShowProps) => {
  if (!state || !from) {
    return false
  }

  return isRowGripSelected({ editor: props.editor, view, state, from })
}

const onAddRowBefore = () => {
  props.editor.chain().focus().addRowBefore().run()
}

const onAddRowAfter = () => {
  props.editor.chain().focus().addRowAfter().run()
}

const onDeleteRow = () => {
  props.editor.chain().focus().deleteRow().run()
}
</script> 