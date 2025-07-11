<template>
  <BubbleMenu
    :editor="editor"
    :plugin-key="`columnsMenu-${pluginKey}`"
    :should-show="shouldShow"
    :update-delay="0"
    :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      getReferenceClientRect,
      appendTo: () => appendTo,
      plugins: [sticky],
      sticky: 'popper',
    }"
  >
    <Toolbar>
      <ToolbarButton
        tooltip="Sidebar left"
        :is-active="editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })"
        @click="onColumnLeft"
      >
        <Icon name="PanelLeft" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Two columns"
        :is-active="editor.isActive('columns', { layout: ColumnLayout.TwoColumn })"
        @click="onColumnTwo"
      >
        <Icon name="Columns2" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Sidebar right"
        :is-active="editor.isActive('columns', { layout: ColumnLayout.SidebarRight })"
        @click="onColumnRight"
      >
        <Icon name="PanelRight" />
      </ToolbarButton>
    </Toolbar>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import { sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'
import { getRenderContainer } from '@/lib/utils/getRenderContainer'
import Toolbar from '@/components/ui/Toolbar.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import { ColumnLayout } from '../Columns'
import Icon from '@/components/ui/Icon.vue'

type MenuProps = {
  editor: Editor,
  appendTo: HTMLElement
}

const props = defineProps<MenuProps>()
const pluginKey = uuid()

const getReferenceClientRect = () => {
  const renderContainer = getRenderContainer(props.editor, 'columns')
  const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

  return rect
}

const shouldShow = () => {
  return props.editor.isActive('columns')
}

const onColumnLeft = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
}

const onColumnRight = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
}

const onColumnTwo = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
}
</script> 