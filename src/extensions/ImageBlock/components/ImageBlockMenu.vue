<script setup lang="ts">
import { BubbleMenu as BaseBubbleMenu } from '@tiptap/vue-3'
import { computed, inject, ref } from 'vue'
import { sticky, Props as TippyProps } from 'tippy.js'
import { Editor } from '@tiptap/core'
import type { EditorView } from '@tiptap/pm/view'

import ToolbarWrapper from '../../../components/ui/Toolbar.vue'
import ToolbarButton from '../../../components/ui/ToolbarButton.vue'
import ToolbarDivider from '../../../components/ui/ToolbarDivider.vue'
import Icon from '../../../components/ui/Icon.vue'
import ImageBlockWidth from './ImageBlockWidth.vue'
import { getRenderContainer } from '@/lib/utils'

interface Props {
  editor: Editor
}

const props = defineProps<Props>()

const appendTo = inject('appendTo', ref<HTMLElement | null>(null))

const getReferenceClientRect = (): DOMRect => {
  const renderContainer = getRenderContainer(props.editor, 'node-imageBlock')
  const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

  return rect
}

const shouldShow = ({ view }: { view: EditorView }) => {
  if (!view.editable) {
    return false
  }

  return props.editor.isActive('imageBlock')
}

const onAlignImageLeft = () => {
  props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run()
}

const onAlignImageCenter = () => {
  props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run()
}

const onAlignImageRight = () => {
  props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run()
}

const onWidthChange = (value: number) => {
  props.editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run()
}

const tippyOptions = computed<Partial<TippyProps>>(() => ({
  offset: [0, 8],
  popperOptions: {
    modifiers: [{ name: 'flip', enabled: false }],
  },
  getReferenceClientRect,
  appendTo: () => appendTo.value || document.body,
  plugins: [sticky],
  sticky: 'popper',
}))
</script>

<template>
  <BaseBubbleMenu
    :editor="editor"
    plugin-key="imageBlockMenu"
    :should-show="shouldShow"
    :update-delay="0"
    :tippy-options="tippyOptions"
  >
    <ToolbarWrapper>
      <ToolbarButton
        tooltip="Align image left"
        :active="editor.isActive('imageBlock', { align: 'left' })"
        @click="onAlignImageLeft"
      >
        <Icon name="AlignHorizontalDistributeStart" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Align image center"
        :active="editor.isActive('imageBlock', { align: 'center' })"
        @click="onAlignImageCenter"
      >
        <Icon name="AlignHorizontalDistributeCenter" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Align image right"
        :active="editor.isActive('imageBlock', { align: 'right' })"
        @click="onAlignImageRight"
      >
        <Icon name="AlignHorizontalDistributeEnd" />
      </ToolbarButton>
      <ToolbarDivider />
      <ImageBlockWidth @change="onWidthChange" :value="parseInt(editor.getAttributes('imageBlock').width)" />
    </ToolbarWrapper>
  </BaseBubbleMenu>
</template> 